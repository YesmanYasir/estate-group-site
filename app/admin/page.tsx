import Link from "next/link";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/auth";
import { AdminLogin } from "@/components/admin-login";
import { AdminDashboard } from "@/components/admin-dashboard";
import { t } from "@/lib/i18n";
import { getSiteLocale } from "@/lib/locale";
export const dynamic = "force-dynamic";
export const metadata={title:"Admin",robots:{index:false,follow:false}};
export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [allowed,query,session,locale]=await Promise.all([isAdmin(),searchParams,auth(),getSiteLocale()]);
  return <main className="admin-page"><header className="admin-top"><Link className="wordmark" href="/">SPITOGO</Link><span>CONTENT DESK / PRIVATE</span><Link href="/">← {t(locale,"find")}</Link></header><div className="admin-intro"><p className="eyebrow">PROPERTY CONTENT</p><h1>{allowed?"Manage the collection.":"Sign in to continue."}</h1><p>Manage homes and approve owner submissions.</p></div>{allowed?<AdminDashboard locale={locale}/>:<AdminLogin denied={query.error === "AccessDenied" || Boolean(session?.user?.email)}/>}</main>;
}
