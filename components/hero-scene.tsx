"use client";
import dynamic from "next/dynamic";
const VillaScene = dynamic(() => import("@/components/villa-scene"), { ssr: false, loading: () => <div className="scene-fallback" aria-hidden="true"><div className="fallback-house"><i/><b/><span/></div><span>ARCHITECTURE IN LIGHT</span></div> });
export function HeroScene() { return <div className="hero-scene"><VillaScene/></div>; }
