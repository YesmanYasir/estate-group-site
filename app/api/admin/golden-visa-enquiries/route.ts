import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getEnv } from "@/lib/db";
export const dynamic="force-dynamic";
export async function GET(){
  if(!await isAdmin())return NextResponse.json({error:"Sign in required"},{status:401});
  const env=await getEnv();if(!env.DB)return NextResponse.json({enquiries:[]});
  const result=await env.DB.prepare("SELECT id,name,email,phone,message,created_at FROM golden_visa_enquiries ORDER BY created_at DESC LIMIT 100").all<Record<string,unknown>>();
  return NextResponse.json({enquiries:result.results});
}
