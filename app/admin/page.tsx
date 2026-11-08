import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { AdminLogin } from "@/components/admin-login";
import { AdminDashboard } from "@/components/admin-dashboard";
export const dynamic = "force-dynamic";
export const metadata={title:"Admin",robots:{index:false,follow:false}};
export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }){const [allowed,query]=await Promise.all([isAdmin(),searchParams]);return <main className="admin-page"><header className="admin-top"><Link className="wordmark" href="/">AIM<span> / </span>ESTATE GROUP</Link><span>CONTENT DESK / PRIVATE</span><Link href="/">← Website</Link></header><div className="admin-intro"><p className="eyebrow">PROPERTY CONTENT</p><h1>{allowed?"Manage the collection.":"Sign in to continue."}</h1><p>Draft and publish property listings from one simple place.</p></div>{allowed?<AdminDashboard/>:<AdminLogin denied={query.error === "AccessDenied"}/>}</main>;}
