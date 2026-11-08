import { NextResponse } from "next/server";
import { demoProperties } from "@/lib/demo-properties";
import { listProperties } from "@/lib/db";
export const dynamic="force-dynamic";
export async function GET(){const properties=await listProperties().catch(()=>null);return NextResponse.json({properties:properties?.length?properties:demoProperties},{headers:{"cache-control":"public, max-age=60, stale-while-revalidate=300"}});}
