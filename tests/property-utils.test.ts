import { describe, expect, it } from "vitest";
import { demoProperties } from "../lib/demo-properties";
import { filterProperties, makePropertySlug, validatePropertyDraft } from "../lib/property-utils";
import { isConfiguredAdmin } from "../lib/admin-authorization";

describe("property discovery filters", () => {
  it("filters by location without case sensitivity", () => {
    expect(filterProperties(demoProperties, { location: "PAROS" }).map((property) => property.id)).toEqual(["preview-island-home"]);
  });

  it("combines offer type, maximum price, and category", () => {
    expect(filterProperties(demoProperties, { type: "sale", maxPrice: 700000, category: "Houses" }).map((property) => property.id)).toEqual(["preview-island-home"]);
  });

  it("filters with both ends of the selected price range", () => {
    expect(filterProperties(demoProperties, { minPrice: 600000, maxPrice: 900000 }).map((property) => property.id)).toEqual(["preview-coastal-villa", "preview-island-home"]);
  });

  it("sorts results by price without changing the default order", () => {
    expect(filterProperties(demoProperties, { sort: "price-asc" }).map((property) => property.id).slice(0, 2)).toEqual(["preview-plaka-flat", "preview-athens-residence"]);
    expect(filterProperties(demoProperties, { sort: "price-desc" }).map((property) => property.id)[0]).toBe("preview-athens-penthouse");
    expect(filterProperties(demoProperties).map((property) => property.id)[0]).toBe("preview-athens-residence");
  });

  it("returns all homes when filters are empty", () => {
    expect(filterProperties(demoProperties)).toHaveLength(demoProperties.length);
  });
});

describe("listing input validation", () => {
  const validListing = {
    title: "Villa by the sea", city: "Paros", listingType: "sale", propertyType: "Villa",
    price: 850000, bedrooms: 3, bathrooms: 2, area: 180, coverUrl: "https://example.com/home.jpg",
    alt: "White villa in Paros", description: "A bright family home.",
  };

  it("accepts a complete listing with a secure photo URL", () => {
    expect(validatePropertyDraft(validListing)).toBeNull();
    expect(validatePropertyDraft({ ...validListing, listingType: "golden_visa", images: ["https://example.com/1.jpg", "https://example.com/2.jpg"] })).toBeNull();
    expect(validatePropertyDraft({ ...validListing, images: Array(9).fill("https://example.com/home.jpg") })).toMatch(/eight/i);
  });

  it("rejects a missing required field and an unsafe photo URL", () => {
    expect(validatePropertyDraft({ ...validListing, title: "" })).toMatch(/title/i);
    expect(validatePropertyDraft({ ...validListing, coverUrl: "javascript:alert(1)" })).toMatch(/HTTPS/i);
    expect(validatePropertyDraft({ ...validListing, coverUrl: "https://" })).toMatch(/HTTPS/i);
    expect(validatePropertyDraft({ ...validListing, price: null })).toMatch(/price/i);
    expect(validatePropertyDraft({ ...validListing, status: "public" })).toMatch(/draft/i);
  });

  it("turns titles into readable URL slugs", () => {
    expect(makePropertySlug("Villa à Naousa — Sea View!")).toBe("villa-a-naousa-sea-view");
    expect(makePropertySlug("  ")).toBe("");
  });
});

describe("admin access allowlist", () => {
  it("allows only the configured verified Google email, ignoring letter case", () => {
    expect(isConfiguredAdmin("Owner@Example.com", "owner@example.com", true)).toBe(true);
    expect(isConfiguredAdmin("someone@example.com", "owner@example.com", true)).toBe(false);
    expect(isConfiguredAdmin("owner@example.com", "owner@example.com", false)).toBe(false);
    expect(isConfiguredAdmin("owner@example.com", "", true)).toBe(false);
    expect(isConfiguredAdmin("BlueGreen@example.com", "owner@example.com, bluegreen@example.com", true)).toBe(true);
  });
});
