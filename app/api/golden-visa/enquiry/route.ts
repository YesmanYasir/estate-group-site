import { NextResponse } from "next/server";
import { getEnv } from "@/lib/db";
export const runtime="nodejs";
export async function POST(request:Request){
  const body=await request.json().catch(()=>null);
  if(!body||typeof body!=="object")return NextResponse.json({error:"Complete the form and try again."},{status:400});
  const name=String(body.name||"").trim().slice(0,120), email=String(body.email||"").trim().slice(0,254), phone=String(body.phone||"").trim().slice(0,40), message=String(body.message||"").trim().slice(0,2000);
  if(!name||!/^\S+@\S+\.\S+$/.test(email)||!phone||!message||body.consent!==true)return NextResponse.json({error:"Enter your name, valid email, phone and message, then confirm contact permission."},{status:400});
  const env=await getEnv(); if(!env.DB)return NextResponse.json({error:"The enquiry form is temporarily unavailable."},{status:503});
  try { await env.DB.prepare("INSERT INTO golden_visa_enquiries (id,name,email,phone,message) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(),name,email,phone,message).run(); return NextResponse.json({ok:true},{status:201}); }
  catch { return NextResponse.json({error:"The request could not be saved. Please contact us directly."},{status:503}); }
}
