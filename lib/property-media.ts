import { NextResponse } from "next/server";
import { getEnv } from "@/lib/db";

export async function uploadPropertyImage(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 9 * 1024 * 1024) return NextResponse.json({ error: "Choose an image under 8 MB." }, { status: 413 });
  const env = await getEnv();
  if (!env.PROPERTY_MEDIA) return NextResponse.json({ error: "Cloudflare R2 is not connected." }, { status: 503 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) || file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Choose an image under 8 MB." }, { status: 400 });
  const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
  const key = "properties/" + crypto.randomUUID() + "." + ext;
  await env.PROPERTY_MEDIA.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" } });
  return NextResponse.json({ url: "/api/media/" + key });
}
