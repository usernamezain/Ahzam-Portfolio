"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarField from "./StarField";
import Navbar from "./Navbar";

/**
 * Typewriter text cycling through 3 short 2-3 word sentences:
 * - Clean & Scalable Code
 * - Creative Web Experiences
 * - Professional Full Stack
 */
function TypewriterEyebrow() {
  const phrases = [
    "Clean & Scalable Code",
    "Creative Web Experiences",
    "Professional Full Stack",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 38 : 75;

    // Finished typing full phrase -> pause before deleting
    if (!isDeleting && displayedText === currentPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), 1700);
      return () => clearTimeout(timeout);
    }

    // Finished deleting -> move to next phrase
    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <p className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold leading-[1.3] text-[#A0A8B0] flex items-center">
      <span className="text-[#2DD4BF] font-semibold">{displayedText}</span>
      <span className="cursor-blink ml-1 text-[#2DD4BF]">|</span>
    </p>
  );
}

export default function HeroAboutExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const aboutButtonsRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mouse movement subtle parallax for background glows (10-20px max)
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;

      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;

      // Restrict offset to 10–20px
      const targetX1 = normX * 32; // max ~16px
      const targetY1 = normY * 32;
      const targetX2 = -normX * 28; // max ~14px subtle counter-balance
      const targetY2 = -normY * 28;

      if (glow1Ref.current) {
        gsap.to(glow1Ref.current, {
          x: targetX1,
          y: targetY1,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (glow2Ref.current) {
        gsap.to(glow2Ref.current, {
          x: targetX2,
          y: targetY2,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    if (prefersReducedMotion) {
      if (aboutTextRef.current) {
        gsap.set(aboutTextRef.current, { opacity: 1, pointerEvents: "auto" });
      }
      if (aboutButtonsRef.current) {
        gsap.set(aboutButtonsRef.current, { opacity: 1, pointerEvents: "auto" });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;

      // Set initial states explicitly with GSAP
      gsap.set(aboutTextRef.current, { opacity: 0, pointerEvents: "none" });
      gsap.set(aboutButtonsRef.current, { opacity: 0, pointerEvents: "none", y: 20 });
      gsap.set(
        aboutTextRef.current?.querySelectorAll(".about-stagger-item") || [],
        { opacity: 0, y: 30, x: isDesktop ? 15 : 0 }
      );

      // Master ScrollTrigger timeline linking Hero to About (scrubs across 100vh of scroll)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      if (isDesktop) {
        // ==========================================
        // DESKTOP: 50/50 Horizontal Glide (Right -> Left)
        // ==========================================
        tl
          // 1. Hero text fades and slides up
          .to(
            heroTextRef.current,
            {
              opacity: 0,
              y: -45,
              pointerEvents: "none",
              ease: "power2.inOut",
              duration: 0.4,
            },
            0
          )
          // 2. Character image glides from Right (col 2) across to Left (col 1)
          .to(
            characterRef.current,
            {
              xPercent: -100,
              ease: "power1.inOut",
              duration: 0.8,
            },
            0.05
          )
          // 3. About text parent container fades in and enables pointer events
          .to(
            aboutTextRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.35,
              ease: "power2.out",
            },
            0.25
          )
          // 4. Staggered reveal of About text and stat items
          .to(
            aboutTextRef.current?.querySelectorAll(".about-stagger-item") || [],
            {
              opacity: 1,
              y: 0,
              x: 0,
              stagger: 0.08,
              ease: "power2.out",
              duration: 0.5,
            },
            0.3
          )
          // 5. Reveal bottom action buttons in the center
          .to(
            aboutButtonsRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              y: 0,
              scale: 1,
              ease: "power2.out",
              duration: 0.4,
            },
            0.6
          );
      } else {
        // ==========================================
        // MOBILE & TABLET: Vertical Responsive Transition
        // ==========================================
        tl
          .to(
            heroTextRef.current,
            {
              opacity: 0,
              y: -30,
              pointerEvents: "none",
              ease: "power2.inOut",
              duration: 0.35,
            },
            0
          )
          .to(
            characterRef.current,
            {
              scale: 0.7,
              yPercent: -50,
              ease: "power1.inOut",
              duration: 0.65,
            },
            0.05
          )
          .to(
            aboutTextRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.35,
              ease: "power2.out",
            },
            0.25
          )
          .to(
            aboutTextRef.current?.querySelectorAll(".about-stagger-item") || [],
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              ease: "power2.out",
              duration: 0.5,
            },
            0.3
          )
          .to(
            aboutButtonsRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              y: 0,
              ease: "power2.out",
              duration: 0.35,
            },
            0.6
          );
      }
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={trackRef} className="relative w-full h-[200vh]">
      <section
        ref={containerRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#08090C] z-10"
        aria-label="Hero and About Experience"
      >
      {/* Decorative radial glows following cursor subtly (10-20px) */}
      <div
        ref={glow1Ref}
        className="pointer-events-none absolute z-[1] will-change-transform"
        aria-hidden="true"
        style={{
          top: "-10%",
          left: "-5%",
          width: "55%",
          height: "65%",
          background:
            "radial-gradient(ellipse at center, rgba(6, 52, 46, 0.65) 0%, transparent 70%)",
        }}
      />
      <div
        ref={glow2Ref}
        className="pointer-events-none absolute z-[1] will-change-transform"
        aria-hidden="true"
        style={{
          bottom: "-10%",
          right: "-10%",
          width: "65%",
          height: "75%",
          background:
            "radial-gradient(ellipse at center, rgba(6, 52, 46, 0.75) 0%, transparent 65%)",
        }}
      />

      {/* Floating Animated Particle Field (Always on top for aesthetic depth) */}
      <StarField />

      {/* Persistent Navbar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Navbar />
      </div>

      {/* ========================================================
          PINNED VIEWPORT CONTAINER (100dvh)
          50/50 Split on Desktop (Equal Width, Height, Margins & Padding)
      ======================================================== */}
      <div className="relative z-10 mx-auto flex h-[100dvh] w-full max-w-[1536px] flex-col justify-between px-6 pt-[76px] pb-5 md:px-12 lg:px-20">
        {/* Main 50/50 Content Grid */}
        <div className="relative grid h-full w-full grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-0">
          {/* ==================================================
              HERO LEFT COLUMN (Text Content)
              Occupies Column 1 (Left 50%)
          ================================================== */}
          <div
            ref={heroTextRef}
            className="flex flex-col items-start justify-center will-change-[transform,opacity] lg:pr-10 z-10"
          >
            {/* Dynamic Typewriter Eyebrow */}
            <TypewriterEyebrow />

            {/* Heading */}
            <h1 className="mt-2 sm:mt-3 md:mt-4">
              <span className="block text-[32px] sm:text-[40px] md:text-[46px] font-bold leading-[1.15] bg-gradient-to-r from-[#2DD4BF] via-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent">
                Hello, I&apos;m
              </span>
              <span className="mt-1 block text-[38px] sm:text-[48px] md:text-[56px] font-extrabold leading-[1.1] tracking-[-0.5px] text-white">
                Gaurav Gupta
              </span>
            </h1>

            {/* Body */}
            <p className="mt-3 md:mt-5 max-w-[500px] text-[14px] sm:text-[15px] md:text-[16.5px] font-normal leading-[1.6] text-[#A0A8B0]">
              I turn complex ideas into seamless, high-impact web experiences —
              building modern, scalable, and lightning-fast applications that
              make a difference.
            </p>

            {/* Buttons */}
            <div className="mt-5 md:mt-7 flex items-center gap-3 sm:gap-4 flex-wrap">
              <a
                href="#projects"
                id="cta-view-work"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full px-6 sm:px-7 py-3 text-[13.5px] sm:text-[14.5px] font-bold text-[#08090C] shadow-[0_4px_22px_rgba(45,212,191,0.35)] transition-all hover:scale-105 hover:shadow-[0_6px_28px_rgba(56,189,248,0.45)] focus-visible:scale-105"
                style={{
                  background: "linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%)",
                }}
              >
                View My Work
              </a>
              <a
                href="#resume"
                id="cta-resume"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 sm:px-7 py-3 text-[13.5px] sm:text-[14.5px] font-semibold text-[#0A0A0A] transition-transform hover:scale-105 focus-visible:scale-105"
              >
                My Resume
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-5 sm:gap-6">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                id="social-x"
                className="text-white transition-colors hover:text-[#2DD4BF] p-1"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                id="social-linkedin"
                className="text-white transition-colors hover:text-[#2DD4BF] p-1"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                id="social-github"
                className="text-white transition-colors hover:text-[#2DD4BF] p-1"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>

          {/* ==================================================
              SHARED 3D CHARACTER IMAGE
              Starts in Hero Right Column (Col 2)
              Glides seamlessly to About Left Column (Col 1) on scroll
          ================================================== */}
          <div
            ref={characterRef}
            className="relative flex items-center justify-center will-change-[transform] select-none z-10"
            style={{
              transform: "translate3d(0, 0, 0)",
            }}
          >
            <div className="relative h-auto max-h-[38dvh] w-full max-w-[280px] sm:max-w-[360px] lg:max-h-[66dvh] lg:max-w-[460px]">
              {/* Subtle ambient back pulse */}
              <div
                className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-30 bg-[#2DD4BF]"
                aria-hidden="true"
              />
              <Image
                src="/character.png"
                alt="3D hooded developer character with glowing teal details"
                width={480}
                height={650}
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 460px"
                className="h-auto w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* ==================================================
              ABOUT RIGHT COLUMN (Text Content & Stats)
              Equal 50% width and height on desktop
          ================================================== */}
          <div
            ref={aboutTextRef}
            className="absolute right-0 top-0 flex h-full w-full flex-col justify-center will-change-[transform,opacity] lg:w-1/2 lg:pl-10 z-10"
            aria-label="About Information"
          >
            {/* Pill Badge */}
            <div className="about-stagger-item inline-flex items-center gap-2 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 px-3.5 py-1 text-[11.5px] sm:text-[12px] font-semibold text-[#2DD4BF] w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
              About Me
            </div>

            {/* Name & Title */}
            <h2 className="about-stagger-item mt-2 sm:mt-3 text-[28px] sm:text-[34px] md:text-[38px] font-bold leading-tight text-[#2DD4BF]">
              Gaurav Gupta
            </h2>
            <p className="about-stagger-item mt-0.5 sm:mt-1 text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-white">
              Full Stack Developer
            </p>

            {/* Bio */}
            <p className="about-stagger-item mt-3 sm:mt-4 text-[13.5px] sm:text-[14.5px] md:text-[15.5px] font-normal leading-[1.6] text-[#A0A8B0] max-w-[560px]">
              I build scalable, modern applications with a strong focus on clean
              architecture, delightful UX, and performance. My toolkit spans
              Java, React, Next.js, TypeScript, Tailwind CSS, and RestfulAPI—
              bringing ideas to life from concept to production with robust APIs
              and smooth interfaces.
            </p>

            {/* 3 Creative Interactive Capsules */}
            <div className="about-stagger-item mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-[580px]">
              {/* Capsule 1: Experience */}
              <div className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-[#161A22]/90 to-[#0D1016]/95 p-3.5 sm:p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#2DD4BF]/40 hover:shadow-[0_10px_30px_-10px_rgba(45,212,191,0.25)]">
                {/* Top edge glow accent */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-[#8CA0B3] uppercase">
                    Experience
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 text-[#2DD4BF]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[20px] sm:text-[22px] font-extrabold tracking-tight text-white group-hover:text-[#2DD4BF] transition-colors">
                    1+
                  </span>
                  <span className="text-[13px] font-semibold text-[#A0A8B0]">
                    Years
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-medium text-[#2DD4BF]/90 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-[#2DD4BF] animate-ping" />
                  Building &amp; Shipping
                </p>
              </div>

              {/* Capsule 2: Specialty */}
              <div className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-[#161A22]/90 to-[#0D1016]/95 p-3.5 sm:p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/40 hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.25)]">
                {/* Top edge glow accent */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-[#8CA0B3] uppercase">
                    Specialty
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[18px] sm:text-[20px] font-extrabold tracking-tight text-white group-hover:text-[#38BDF8] transition-colors">
                    Full Stack
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-medium text-[#38BDF8]/90 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-[#38BDF8]" />
                  Next.js &amp; Java Core
                </p>
              </div>

              {/* Capsule 3: Focus */}
              <div className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-[#161A22]/90 to-[#0D1016]/95 p-3.5 sm:p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#EC4899]/40 hover:shadow-[0_10px_30px_-10px_rgba(236,72,153,0.25)]">
                {/* Top edge glow accent */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-[#8CA0B3] uppercase">
                    Focus
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#EC4899]/30 bg-[#EC4899]/10 text-[#EC4899]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[17px] sm:text-[19px] font-extrabold tracking-tight text-white group-hover:text-[#EC4899] transition-colors">
                    Perf &amp; UX
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-medium text-[#EC4899]/90 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-[#EC4899]" />
                  Fast &amp; Ultra-Smooth
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            ABOUT BOTTOM CENTER BUTTONS
            Centered across bottom of About Section (View Projects & Get in Touch)
        ================================================== */}
        <div
          ref={aboutButtonsRef}
          className="relative z-30 flex w-full items-center justify-center gap-3 sm:gap-4 pb-2 sm:pb-3 will-change-[transform,opacity]"
        >
          <a
            href="#projects"
            id="about-btn-view-projects"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-7 sm:px-8 py-2.5 sm:py-3 text-[13.5px] sm:text-[14.5px] font-semibold text-[#0A0A0A] shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 focus-visible:scale-105"
          >
            View Projects
          </a>
          <a
            href="#contact"
            id="about-btn-get-in-touch"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#3A3F45] bg-[#14171C]/85 px-7 sm:px-8 py-2.5 sm:py-3 text-[13.5px] sm:text-[14.5px] font-semibold text-white backdrop-blur-md transition-all hover:border-[#2DD4BF]/50 hover:bg-white/10 focus-visible:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  </div>
  );
}
