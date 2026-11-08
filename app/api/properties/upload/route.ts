import { auth } from "@/auth";
import { uploadPropertyImage } from "@/lib/property-media";
import { NextResponse } from "next/server";
export const runtime="nodejs";
export async function POST(request:Request){
  if(!(await auth())?.user?.email)return NextResponse.json({error:"Sign in with Google before uploading photos."},{status:401});
  return uploadPropertyImage(request);
}
