# 🌌 Ahzam — Ultra-Premium Interactive Developer Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-2DD4BF?style=for-the-badge" alt="Lenis" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## 🚀 Live Experience Highlights

A high-performance, cinematic personal developer portfolio built with smooth physics, synchronized GSAP ScrollTrigger scrub timelines, and depth-layered visual hierarchy.

```
       ┌────────────────────────────────────────────────────────┐
       │   [ HERO SECTION ]                                     │
       │   • Typewriter Eyebrow (3 taglines)                    │
       │   • Teal-to-Blue Linear Gradients                      │
       │   • Floating 3D Character on Right Col                 │
       └───────────────────────────┬────────────────────────────┘
                                   │  (Scroll Scrub Scrub 1.0)
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │   [ CONTINUOUS HERO -> ABOUT TRANSITION ]              │
       │   • Hero text slides up and fades                      │
       │   • 3D Character glides from Col 2 -> Col 1            │
       │   • Staggered Bio reveal + Frosted Stat Capsules       │
       │   • Bottom Centered Dual CTA Buttons                   │
       └───────────────────────────┬────────────────────────────┘
                                   │  (Curtain Layer Overlap)
                                   ▼
        ┌────────────────────────────────────────────────────────┐
        │   [ ABOUT -> SKILLS DEPTH CURTAIN MASK ]               │
        │   • About Section stays fixed & settled (100vh-220vh)  │
        │   • Skills Section (z-30) slides up over About bottom  │
        │   • Rapier2D Rust/WASM 120 FPS Physics Collision Arena │
        │   • Authentic brand SVGs, dark chips & impulse toss    │
        └────────────────────────────────────────────────────────┘
```

---

## 🎨 Visual & Motion Design System

| Element | Description |
| :--- | :--- |
| **Color Palette** | Monochromatic Obsidian (`#08090C`, `#0E1117`) with vibrant Cyan-to-Blue highlights (`#2DD4BF`, `#38BDF8`, `#60A5FA`). |
| **Smooth Scrolling** | **Lenis** engine calibrated to `1.8s` duration and `0.75` wheel multiplier, piped directly into the GSAP ticker (`lagSmoothing: 0`). |
| **Starfield Particles** | Top-level HTML5 canvas rendering 65 drifting stars with harmonic twinkle oscillations and wrapping bounds (`StarField.tsx`). |
| **Interactive Stat Capsules** | Frosted glass pills for *Experience (1+ yrs)*, *Specialty (Full Stack)*, and *Focus (Performance & UX)* with glow blooms on hover. |
| **Skills Physics Arena** | Zero-lag `@dimforge/rapier2d-compat` Rust/WASM simulation on HTML5 Canvas 2D with authentic SVGs, category tags, and pointer toss physics. |

---

## 📊 Project Completion Roadmap

```
[████████████████████░░░░░░░░░░░░░░░░░░░░] 50% Completed
```

### ✅ Completed Milestones
- [x] **Lenis Smooth Scroll Engine**: Glitch-free smooth scrolling synced with GSAP ScrollTrigger.
- [x] **Atmospheric Background Layers**: Interactive starfield particle canvas and 10–20px mouse-following radial glow parallax.
- [x] **Hero Section**: Dynamic 3-phrase typewriter eyebrow, two-tone typography gradients, and responsive layout.
- [x] **Seamless Hero-to-About Transition**: 100dvh scroll-scrubbed translation of the 3D character from right to left column.
- [x] **About Section**: 50/50 split layout, staggered text reveals, frosted stat capsules, and centered bottom CTAs.
- [x] **3D Depth Curtain Transition**: About stays pinned in place while the Skills section floats up and masks over it.
- [x] **Endless Skills Ribbon**: Dual-track marquee with zero gaps, uniform dimensions, initial motion blur reveal, and metallic hover shine.

### ⏳ Upcoming Sections
- [ ] **Featured Projects Showcase**: 3D interactive tilt cards with live preview links and tech stack badges.
- [ ] **Work Experience Timeline**: Interactive chronological milestones with company highlights.
- [ ] **Interactive Contact Section**: Modern glassmorphic contact form and direct contact shortcuts.
- [ ] **Footer**: Social links, animated back-to-top button, and copyright.

---

## 📂 Project Structure

```
portfolio/
├── STEPS_COMPLETED.md          # AI & Developer fast-context reference
├── public/                     # Static assets (3D character, icons, images)
├── src/
│   ├── app/
│   │   ├── globals.css         # Theme tokens, marquee keyframes, lenis styles
│   │   ├── layout.tsx          # Root layout with SmoothScrollProvider and StarField
│   │   └── page.tsx            # Main page composition
│   └── components/
│       ├── HeroAboutExperience.tsx # Pinned Hero-to-About timeline + sticky curtain
│       ├── SkillsSection.tsx   # Infinite connected skills ribbon with motion blur
│       ├── SmoothScrollProvider.tsx # Lenis + GSAP ticker synchronization
│       ├── StarField.tsx       # Floating ambient starfield particle canvas
│       └── Navbar.tsx          # Fixed glassmorphic navigation header
```

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/usernamezain/Ahzam-Portfolio.git
cd portfolio
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the experience.

### 3. Production Build & Validation
```bash
npx tsc --noEmit    # Validate TypeScript types (0 errors)
npm run build       # Generate optimized production build
```

---

<p align="center">
  Built with ❤️ using Next.js 16, React 19, GSAP &amp; Lenis.
</p>
