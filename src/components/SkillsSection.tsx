"use client";

import { useEffect, useRef } from "react";
import RAPIER from "@dimforge/rapier2d-compat";

interface SkillData {
  id: string;
  name: string;
  category: string;
  color: string;
  glowColor: string;
  width: number;
  height: number;
  svgPath: string;
}

const skillsList: SkillData[] = [
  {
    id: "html5",
    name: "HTML5",
    category: "Structure",
    color: "#E34F26",
    glowColor: "rgba(227, 79, 38, 0.35)",
    width: 145,
    height: 40,
    svgPath: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.234-2.625h11.438l.234-2.625H5.438l.688 7.875h10.422l-.469 5.25-4.109 1.141-4.109-1.141-.266-3h-2.64l.484 5.625 6.531 1.813 6.531-1.813.906-10.5H8.531z",
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Styling",
    color: "#1572B6",
    glowColor: "rgba(21, 114, 182, 0.35)",
    width: 140,
    height: 40,
    svgPath: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.234-2.625h11.438l.234-2.625H5.438l.688 7.875h10.422l-.469 5.25-4.109 1.141-4.109-1.141-.266-3h-2.64l.484 5.625 6.531 1.813 6.531-1.813.906-10.5H8.531z",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Language",
    color: "#F7DF1E",
    glowColor: "rgba(247, 223, 30, 0.35)",
    width: 160,
    height: 40,
    svgPath: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034-1.021.03-1.95.421-2.506 1.096-.84.975-.81 2.37-.03 3.374.87 1.066 2.22 1.456 3.39 1.951.78.345 1.155.63 1.26.975.21.675-.15 1.17-.855 1.35-.9.21-1.875-.075-2.4-.945-.06-.105-.12-.226-.165-.361l-1.845 1.05c.285.615.69 1.17 1.2 1.56 1.02.78 2.37.96 3.75.645 1.365-.33 2.28-1.29 2.22-2.31zM11.985 8.52h2.205V18.15c0 1.56-.375 2.505-1.245 3.09-1.035.705-2.52.585-3.27-.405-.285-.39-.42-.81-.465-1.245l1.905-.99c.075.285.225.57.42.75.345.315.825.285 1.125-.09.18-.21.285-.555.285-1.11V8.52z",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type Safety",
    color: "#3178C6",
    glowColor: "rgba(49, 120, 198, 0.35)",
    width: 160,
    height: 40,
    svgPath: "M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.237 13.909v-1.636h-4.364V8.727h4.364V7.091H4.91v1.636h1.09v6.818h1.364v-1.636zm9.818 0c0-1.636-1.09-2.727-3-3.273-.818-.273-1.363-.545-1.363-.909 0-.455.363-.727.909-.727.636 0 1.182.273 1.545.727l1.09-1.09c-.636-.818-1.545-1.182-2.636-1.182-1.636 0-2.636 1-2.636 2.364 0 1.455.91 2.363 2.727 2.909.91.272 1.364.545 1.364 1 0 .545-.455.818-1.182.818-.818 0-1.455-.364-1.91-1l-1.181 1.09c.727 1 1.818 1.455 3.09 1.455 1.819 0 3-.909 3-2.273z",
  },
  {
    id: "react",
    name: "React",
    category: "UI Engine",
    color: "#61DAFB",
    glowColor: "rgba(97, 218, 251, 0.35)",
    width: 145,
    height: 40,
    svgPath: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7c-5.26 0-9.84 2.27-11.45 5.57-.42.86-.42 1.99 0 2.85C2.16 13.73 6.74 16 12 16s9.84-2.27 11.45-5.58c.42-.86.42-1.99 0-2.85C21.84 4.27 17.26 2 12 2zm0 12c-4.73 0-8.91-1.99-10.4-4.85C3.09 6.29 7.27 4.3 12 4.3s8.91 1.99 10.4 4.85c-1.49 2.86-5.67 4.85-10.4 4.85z",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full Stack",
    color: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.35)",
    width: 150,
    height: 40,
    svgPath: "M18.665 21.978l-8.73-12.78v12.78H7.5V2.022h2.435l8.73 12.802V2.022h2.435v19.956h-2.435z",
  },
  {
    id: "vue",
    name: "Vue.js",
    category: "Framework",
    color: "#4FC08D",
    glowColor: "rgba(79, 192, 141, 0.35)",
    width: 145,
    height: 40,
    svgPath: "M19.197 1.636h3.62L12 20.364.818 1.636h3.62l7.562 12.818 7.197-12.818zM15.485 1.636h3.62L12 13.636 4.895 1.636h3.62L12 7.727l3.485-6.091z",
  },
  {
    id: "angular",
    name: "Angular",
    category: "Framework",
    color: "#DD0031",
    glowColor: "rgba(221, 0, 49, 0.35)",
    width: 150,
    height: 40,
    svgPath: "M12 0L1.7 3.65l1.58 13.69L12 24l8.72-6.66 1.58-13.69L12 0zm0 3.82l5.05 11.36h-2.12l-1.04-2.6H10.1l-1.04 2.6H6.95L12 3.82zm1.2 6.74L12 6.94l-1.2 3.62h2.4z",
  },
  {
    id: "gsap",
    name: "GSAP",
    category: "Animation",
    color: "#88CE02",
    glowColor: "rgba(136, 206, 2, 0.35)",
    width: 145,
    height: 40,
    svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-4h2v4zm-2-8h-2V7h2v2z",
  },
  {
    id: "lenis",
    name: "Lenis",
    category: "Smooth Scroll",
    color: "#2DD4BF",
    glowColor: "rgba(45, 212, 191, 0.35)",
    width: 155,
    height: 40,
    svgPath: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-4-9h8v2H8zm4-4h2v8h-2z",
  },
  {
    id: "spline",
    name: "Spline 3D",
    category: "3D Design",
    color: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.35)",
    width: 155,
    height: 40,
    svgPath: "M12 2L2 7l10 5 10-5-10-5zm0 8.3L4.5 7 12 3.7 19.5 7 12 10.3zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    id: "framer",
    name: "Framer Motion",
    category: "Motion",
    color: "#FF0055",
    glowColor: "rgba(255, 0, 85, 0.35)",
    width: 165,
    height: 40,
    svgPath: "M0 0h12v6H6v6h6v6H6v6H0V0zm12 0h12v12h-6v6h6v6H12V0z",
  },
  {
    id: "anime",
    name: "Anime.js",
    category: "Micro Motion",
    color: "#F64F59",
    glowColor: "rgba(246, 79, 89, 0.35)",
    width: 155,
    height: 40,
    svgPath: "M5 3l14 9-14 9V3z",
  },
  {
    id: "astro",
    name: "Astro.js",
    category: "Islands UI",
    color: "#BC52EE",
    glowColor: "rgba(188, 82, 238, 0.35)",
    width: 150,
    height: 40,
    svgPath: "M12 2.25a.75.75 0 0 1 .71.51l2.42 7.25h7.62a.75.75 0 0 1 .44 1.36l-6.17 4.48 2.36 7.26a.75.75 0 0 1-1.15.84L12 19.47l-6.23 4.48a.75.75 0 0 1-1.15-.84l2.36-7.26-6.17-4.48a.75.75 0 0 1 .44-1.36h7.62l2.42-7.25a.75.75 0 0 1 .71-.51z",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Styling",
    color: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.35)",
    width: 160,
    height: 40,
    svgPath: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z",
  },
];

export default function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;
    let animationFrameId: number;

    const initRapier = async () => {
      // Initialize Rapier WASM module
      await RAPIER.init();
      if (isCancelled) return;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const SCALE = 60; // 60 pixels = 1 meter in Rapier physics
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      let width = container.clientWidth || 760;
      let height = container.clientHeight || 380;

      const resizeCanvas = () => {
        width = container.clientWidth || 760;
        height = container.clientHeight || 380;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      };

      resizeCanvas();

      // Create Rapier2D Physics World with realistic downward physical gravity
      const gravity = { x: 0.0, y: 28.0 };
      const world = new RAPIER.World(gravity);

      // Boundary Colliders (Cuboids take HALF-extents)
      const wallHalfThickness = 2.0;

      // Ground Floor (Top surface aligns exactly with inner bottom border of the frame)
      const groundBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(
        width / 2 / SCALE,
        height / SCALE + wallHalfThickness
      );
      const groundBody = world.createRigidBody(groundBodyDesc);
      world.createCollider(
        RAPIER.ColliderDesc.cuboid((width / SCALE) * 2, wallHalfThickness),
        groundBody
      );

      // Top Ceiling (Positioned above the frame to allow bouncy tosses)
      const ceilingBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(
        width / 2 / SCALE,
        -4.0 - wallHalfThickness
      );
      const ceilingBody = world.createRigidBody(ceilingBodyDesc);
      world.createCollider(
        RAPIER.ColliderDesc.cuboid((width / SCALE) * 2, wallHalfThickness),
        ceilingBody
      );

      // Left Wall (Right edge aligns with inner left border x = 0)
      const leftWallDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(
        -wallHalfThickness,
        height / 2 / SCALE
      );
      const leftBody = world.createRigidBody(leftWallDesc);
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(wallHalfThickness, (height / SCALE) * 2),
        leftBody
      );

      // Right Wall (Left edge aligns with inner right border x = width)
      const rightWallDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(
        width / SCALE + wallHalfThickness,
        height / 2 / SCALE
      );
      const rightBody = world.createRigidBody(rightWallDesc);
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(wallHalfThickness, (height / SCALE) * 2),
        rightBody
      );

      // Dynamic Framework Chip Bodies
      interface ChipEntity {
        body: RAPIER.RigidBody;
        skill: SkillData;
        path: Path2D;
      }

      const chips: ChipEntity[] = [];

      skillsList.forEach((skill, idx) => {
        const cols = 4;
        const col = idx % cols;
        const row = Math.floor(idx / cols);

        const spawnX = (width / (cols + 1)) * (col + 1) + (Math.random() * 30 - 15);
        const spawnY = -40 - row * 60 - Math.random() * 40;

        const hx = skill.width / 2 / SCALE;
        const hy = skill.height / 2 / SCALE;

        const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(spawnX / SCALE, spawnY / SCALE)
          .setRotation((Math.random() - 0.5) * 0.4)
          .setLinearDamping(0.35)
          .setAngularDamping(0.55);

        const body = world.createRigidBody(bodyDesc);

        // Round cuboid for realistic physics bounce & sliding friction
        const colliderDesc = RAPIER.ColliderDesc.roundCuboid(
          Math.max(0.05, hx - 0.08),
          Math.max(0.05, hy - 0.08),
          0.08
        )
          .setRestitution(0.42)
          .setFriction(0.45)
          .setDensity(1.2);

        world.createCollider(colliderDesc, body);

        const path = new Path2D(skill.svgPath);
        chips.push({ body, skill, path });
      });

      // Mouse Drag & Toss Interaction
      let draggedChip: ChipEntity | null = null;
      let dragOffset = { x: 0, y: 0 };
      let mousePos = { x: 0, y: 0 };
      let lastMousePos = { x: 0, y: 0 };
      let mouseVel = { x: 0, y: 0 };

      const getCanvasCoords = (e: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = "touches" in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = "touches" in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
        return {
          x: (clientX || 0) - rect.left,
          y: (clientY || 0) - rect.top,
        };
      };

      const handlePointerDown = (e: MouseEvent | TouchEvent) => {
        if (isCancelled || isDestroyed) return;
        const { x, y } = getCanvasCoords(e);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        mousePos = { x, y };
        lastMousePos = { x, y };
        mouseVel = { x: 0, y: 0 };

        // Test which chip is clicked
        for (const chip of chips) {
          try {
            const pos = chip.body.translation();
            if (!pos || !Number.isFinite(pos.x) || !Number.isFinite(pos.y)) continue;
            const px = pos.x * SCALE;
            const py = pos.y * SCALE;
            const w = chip.skill.width;
            const h = chip.skill.height;

            if (x >= px - w / 2 && x <= px + w / 2 && y >= py - h / 2 && y <= py + h / 2) {
              draggedChip = chip;
              dragOffset = { x: px - x, y: py - y };
              chip.body.setLinvel({ x: 0, y: 0 }, true);
              chip.body.setAngvel(0, true);
              break;
            }
          } catch {
            // safely handle
          }
        }
      };

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        if (isCancelled || isDestroyed) return;
        const { x, y } = getCanvasCoords(e);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        if (lastMousePos.x !== 0 || lastMousePos.y !== 0) {
          mouseVel = { x: x - lastMousePos.x, y: y - lastMousePos.y };
        }
        lastMousePos = { x, y };
        mousePos = { x, y };

        if (draggedChip) {
          try {
            const halfW = draggedChip.skill.width / 2;
            const halfH = draggedChip.skill.height / 2;
            const targetX = x + dragOffset.x;
            const targetY = y + dragOffset.y;
            const clampedX = Math.max(halfW + 4, Math.min(width - halfW - 4, targetX));
            const clampedY = Math.max(halfH + 4, Math.min(height - halfH - 4, targetY));

            draggedChip.body.setTranslation(
              {
                x: clampedX / SCALE,
                y: clampedY / SCALE,
              },
              true
            );
            draggedChip.body.setLinvel(
              {
                x: Math.max(-20, Math.min(20, mouseVel.x * 0.45)),
                y: Math.max(-20, Math.min(20, mouseVel.y * 0.45)),
              },
              true
            );
          } catch {
            // safely handle
          }
        }
      };

      const handlePointerUp = () => {
        if (draggedChip) {
          try {
            const maxVel = 22;
            const vx = Math.max(-maxVel, Math.min(maxVel, (mouseVel.x || 0) * 0.5));
            const vy = Math.max(-maxVel, Math.min(maxVel, (mouseVel.y || 0) * 0.5));
            draggedChip.body.setLinvel({ x: vx, y: vy }, true);
          } catch {
            // safely handle
          }
          draggedChip = null;
        }
      };

      canvas.addEventListener("mousedown", handlePointerDown);
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);
      canvas.addEventListener("touchstart", handlePointerDown, { passive: true });
      window.addEventListener("touchmove", handlePointerMove, { passive: true });
      window.addEventListener("touchend", handlePointerUp);

      // 120 FPS Pure Canvas 2D + Rapier WASM Game Loop
      let isDestroyed = false;

      const render = () => {
        if (isCancelled || isDestroyed) return;

        try {
          // Step Rust WASM Physics
          world.step();

          // Physical Bounds Safety: If any chip tunnels far below the floor, drop it from the top so it physically falls back down
          chips.forEach(({ body, skill }) => {
            if (body.bodyType() === RAPIER.RigidBodyType.Dynamic && body !== draggedChip?.body) {
              const t = body.translation();
              if (!Number.isFinite(t.x) || !Number.isFinite(t.y)) {
                body.setTranslation({ x: width / 2 / SCALE, y: -0.5 }, true);
                body.setLinvel({ x: 0, y: 0 }, true);
                return;
              }

              const halfW = skill.width / 2;
              const minX = (halfW + 4) / SCALE;
              const maxX = (width - halfW - 4) / SCALE;
              const maxY = (height + 100) / SCALE;

              if (t.y > maxY || t.x < minX - 2.0 || t.x > maxX + 2.0) {
                // Drop from above with physical gravity fall
                body.setTranslation(
                  {
                    x: Math.max(minX, Math.min(maxX, t.x)),
                    y: -0.6,
                  },
                  true
                );
                body.setLinvel({ x: (Math.random() - 0.5) * 2, y: 2.0 }, true);
              }
            }
          });

          ctx.save();
          ctx.scale(dpr, dpr);
          ctx.clearRect(0, 0, width, height);

          // Draw each physical chip
          chips.forEach(({ body, skill, path }) => {
            const t = body.translation();
            const angle = body.rotation();

            if (!Number.isFinite(t.x) || !Number.isFinite(t.y) || !Number.isFinite(angle)) {
              return;
            }

            const px = t.x * SCALE;
            const py = t.y * SCALE;
            const w = skill.width;
            const h = skill.height;
            const r = 8; // rounded corner

            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(angle);

            // 1. Draw Rounded Card with Rich Subtle Gradient Background
            const cardGrad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
            cardGrad.addColorStop(0, "#1A1E2B");
            cardGrad.addColorStop(0.5, "#12151E");
            cardGrad.addColorStop(1, "#0A0C12");

            ctx.beginPath();
            ctx.roundRect(-w / 2, -h / 2, w, h, r);
            ctx.fillStyle = cardGrad;
            ctx.fill();

            // 2. Subtle Brand Color Ambient Wash at Top Edge
            const brandWash = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
            brandWash.addColorStop(0, skill.glowColor || "rgba(255, 255, 255, 0.12)");
            brandWash.addColorStop(0.5, "rgba(255, 255, 255, 0.01)");
            brandWash.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.fillStyle = brandWash;
            ctx.fill();

            // 3. Subtle Sleek Border Outline
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.13)";
            ctx.stroke();

            // 4. Draw Authentic Vector SVG Icon
            ctx.save();
            ctx.translate(-w / 2 + 12, -10);
            ctx.scale(0.85, 0.85);
            ctx.fillStyle = skill.color;
            ctx.fill(path);
            ctx.restore();

            // 5. Framework Title & Category Tag
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            // Title
            ctx.font = "bold 12.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(skill.name, -w / 2 + 37, -4);

            // Category Tag
            ctx.font = "bold 8.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            ctx.fillStyle = skill.color;
            ctx.fillText(skill.category.toUpperCase(), -w / 2 + 37, 9);

            ctx.restore();
          });

          ctx.restore();
        } catch {
          // If wasm context was cleared or cancelled, stop rendering gracefully
          return;
        }

        if (!isCancelled && !isDestroyed) {
          animationFrameId = requestAnimationFrame(render);
        }
      };

      animationFrameId = requestAnimationFrame(render);

      const handleResize = () => {
        if (isCancelled || isDestroyed) return;
        resizeCanvas();
        groundBody.setTranslation(
          { x: width / 2 / SCALE, y: height / SCALE + wallHalfThickness },
          true
        );
        ceilingBody.setTranslation(
          { x: width / 2 / SCALE, y: -4.0 - wallHalfThickness },
          true
        );
        rightBody.setTranslation(
          { x: width / SCALE + wallHalfThickness, y: height / 2 / SCALE },
          true
        );
      };

      window.addEventListener("resize", handleResize);

      return () => {
        isDestroyed = true;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("mousedown", handlePointerDown);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", handlePointerUp);
        canvas.removeEventListener("touchstart", handlePointerDown);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", handlePointerUp);
      };
    };

    let cleanupFn: (() => void) | undefined;
    initRapier().then((cleanup) => {
      if (isCancelled) {
        if (cleanup) cleanup();
      } else {
        cleanupFn = cleanup;
      }
    });

    return () => {
      isCancelled = true;
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative z-30 w-full overflow-hidden bg-[#08090C] py-12 md:py-16 flex flex-col justify-center border-t border-white/[0.12] shadow-[0_-30px_90px_rgba(0,0,0,0.98)]"
      aria-label="Skills Physics Collision Sandbox"
    >
      {/* Section Header */}
      <div className="relative z-20 mx-auto max-w-[1200px] px-6 text-center mb-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 px-3.5 py-1 text-[11.5px] font-semibold text-[#2DD4BF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
          Rapier2D Rust/WASM Physics
        </div>
        <h2 className="mt-2.5 text-[28px] sm:text-[34px] font-extrabold tracking-tight text-white">
          Skills &amp;{" "}
          <span className="bg-gradient-to-r from-[#2DD4BF] via-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>
        <p className="mt-1.5 text-[13px] sm:text-[14px] text-[#A0A8B0] max-w-[500px] mx-auto">
          Rust-powered collision arena. Click, drag, and toss the framework chips around!
        </p>
      </div>

      {/* Compact Physics Canvas Arena Box */}
      <div className="relative z-20 mx-auto w-full max-w-[820px] px-4">
        <div
          ref={containerRef}
          className="relative h-[360px] sm:h-[400px] w-full overflow-hidden rounded-[18px] border border-white/[0.12] bg-[#0E1117]/85 backdrop-blur-2xl shadow-[inset_0_0_35px_rgba(0,0,0,0.85)] cursor-grab active:cursor-grabbing select-none"
        >
          {/* Subtle Grid Dot Pattern Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
            aria-hidden="true"
          />

          {/* Interactive Instruction Pill */}
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[10.5px] font-medium text-[#7E8B99] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF] animate-ping" />
            Drag &amp; fling chips (Rapier2D WASM 120 FPS)
          </div>

          {/* 120 FPS High-Performance HTML5 Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 block touch-none" />
        </div>
      </div>
    </section>
  );
}
