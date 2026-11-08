import { NextResponse } from "next/server";
import { login } from "@/lib/auth";
export const runtime="nodejs";
export async function POST(request:Request){const body=await request.json().catch(()=>({}));const ok=await login(String(body.password||""));return ok?NextResponse.json({ok:true}):NextResponse.json({error:"Invalid credentials"},{status:401});}
