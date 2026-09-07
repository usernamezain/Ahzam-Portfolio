"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  baseO: number;
  o: number;
  vx: number;
  vy: number;
  twinkleSpeed: number;
  phase: number;
}

/**
 * Animated Particle Field:
 * - Particles drift randomly across the screen with gentle floating physics.
 * - Subtle twinkle / shimmer effect.
 * - Rendered on top (z-20, pointer-events: none) for an immersive aesthetic depth.
 * - Respects prefers-reduced-motion with static rendering.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const count = Math.max(35, Math.floor((canvas.width * canvas.height) / 18000));

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const baseO = Math.random() * 0.35 + 0.15;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2.0 + 1.2, // Increased size: 1.2px - 3.2px radius (2.4px - 6.4px diameter)
          baseO,
          o: baseO,
          vx: (Math.random() - 0.5) * 0.85, // Increased velocity for livelier motion
          vy: (Math.random() - 0.5) * 0.85,
          twinkleSpeed: Math.random() * 0.03 + 0.015,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    initParticles();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges seamlessly
          if (p.x < 0) p.x = canvas.width;
          else if (p.x > canvas.width) p.x = 0;

          if (p.y < 0) p.y = canvas.height;
          else if (p.y > canvas.height) p.y = 0;

          // Subtle twinkle modulation
          p.o = Math.max(
            0.08,
            Math.min(0.65, p.baseO + Math.sin(time * p.twinkleSpeed + p.phase) * 0.18)
          );
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.o})`;
        ctx.shadowBlur = p.r > 2 ? 6 : 3;
        ctx.shadowColor = "rgba(45, 212, 191, 0.5)";
        ctx.fill();
      }

      time += 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      resize();
      initParticles();
      if (prefersReducedMotion) render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none"
    />
  );
}
