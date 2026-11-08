import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyGrid } from "@/components/property-grid";
import { listProperties } from "@/lib/db";
import { demoProperties } from "@/lib/demo-properties";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Properties in Greece", description: "Explore a considered collection of homes in Greece." };
export default async function PropertiesPage(){const data=await listProperties().catch(()=>null);const properties=data?.length?data:demoProperties;return <><SiteHeader/><main className="listings-page"><div className="page-kicker"><span>THE COLLECTION</span><span>GREECE · 2026</span></div><p className="eyebrow">FIND YOUR PLACE</p><h1>Considered homes,<br/><em>chosen for living.</em></h1><p className="listings-intro">Explore the collection by location and let us help you find the right fit.</p>{properties.some(p=>p.demo)&&<p className="preview-notice">Preview listings — illustrative only; verify all listing details before publication.</p>}<PropertyGrid properties={properties}/></main><SiteFooter/></>;}
