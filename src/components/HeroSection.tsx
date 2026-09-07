"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import StarField from "./StarField";
import Navbar from "./Navbar";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  },
};

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : { initial: "hidden", animate: "visible" };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#08090C" }}
      aria-label="Hero"
    >
      {/* ===== Z-INDEX STACKING =====
        z-0  : StarField canvas (particles)
        z-[1]: Radial glow backgrounds (decorative)
        z-10 : Content grid (text + image)
        z-20 : Navbar (stays on top)
      ================================ */}

      {/* Background glow — top-left teal-green (#06342E) */}
      <div
        className="pointer-events-none absolute z-[1]"
        aria-hidden="true"
        style={{
          top: "-10%",
          left: "-5%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(6, 52, 46, 0.6) 0%, transparent 70%)",
        }}
      />

      {/* Background glow — right teal-green (#06342E) (behind character) */}
      <div
        className="pointer-events-none absolute z-[1]"
        aria-hidden="true"
        style={{
          top: "10%",
          right: "-10%",
          width: "65%",
          height: "90%",
          background:
            "radial-gradient(ellipse at center, rgba(6, 52, 46, 0.7) 0%, transparent 65%)",
        }}
      />

      {/* Star field */}
      <StarField />

      {/* Navbar */}
      <Navbar />

      {/* Hero content grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1536px] grid-cols-1 items-center gap-12 px-6 pt-[120px] pb-16 md:px-12 lg:grid-cols-[55fr_45fr] lg:gap-0 lg:px-20">
        {/* ---- Left column: text content ---- */}
        <motion.div
          variants={containerVariants}
          {...motionProps}
          className="flex flex-col items-start"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-[22px] font-semibold leading-[1.3] text-[#A0A8B0]"
          >
            Web Developer
            <span className="cursor-blink ml-0.5 text-[#2DD4BF]">|</span>
          </motion.p>

          {/* Heading */}
          <motion.h1 variants={fadeUp} className="mt-4">
            <span className="block text-[42px] font-bold leading-[1.15] text-[#2DD4BF] md:text-[46px]">
              Hello, I&apos;m
            </span>
            <span className="mt-1 block text-[52px] font-extrabold leading-[1.1] tracking-[-0.5px] text-white md:text-[56px]">
              Gaurav Gupta
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[520px] text-[16px] font-normal leading-[1.6] text-[#A0A8B0] md:text-[17px]"
          >
            I turn complex ideas into seamless, high-impact web experiences —
            building modern, scalable, and lightning-fast applications that make
            a difference.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
            <a
              href="#work"
              id="cta-view-work"
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[15px] font-semibold leading-[1.2] text-[#0A0A0A] shadow-[0_4px_20px_rgba(166,243,239,0.25)] transition-transform hover:scale-105 focus-visible:scale-105"
              style={{
                background: "linear-gradient(135deg, #2dd4bf, #A6F3EF)",
              }}
            >
              View My Work
            </a>
            <a
              href="#resume"
              id="cta-resume"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold leading-[1.2] text-[#0A0A0A] transition-transform hover:scale-105 focus-visible:scale-105"
            >
              My Resume
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center gap-6"
          >
            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              id="social-x"
              className="text-white transition-colors hover:text-[#2DD4BF]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              id="social-linkedin"
              className="text-white transition-colors hover:text-[#2DD4BF]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              id="social-github"
              className="text-white transition-colors hover:text-[#2DD4BF]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* ---- Right column: character image ---- */}
        <motion.div
          variants={prefersReducedMotion ? {} : imageReveal}
          initial={prefersReducedMotion ? {} : "hidden"}
          animate={prefersReducedMotion ? {} : "visible"}
          className="flex items-center justify-center lg:justify-end"
        >
          {/* On mobile (<1024px) the image drops below the text, constrained to max-h-[50vh].
              On desktop, it's vertically centered in the grid row. */}
          <div className="relative h-auto max-h-[50vh] w-full max-w-[480px] lg:max-h-none lg:max-w-none lg:w-[90%]">
            <Image
              src="/character.png"
              alt="3D-rendered hooded character with teal hoodie and glowing pink eyes"
              width={480}
              height={650}
              preload
              sizes="(max-width: 1024px) 80vw, 45vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
