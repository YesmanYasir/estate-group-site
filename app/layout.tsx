import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { DevAgentation } from "@/components/dev-agentation";
import { ScrollToTop } from "@/components/scroll-to-top";
export const metadata: Metadata = { title: { default: "Spitogo — Exceptional homes in Greece", template: "%s | Spitogo" }, description: "Discover exceptional homes in Greece with Spitogo and BlueGreen Tourism." };
import { getSiteLocale } from "@/lib/locale";
export default async function RootLayout({children}:{children:React.ReactNode}) { const locale=await getSiteLocale(); return <html lang={locale}><body><DevAgentation/><ScrollToTop/>{children}</body></html>; }
