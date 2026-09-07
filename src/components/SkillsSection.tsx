"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface SkillItem {
  name: string;
  category: string;
  color: string;
  glowColor: string;
  svg: React.ReactNode;
}

const skillsData: SkillItem[] = [
  {
    name: "HTML5",
    category: "Structure",
    color: "#E34F26",
    glowColor: "rgba(227, 79, 38, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#E34F26" }} aria-hidden="true">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.234-2.625h11.438l.234-2.625H5.438l.688 7.875h10.422l-.469 5.25-4.109 1.141-4.109-1.141-.266-3h-2.64l.484 5.625 6.531 1.813 6.531-1.813.906-10.5H8.531z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    category: "Styling",
    color: "#1572B6",
    glowColor: "rgba(21, 114, 182, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#1572B6" }} aria-hidden="true">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.234-2.625h11.438l.234-2.625H5.438l.688 7.875h10.422l-.469 5.25-4.109 1.141-4.109-1.141-.266-3h-2.64l.484 5.625 6.531 1.813 6.531-1.813.906-10.5H8.531z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    category: "Language",
    color: "#F7DF1E",
    glowColor: "rgba(247, 223, 30, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#F7DF1E" }} aria-hidden="true">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034-1.021.03-1.95.421-2.506 1.096-.84.975-.81 2.37-.03 3.374.87 1.066 2.22 1.456 3.39 1.951.78.345 1.155.63 1.26.975.21.675-.15 1.17-.855 1.35-.9.21-1.875-.075-2.4-.945-.06-.105-.12-.226-.165-.361l-1.845 1.05c.285.615.69 1.17 1.2 1.56 1.02.78 2.37.96 3.75.645 1.365-.33 2.28-1.29 2.22-2.31zM11.985 8.52h2.205V18.15c0 1.56-.375 2.505-1.245 3.09-1.035.705-2.52.585-3.27-.405-.285-.39-.42-.81-.465-1.245l1.905-.99c.075.285.225.57.42.75.345.315.825.285 1.125-.09.18-.21.285-.555.285-1.11V8.52z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Type Safety",
    color: "#3178C6",
    glowColor: "rgba(49, 120, 198, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#3178C6" }} aria-hidden="true">
        <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.237 13.909v-1.636h-4.364V8.727h4.364V7.091H4.91v1.636h1.09v6.818h1.364v-1.636zm9.818 0c0-1.636-1.09-2.727-3-3.273-.818-.273-1.363-.545-1.363-.909 0-.455.363-.727.909-.727.636 0 1.182.273 1.545.727l1.09-1.09c-.636-.818-1.545-1.182-2.636-1.182-1.636 0-2.636 1-2.636 2.364 0 1.455.91 2.363 2.727 2.909.91.272 1.364.545 1.364 1 0 .545-.455.818-1.182.818-.818 0-1.455-.364-1.91-1l-1.181 1.09c.727 1 1.818 1.455 3.09 1.455 1.819 0 3-.909 3-2.273z" />
      </svg>
    ),
  },
  {
    name: "React",
    category: "UI Library",
    color: "#61DAFB",
    glowColor: "rgba(97, 218, 251, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#61DAFB" }} aria-hidden="true">
        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7c-5.26 0-9.84 2.27-11.45 5.57-.42.86-.42 1.99 0 2.85C2.16 13.73 6.74 16 12 16s9.84-2.27 11.45-5.58c.42-.86.42-1.99 0-2.85C21.84 4.27 17.26 2 12 2zm0 12c-4.73 0-8.91-1.99-10.4-4.85C3.09 6.29 7.27 4.3 12 4.3s8.91 1.99 10.4 4.85c-1.49 2.86-5.67 4.85-10.4 4.85z" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Full Stack",
    color: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#FFFFFF" }} aria-hidden="true">
        <path d="M18.665 21.978l-8.73-12.78v12.78H7.5V2.022h2.435l8.73 12.802V2.022h2.435v19.956h-2.435z" />
      </svg>
    ),
  },
  {
    name: "Vue.js",
    category: "Framework",
    color: "#4FC08D",
    glowColor: "rgba(79, 192, 141, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#4FC08D" }} aria-hidden="true">
        <path d="M19.197 1.636h3.62L12 20.364.818 1.636h3.62l7.562 12.818 7.197-12.818zM15.485 1.636h3.62L12 13.636 4.895 1.636h3.62L12 7.727l3.485-6.091z" />
      </svg>
    ),
  },
  {
    name: "Angular",
    category: "Framework",
    color: "#DD0031",
    glowColor: "rgba(221, 0, 49, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#DD0031" }} aria-hidden="true">
        <path d="M12 0L1.7 3.65l1.58 13.69L12 24l8.72-6.66 1.58-13.69L12 0zm0 3.82l5.05 11.36h-2.12l-1.04-2.6H10.1l-1.04 2.6H6.95L12 3.82zm1.2 6.74L12 6.94l-1.2 3.62h2.4z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    category: "Animation",
    color: "#88CE02",
    glowColor: "rgba(136, 206, 2, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#88CE02" }} aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-4h2v4zm-2-8h-2V7h2v2z" />
      </svg>
    ),
  },
  {
    name: "Lenis",
    category: "Smooth Scroll",
    color: "#2DD4BF",
    glowColor: "rgba(45, 212, 191, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
  },
  {
    name: "Spline 3D",
    category: "3D Design",
    color: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#EC4899" }} aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.3L4.5 7 12 3.7 19.5 7 12 10.3zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    category: "Motion Engine",
    color: "#FF0055",
    glowColor: "rgba(255, 0, 85, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#FF0055" }} aria-hidden="true">
        <path d="M0 0h12v6H6v6h6v6H6v6H0V0zm12 0h12v12h-6v6h6v6H12V0z" />
      </svg>
    ),
  },
  {
    name: "Anime.js",
    category: "Micro Motion",
    color: "#F64F59",
    glowColor: "rgba(246, 79, 89, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F64F59" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    name: "Astro.js",
    category: "Static / SSR",
    color: "#BC52EE",
    glowColor: "rgba(188, 82, 238, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#BC52EE" }} aria-hidden="true">
        <path d="M12 2.25a.75.75 0 0 1 .71.51l2.42 7.25h7.62a.75.75 0 0 1 .44 1.36l-6.17 4.48 2.36 7.26a.75.75 0 0 1-1.15.84L12 19.47l-6.23 4.48a.75.75 0 0 1-1.15-.84l2.36-7.26-6.17-4.48a.75.75 0 0 1 .44-1.36h7.62l2.42-7.25a.75.75 0 0 1 .71-.51z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    color: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.45)",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#38BDF8" }} aria-hidden="true">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
];

function SkillCard({ item }: { item: SkillItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="skill-card-motion group relative flex w-[180px] sm:w-[200px] h-[68px] sm:h-[72px] shrink-0 items-center gap-3 rounded-[5px] border border-white/[0.08] -ml-[1px] bg-[#0E1117]/95 px-3.5 sm:px-4 backdrop-blur-xl transition-all duration-200 cursor-pointer overflow-hidden select-none"
      style={{
        borderColor: isHovered ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.08)",
        boxShadow: isHovered
          ? `0 0 20px -3px ${item.glowColor}, inset 0 0 12px ${item.glowColor}`
          : "none",
        zIndex: isHovered ? 20 : 1,
      }}
    >
      {/* Sleek Glossy Metallic Shine Beam Sweep */}
      <div
        className="pointer-events-none absolute -inset-full w-[260%] h-[260%] bg-gradient-to-r from-transparent via-white/[0.25] to-transparent -rotate-45 translate-x-[-160%] group-hover:translate-x-[160%] transition-transform duration-700 ease-out"
        aria-hidden="true"
      />

      {/* Authentic Native Color Icon Box */}
      <div
        className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-white/[0.04] p-1.5 transition-transform duration-300 group-hover:scale-110"
        style={{
          boxShadow: isHovered ? `0 0 12px ${item.glowColor}` : "none",
        }}
      >
        {item.svg}
      </div>

      {/* Name and Category Tag */}
      <div className="relative z-10 flex flex-col text-left overflow-hidden">
        <span className="text-[13px] sm:text-[14px] font-bold tracking-tight text-white truncate group-hover:text-white">
          {item.name}
        </span>
        <span
          className="text-[9px] sm:text-[9.5px] font-semibold tracking-wider uppercase truncate"
          style={{ color: item.color }}
        >
          {item.category}
        </span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const cards = sectionRef.current?.querySelectorAll(".skill-card-motion");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          filter: "blur(12px)",
          opacity: 0.2,
          y: 20,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: {
            each: 0.02,
            from: "start",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  // Duplicate arrays for seamless, gapless 50% endless loop
  const row1 = [...skillsData.slice(0, 8), ...skillsData.slice(0, 8)];
  const row2 = [...skillsData.slice(7), ...skillsData.slice(7)];

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full overflow-hidden bg-[#08090C] py-12 md:py-16 flex flex-col justify-center border-t border-white/[0.12] shadow-[0_-30px_90px_rgba(0,0,0,0.98)]"
      style={{ minHeight: "60vh" }}
      aria-label="Skills and Technologies"
    >
      {/* Side Vignette Gradient Overlays for Smooth Fading */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#08090C] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#08090C] to-transparent" />

      {/* Section Header */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 rounded-[5px] border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 px-3.5 py-1 text-[11.5px] font-semibold text-[#2DD4BF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
          Full Stack Ecosystem
        </div>
        <h2 className="mt-3 text-[28px] sm:text-[36px] font-extrabold tracking-tight text-white">
          Skills &amp;{" "}
          <span className="bg-gradient-to-r from-[#2DD4BF] via-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>
        <p className="mt-2 text-[13px] sm:text-[14px] text-[#A0A8B0] max-w-[550px] mx-auto">
          Modern frameworks, animation engines, and development tools powering high-performance digital products.
        </p>
      </div>

      {/* ========================================================
          INFINITE CAROUSEL TRACKS (Row 1 & Row 2) - ZERO GAPS, CONNECTED TILES
      ======================================================== */}
      <div className="relative z-10 flex flex-col gap-0 w-full overflow-hidden">
        {/* Row 1: Leftward Infinite Marquee */}
        <div className="flex w-fit gap-0 py-1 animate-marquee-left hover:[animation-play-state:paused]">
          {row1.map((item, idx) => (
            <SkillCard key={`row1-${item.name}-${idx}`} item={item} />
          ))}
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="flex w-fit gap-0 py-1 animate-marquee-right hover:[animation-play-state:paused]">
          {row2.map((item, idx) => (
            <SkillCard key={`row2-${item.name}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
