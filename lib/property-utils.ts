import type { Property, PropertyType } from "@/types/property";

export type PropertyFilters = {
  type?: string;
  location?: string;
  category?: string;
  maxPrice?: number | string;
};

const categoryNames: Record<string, PropertyType> = {
  apartments: "Apartment",
  houses: "House",
  villas: "Villa",
  penthouses: "Penthouse",
  land: "Land",
  developments: "Development",
};

export function categoryType(category = "") {
  const key = category.trim().toLowerCase();
  return categoryNames[key] || (Object.values(categoryNames).find((value) => value.toLowerCase() === key) as PropertyType | undefined);
}

export function filterProperties(properties: Property[], filters: PropertyFilters = {}) {
  const location = filters.location?.trim().toLocaleLowerCase() || "";
  const category = categoryType(filters.category);
  const maxPrice = filters.maxPrice === "" || filters.maxPrice == null ? Number.POSITIVE_INFINITY : Number(filters.maxPrice);
  return properties.filter((property) =>
    (filters.type === "all" || !filters.type || property.listingType === filters.type) &&
    (!location || `${property.title} ${property.city}`.toLocaleLowerCase().includes(location)) &&
    (!category || property.propertyType === category) &&
    (!Number.isFinite(maxPrice) || property.price <= maxPrice)
  );
}

export function makePropertySlug(title: string) {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function validatePropertyDraft(body: Record<string, unknown>) {
  if (!["title", "city", "coverUrl", "alt", "description"].every((key) => String(body[key] || "").trim())) return "Complete the title, location, image, image description, and property description.";
  if (body.price === undefined || body.price === null || body.price === "") return "Enter a valid price of zero or more.";
  if (!Number.isFinite(Number(body.price)) || Number(body.price) < 0) return "Enter a valid price of zero or more.";
  if (!["bedrooms", "bathrooms", "area"].every((key) => Number.isFinite(Number(body[key] ?? 0)) && Number(body[key] ?? 0) >= 0)) return "Bedrooms, bathrooms, and area must be zero or more.";
  if (!(["sale", "rent"].includes(String(body.listingType)))) return "Choose whether the property is for sale or rent.";
  if (!Object.values(categoryNames).includes(body.propertyType as PropertyType)) return "Choose a property type.";
  if (body.status !== undefined && !["draft", "published"].includes(String(body.status))) return "Choose whether to publish the property or save it as a draft.";
  const coverUrl = String(body.coverUrl).trim();
  const uploadedPhoto = coverUrl.startsWith("/api/media/properties/");
  let secureExternalPhoto = false;
  try { secureExternalPhoto = new URL(coverUrl).protocol === "https:"; } catch { /* Invalid URLs are rejected below. */ }
  if (!(uploadedPhoto || secureExternalPhoto)) return "Upload an image or enter a secure HTTPS image URL.";
  return null;
}
