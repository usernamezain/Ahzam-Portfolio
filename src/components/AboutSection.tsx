"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
      };

  return (
    <section
      className="relative z-10 w-full bg-[#08090C] text-white py-12 px-6 md:px-12 lg:px-20"
      aria-label="About and Profile"
    >
      <div className="mx-auto max-w-[900px]">
        <motion.div variants={containerVariants} {...motionProps}>
          {/* ==========================================
              1. Profile Row (Photo + Name/Title/Bio)
              - Layout: Flex row top-aligned (photo top edge aligns with name cap-height)
              - Responsive: Stacks vertically at <=640px (sm breakpoint)
             ========================================== */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-start gap-6"
          >
            {/* Headshot Photo (~105px x 115px with thin teal glow ring) */}
            <div className="relative shrink-0 w-[105px] h-[115px] rounded-[16px] overflow-hidden border border-[#2DD4BF]/50 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
              <Image
                src="/profile.png"
                alt="Gaurav Gupta headshot"
                fill
                sizes="105px"
                className="object-cover"
              />
            </div>

            {/* Text block */}
            <div className="flex flex-col items-start pt-0.5">
              <h2 className="text-[25px] font-bold leading-tight text-[#2DD4BF]">
                Gaurav Gupta
              </h2>
              <p className="mt-1 text-[15px] font-bold leading-tight text-white">
                Full Stack Developer
              </p>
              <p className="mt-2 text-[13.5px] font-normal leading-[1.6] text-[#A0A8B0] max-w-[680px]">
                I build scalable, modern applications with a strong focus on clean
                architecture, delightful UX, and performance. My toolkit spans Java,
                React, Next.js, TypeScript, Tailwind CSS, and RestfulAPI— bringing
                ideas to life from concept to production with robust APIs and smooth
                interfaces.
              </p>
            </div>
          </motion.div>

          {/* ==========================================
              2. Stat Cards Row (3 equal-width cards)
              - Accessible <dl> container
              - Stat 1 & 2: Teal accent top border (#2DD4BF)
              - Stat 3: Pink accent top border (#EC4899)
             ========================================== */}
          <motion.div variants={fadeUp} className="mt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {/* Stat Card 1 */}
              <div className="bg-[#14171C] rounded-[10px] p-4 border-t-2 border-t-[#2DD4BF] border-x border-b border-white/5 flex flex-col justify-center transition-transform hover:-translate-y-0.5">
                <dt className="text-[11px] font-normal text-[#A0A8B0]">
                  Experience
                </dt>
                <dd className="mt-1 text-[15px] font-bold text-white">
                  1+ years
                </dd>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-[#14171C] rounded-[10px] p-4 border-t-2 border-t-[#2DD4BF] border-x border-b border-white/5 flex flex-col justify-center transition-transform hover:-translate-y-0.5">
                <dt className="text-[11px] font-normal text-[#A0A8B0]">
                  Specialty
                </dt>
                <dd className="mt-1 text-[15px] font-bold text-white">
                  Full Stack
                </dd>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-[#14171C] rounded-[10px] p-4 border-t-2 border-t-[#EC4899] border-x border-b border-white/5 flex flex-col justify-center transition-transform hover:-translate-y-0.5">
                <dt className="text-[11px] font-normal text-[#A0A8B0]">
                  Focus
                </dt>
                <dd className="mt-1 text-[15px] font-bold text-white">
                  Performance &amp; UX
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* ==========================================
              3. Action Buttons Row
              - Primary: Solid white button with dark text
              - Secondary: Dark transparent with light gray border
             ========================================== */}
          <motion.div
            variants={fadeUp}
            className="mt-5 flex items-center gap-3 flex-wrap"
          >
            <a
              href="#projects"
              id="btn-view-projects"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[13.5px] font-semibold text-[#0A0A0A] transition-transform hover:scale-[1.03] focus-visible:scale-[1.03]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              id="btn-get-in-touch"
              className="inline-flex items-center justify-center rounded-full bg-transparent border border-[#3A3F45] px-6 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:scale-[1.03]"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* ==========================================
              4. "About Me" Subsection
             ========================================== */}
          <motion.div variants={fadeUp} className="mt-12">
            <h3 className="text-[23px] font-bold text-white">About Me</h3>
            <p className="mt-4 text-[14px] font-normal leading-[1.6] text-[#A0A8B0] max-w-[720px]">
              I&apos;m a Software Developer, Content Creator, and Web Developer —
              passionate about building fast, resilient applications and sharing coding
              insights on Instagram and YouTube.
            </p>
            <p className="mt-3 text-[14px] font-normal leading-[1.6] text-[#A0A8B0] max-w-[720px]">
              I love turning ideas into scalable, user-friendly products that make an
              impact.
            </p>
          </motion.div>

          {/* ==========================================
              5. Next Section Boundary ("My Skills" Heading)
              - Spaced ~64px below About Me section
              - Heading only, section content is out of scope
             ========================================== */}
          <motion.div variants={fadeUp} className="mt-16 pt-4 text-center">
            <h2 className="text-[27px] font-bold text-[#2DD4BF]">My Skills</h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
