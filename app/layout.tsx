import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { DevAgentation } from "@/components/dev-agentation";
export const metadata: Metadata = { title: { default: "AIM Estate Group — Exceptional homes in Greece", template: "%s | AIM Estate Group" }, description: "Discover exceptional homes in Greece with thoughtful, local guidance." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><DevAgentation/>{children}</body></html>; }
