export type PropertyStatus = "pending" | "draft" | "published";
export type ListingType = "sale" | "rent" | "golden_visa";
export type PropertyType = "Apartment" | "House" | "Villa" | "Penthouse" | "Land" | "Development";
export type Property = {
  id: string; slug: string; title: string; city: string; listingType: ListingType; propertyType: PropertyType;
  price: number; currency: string; bedrooms: number; bathrooms: number; area: number;
  coverUrl: string; images?: string[]; alt: string; description: string; features: string[];
  status: PropertyStatus; createdAt?: string; demo?: boolean; submittedBy?: string; submittedName?: string; submittedPhone?: string; sourceUrl?: string;
};
