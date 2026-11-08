"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function SmoothScroll() { useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const lenis = new Lenis({ duration: 1.05, smoothWheel: true }); lenis.on("scroll", ScrollTrigger.update); const tick=(time:number)=>lenis.raf(time*1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0); return () => { gsap.ticker.remove(tick); lenis.destroy(); }; }, []); useGSAP(() => { const targets=gsap.utils.toArray<HTMLElement>("[data-reveal]"); targets.forEach((target)=>gsap.fromTo(target,{y:24,opacity:0},{y:0,opacity:1,duration:.75,ease:"power2.out",scrollTrigger:{trigger:target,start:"top 88%",once:true}})); }); return null; }
