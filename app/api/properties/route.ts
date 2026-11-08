import { NextResponse } from "next/server";
import { demoProperties } from "@/lib/demo-properties";
import { listProperties } from "@/lib/db";
import { auth } from "@/auth";
import { getEnv, rowToProperty } from "@/lib/db";
import { makePropertySlug, validatePropertyDraft } from "@/lib/property-utils";
export const dynamic="force-dynamic";
export async function GET(){const properties=await listProperties().catch(()=>null);return NextResponse.json({properties:properties?.length?properties:demoProperties},{headers:{"cache-control":"public, max-age=60, stale-while-revalidate=300"}});}
export async function POST(request:Request){
  const session=await auth();
  const submitterEmail=session?.user?.email?.trim().toLowerCase();
  if(!submitterEmail)return NextResponse.json({error:"Sign in with Google before submitting a property."},{status:401});
  const env=await getEnv(); if(!env.DB)return NextResponse.json({error:"Property submissions are temporarily unavailable."},{status:503});
  const body=await request.json().catch(()=>null);
  if(!body||typeof body!=="object")return NextResponse.json({error:"Enter the property details and try again."},{status:400});
  const validationError=validatePropertyDraft(body); if(validationError)return NextResponse.json({error:validationError},{status:400});
  const slug=makePropertySlug(String(body.title)); if(!slug)return NextResponse.json({error:"Enter a property title."},{status:400});
  const images=Array.isArray(body.images)&&body.images.length?body.images:[body.coverUrl];
  const id=crypto.randomUUID();
  try {
    await env.DB.prepare("INSERT INTO properties (id,slug,title,city,listing_type,property_type,price,currency,bedrooms,bathrooms,area,cover_url,images_json,alt,description,features_json,status,submitted_by,submitted_name,submitted_phone,source_url) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,slug,String(body.title).trim(),String(body.city).trim(),body.listingType,String(body.propertyType),Number(body.price),"EUR",Number(body.bedrooms)||0,Number(body.bathrooms)||0,Number(body.area)||0,String(images[0]),JSON.stringify(images),String(body.alt||body.title).trim(),String(body.description).trim(),JSON.stringify(Array.isArray(body.features)?body.features:[]),"pending",submitterEmail,String(body.submitterName||"").trim().slice(0,120),String(body.submitterPhone||"").trim().slice(0,40),body.sourceUrl||null).run();
    const result=await env.DB.prepare("SELECT * FROM properties WHERE id=?").bind(id).first<Record<string,unknown>>();
    return NextResponse.json({property:rowToProperty(result!)},{status:201});
  } catch { return NextResponse.json({error:"A listing with this title is already being reviewed. Please change the title."},{status:409}); }
}
