import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { DevAgentation } from "@/components/dev-agentation";
export const metadata: Metadata = { title: { default: "AIM Estate Group — Find your Greece", template: "%s | AIM Estate Group" }, description: "A considered collection of homes in Greece. Explore property with local guidance." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><SmoothScroll/><DevAgentation/>{children}</body></html>; }
