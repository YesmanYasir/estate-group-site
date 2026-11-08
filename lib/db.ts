import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Property } from "@/types/property";

export type AppEnv = CloudflareEnv & { DB?: D1Database; PROPERTY_MEDIA?: R2Bucket; ADMIN_EMAIL?: string };
export async function getEnv() {
  try { return (await getCloudflareContext({ async: true })).env as AppEnv; }
  catch { return process.env as unknown as AppEnv; }
}
export function rowToProperty(row: Record<string, unknown>): Property {
  return {
    id: String(row.id), slug: String(row.slug), title: String(row.title), city: String(row.city),
    listingType: row.listing_type as Property["listingType"], propertyType: String(row.property_type || "Villa") as Property["propertyType"], status: row.status as Property["status"],
    price: Number(row.price), currency: String(row.currency), bedrooms: Number(row.bedrooms),
    bathrooms: Number(row.bathrooms), area: Number(row.area), coverUrl: String(row.cover_url), alt: String(row.alt),
    description: String(row.description), features: JSON.parse(String(row.features_json || "[]")), createdAt: String(row.created_at || "")
  };
}
export async function listProperties(includeDrafts = false): Promise<Property[] | null> {
  const env = await getEnv(); if (!env.DB) return null;
  const sql = includeDrafts ? "SELECT * FROM properties ORDER BY created_at DESC" : "SELECT * FROM properties WHERE status = 'published' ORDER BY created_at DESC";
  const result = await env.DB.prepare(sql).all<Record<string, unknown>>();
  return result.results.map(rowToProperty);
}
