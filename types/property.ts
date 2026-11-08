export type PropertyStatus = "draft" | "published";
export type ListingType = "sale" | "rent";
export type PropertyType = "Apartment" | "House" | "Villa" | "Penthouse" | "Land" | "Development";
export type Property = {
  id: string; slug: string; title: string; city: string; listingType: ListingType; propertyType: PropertyType;
  price: number; currency: string; bedrooms: number; bathrooms: number; area: number;
  coverUrl: string; alt: string; description: string; features: string[];
  status: PropertyStatus; createdAt?: string; demo?: boolean;
};
