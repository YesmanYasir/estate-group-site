import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { uploadPropertyImage } from "@/lib/property-media";
export const runtime="nodejs"; export const dynamic="force-dynamic";
export async function POST(request:Request){if(!await isAdmin())return NextResponse.json({error:"Sign in required"},{status:401});return uploadPropertyImage(request);}
