"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.nav
      initial={prefersReducedMotion ? {} : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative z-20 flex h-[72px] items-center justify-between px-6 md:px-12 lg:px-20"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
        {/* Logo mark — teal-to-blue gradient "G" glyph */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2DD4BF" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
          <text
            x="50%"
            y="54%"
            dominantBaseline="central"
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="700"
            fontFamily="var(--font-poppins), Poppins, sans-serif"
          >
            G
          </text>
        </svg>
        <span className="text-[22px] font-bold leading-[1.2] text-white">
          Gaurav
        </span>
      </Link>

      {/* Center — Hamburger icon */}
      <button
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-[5px] p-2"
        aria-label="Open menu"
        id="nav-menu-toggle"
      >
        <span className="block h-[2px] w-6 rounded-full bg-white" />
        <span className="block h-[2px] w-6 rounded-full bg-white" />
        <span className="block h-[2px] w-6 rounded-full bg-white" />
      </button>

      {/* "Reach Out" CTA */}
      <a
        href="#contact"
        id="nav-reach-out"
        className="hidden sm:inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[14px] font-semibold leading-[1.2] text-white shadow-[0_4px_14px_rgba(236,72,153,0.35)] transition-transform hover:scale-105 focus-visible:scale-105"
        style={{
          background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
        }}
      >
        Reach Out
      </a>
    </motion.nav>
  );
}
