import { describe, expect, it } from "vitest";
import { demoProperties } from "../lib/demo-properties";
import { filterProperties, makePropertySlug, validatePropertyDraft } from "../lib/property-utils";

describe("property discovery filters", () => {
  it("filters by location without case sensitivity", () => {
    expect(filterProperties(demoProperties, { location: "PAROS" }).map((property) => property.id)).toEqual(["preview-island-home"]);
  });

  it("combines offer type, maximum price, and category", () => {
    expect(filterProperties(demoProperties, { type: "sale", maxPrice: 700000, category: "Houses" }).map((property) => property.id)).toEqual(["preview-island-home"]);
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
