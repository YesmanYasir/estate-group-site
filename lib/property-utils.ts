import type { ListingType, Property, PropertyType } from "@/types/property";
export type PropertyFilters = { type?: string; location?: string; category?: string; minPrice?: number | string; maxPrice?: number | string; sort?: string };
const categoryNames: Record<string, PropertyType> = { apartments: "Apartment", houses: "House", villas: "Villa", penthouses: "Penthouse", land: "Land", developments: "Development" };
export function categoryType(category = "") { const key = category.trim().toLowerCase(); return categoryNames[key] || (Object.values(categoryNames).find((value) => value.toLowerCase() === key) as PropertyType | undefined); }
export function filterProperties(properties: Property[], filters: PropertyFilters = {}) {
  const location = filters.location?.trim().toLocaleLowerCase() || "";
  const category = categoryType(filters.category);
  const minPrice = filters.minPrice === "" || filters.minPrice == null ? 0 : Number(filters.minPrice);
  const maxPrice = filters.maxPrice === "" || filters.maxPrice == null ? Number.POSITIVE_INFINITY : Number(filters.maxPrice);
  const visible = properties.filter((property) => (filters.type === "all" || !filters.type || property.listingType === filters.type) && (!location || (property.title + " " + property.city).toLocaleLowerCase().includes(location)) && (!category || property.propertyType === category) && (!Number.isFinite(minPrice) || property.price >= minPrice) && (!Number.isFinite(maxPrice) || property.price <= maxPrice));
  if (filters.sort === "price-asc") return visible.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") return visible.sort((a, b) => b.price - a.price);
  if (filters.sort === "newest") return visible.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  return visible;
}
export function makePropertySlug(title: string) { return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
export function isSafePhotoUrl(value: string) {
  if (value.startsWith("/api/media/properties/")) return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}
export function validatePropertyDraft(body: Record<string, unknown>) {
  if (!["title", "city", "coverUrl", "alt", "description"].every((key) => String(body[key] || "").trim())) return "Complete the title, location, image, image description, and property description.";
  if (body.price === undefined || body.price === null || body.price === "" || !Number.isFinite(Number(body.price)) || Number(body.price) < 0) return "Enter a valid price of zero or more.";
  if (!["bedrooms", "bathrooms", "area"].every((key) => Number.isFinite(Number(body[key] ?? 0)) && Number(body[key] ?? 0) >= 0)) return "Bedrooms, bathrooms, and area must be zero or more.";
  if (!(["sale", "rent", "golden_visa"] as ListingType[]).includes(String(body.listingType) as ListingType)) return "Choose a listing category.";
  if (!(["Apartment", "House", "Villa", "Penthouse", "Land", "Development"] as string[]).includes(String(body.propertyType))) return "Choose a property type.";
  if (body.status !== undefined && !["pending", "draft", "published"].includes(String(body.status))) return "Choose draft, pending, or published as the listing status.";
  const photos = Array.isArray(body.images) && body.images.length ? body.images : [body.coverUrl];
  if (photos.length > 8 || !photos.every((photo) => isSafePhotoUrl(String(photo)))) return "Add up to eight HTTPS image links or uploaded photos.";
  if (body.sourceUrl) { try { if (new URL(String(body.sourceUrl)).protocol !== "https:") return "The source URL must use HTTPS."; } catch { return "Enter a valid source URL."; } }
  return null;
}
