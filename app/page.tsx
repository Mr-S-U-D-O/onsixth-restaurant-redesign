"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";

import type { Variants } from "framer-motion";

// ─── Animation Variants ──────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: custom * 0.1,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── Hero Section ───────────────────────────────────────────────
function Hero() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      aria-label="Welcome to On Sixth Restaurant"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "var(--bg-primary)",
        paddingTop: "var(--space-32)",
        paddingBottom: "var(--space-12)",
        overflow: "hidden"
      }}
      className="container"
    >
      {/* Top Layer: Est 2015 & Subtext */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "var(--space-8)" }}
      >
        <motion.div variants={fadeUp} custom={1} style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <div style={{ width: "40px", height: "1px", background: "var(--obsidian)" }} />
          <span style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-widest)", fontWeight: 600, color: "var(--obsidian)" }}>
            Est. 2015
          </span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-body"
          style={{
            fontSize: "var(--text-base)",
            maxWidth: "320px",
            color: "var(--slate-mid)",
            lineHeight: "var(--leading-relaxed)",
            textAlign: "right"
          }}
        >
          Award-winning upmarket dining featuring artisanal sushi, an open-plan wood-fired kitchen, and a devotion to structural flavor.
        </motion.p>
      </motion.div>

      {/* Center: Massive Typography with Inline Image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{ width: "100%", marginTop: "auto", marginBottom: "auto", paddingTop: "var(--space-16)" }}
      >
        <motion.h1
          variants={fadeUp}
          custom={3}
          className="text-heading-hero"
          style={{
            color: "var(--obsidian)",
            fontSize: "clamp(2.5rem, 12vw, 8rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            maxWidth: "100%",
            margin: 0
          }}
        >
          Where Craft
          <span 
            className="hero-video-bubble"
            style={{ 
              display: "inline-block", 
              width: "clamp(80px, 15vw, 160px)", 
              height: "clamp(40px, 7vw, 80px)", 
              borderRadius: "999px",
              overflow: "hidden",
              margin: "0 16px",
              verticalAlign: "middle",
              border: "1px solid var(--border)",
              position: "relative"
            }} 
          >
            <video 
              src="/Chefs_working_in_restaurant_kitchen_202608170023.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
            />
          </span>
          <br />Meets <span className="text-highlight">Heritage.</span>
        </motion.h1>
      </motion.div>

      {/* Bottom Right: CTAs */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="hero-ctas"
        style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-4)", marginTop: "var(--space-12)" }}
      >
        <MagneticButton>
          <Link href="/menu" className="btn btn-primary btn-lg">
            Explore Menu
          </Link>
        </MagneticButton>
        <MagneticButton>
          <Link href="/reservations" className="btn btn-secondary btn-lg">
            Reserve a Table
          </Link>
        </MagneticButton>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .text-body {
            text-align: left !important;
          }
        }
        @media (max-width: 768px) {
          .hero-video-bubble {
            margin: 0 8px !important;
          }
          .hero-ctas {
            justify-content: flex-start !important;
            flex-wrap: wrap;
          }
        }
        @media (max-width: 480px) {
          .hero-video-bubble {
            width: 70px !important;
            height: 35px !important;
            margin: 0 6px !important;
          }
          .hero-ctas {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-ctas > * {
            width: 100%;
          }
          .hero-ctas a {
            width: 100%;
            justify-content: center;
          }
        }
      `}} />
    </section>
  );
}

// ─── Infinite Trust Marquee ──────────────────────────────────────
const AWARDS = [
  "Best Upmarket Restaurant",
  "Best Romantic Restaurant",
  "Best Neighbourhood",
  "4.8 / 5 Stars",
  "Best of Ekurhuleni",
  "Over 1,200+ Reviews"
];

function AwardsStrip() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const directionFactor = useRef<number>(1);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t: number, delta: number) => {
    let moveBy = directionFactor.current * -1 * (delta / 1000) * 10;
    
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    let currentX = baseX.get() + moveBy;
    // Wrap between 0 and -50% for the duplicate array
    if (currentX <= -50) currentX = 0;
    if (currentX > 0) currentX = -50;
    
    baseX.set(currentX);
    if (marqueeRef.current) {
      marqueeRef.current.style.transform = `translateX(${currentX}%)`;
    }
  });

  return (
    <section
      aria-label="Awards and accolades"
      style={{ 
        background: "var(--obsidian)", 
        color: "var(--cream)", 
        padding: "var(--space-6) 0",
        overflow: "hidden",
        borderTop: "1px solid var(--slate-deep)",
        borderBottom: "1px solid var(--slate-deep)"
      }}
    >
      <div className="marquee-container" style={{ display: "flex", width: "100%", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div 
          ref={marqueeRef}
          style={{ display: "flex", gap: "var(--space-12)", minWidth: "200%", willChange: "transform" }}
        >
          {/* Duplicate array for seamless looping */}
          {[...AWARDS, ...AWARDS].map((award, i) => (
            <div 
              key={i} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "var(--space-12)",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-sm)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                fontWeight: 600
              }}
            >
              <span>{award}</span>
              <span aria-hidden="true" style={{ color: "var(--teal)", fontSize: "1.2rem" }}>•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Culinary Z-Axis Cascade ────────────────────────────────────
function CulinaryCascade() {
  return (
    <section
      aria-label="Our signature dishes"
      className="section-pad"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="container">
        <motion.div
          className="section-header"
          style={{ marginBottom: "var(--space-16)", maxWidth: "600px" }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-subheading eyebrow">The Art of Taste</span>
          <h2
            className="text-heading-section"
            style={{ color: "var(--obsidian)" }}
          >
            Pillars of Our Kitchen
          </h2>
        </motion.div>

        <div style={{ display: "grid", gap: "var(--space-20)" }}>
          {/* Item 1: Sushi (Image Left, Text Right) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-10)",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                width: "100%",
              }}
            >
              <Image
                src="/premium_sushi.jpg"
                alt="Premium Norwegian salmon sashimi"
                fill
                style={{ objectFit: "cover" }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span
                className="text-subheading"
                style={{
                  color: "var(--teal)",
                  marginBottom: "var(--space-2)",
                  display: "block",
                }}
              >
                01
              </span>
              <h3
                className="text-heading-card"
                style={{
                  color: "var(--obsidian)",
                  marginBottom: "var(--space-4)",
                  fontSize: "var(--text-4xl)",
                }}
              >
                Sushi & Sashimi
              </h3>
              <p
                className="text-body"
                style={{ marginBottom: "var(--space-6)", maxWidth: "400px" }}
              >
                Premium-grade Norwegian salmon, tuna & yellowtail. Sliced fresh
                in our open kitchen — no shortcuts, ever. Clean, precise, and
                visually arresting.
              </p>
              <Link href="/menu#sushi" className="btn btn-secondary">
                Explore Sushi
              </Link>
            </motion.div>
          </div>

          {/* Item 2: Pizza (Text Left, Image Right) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-10)",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="pizza-text"
            >
              <span
                className="text-subheading"
                style={{
                  color: "var(--teal)",
                  marginBottom: "var(--space-2)",
                  display: "block",
                }}
              >
                02
              </span>
              <h3
                className="text-heading-card"
                style={{
                  color: "var(--obsidian)",
                  marginBottom: "var(--space-4)",
                  fontSize: "var(--text-4xl)",
                }}
              >
                Oblong Pizzaladière
              </h3>
              <p
                className="text-body"
                style={{ marginBottom: "var(--space-6)", maxWidth: "400px" }}
              >
                Our signature wood-fired thin crust. Stretched long, fired hot,
                dressed with intention. A modern take on structural flavor
                pairing.
              </p>
              <Link href="/menu#pizza" className="btn btn-secondary">
                Explore Pizza
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                width: "100%",
              }}
              className="pizza-image"
            >
              <Image
                src="/premium_pizza.jpg"
                alt="Wood-fired oblong pizzaladiere"
                fill
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .pizza-text {
            order: 1 !important;
          }
          .pizza-image {
            order: 2 !important;
          }
        }
      `}} />
    </section>
  );
}

// ─── Open Kitchen Theatre (Bento Grid) ───────────────────────
function OpenKitchenTheatre() {
  return (
    <section
      aria-label="Our open kitchen"
      style={{
        paddingBlock: "var(--space-24)",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <div
          className="grid-cols-responsive kitchen-grid"
          style={{
            gap: "var(--space-12)",
            alignItems: "center",
          }}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ paddingRight: "var(--space-8)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
              <div style={{ width: "32px", height: "1px", background: "var(--slate-mid)" }} />
              <span
                style={{
                  color: "var(--slate-mid)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-widest)",
                  fontWeight: 600
                }}
              >
                Culinary Theatre
              </span>
            </div>
            
            <h2
              className="text-heading-section"
              style={{ color: "var(--obsidian)", marginBottom: "var(--space-6)", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Prepared in<br/>Full View.
            </h2>
            <p
              className="text-body"
              style={{
                color: "var(--slate-mid)",
                marginBottom: "var(--space-10)",
                fontSize: "var(--text-lg)",
                lineHeight: "var(--leading-relaxed)",
                maxWidth: "480px"
              }}
            >
              Our open-plan kitchen is the beating heart of On Sixth. Watch as our
              chefs slice fresh salmon, stretch oblong pizza dough, and
              flame-grill skewers — all within arm&apos;s reach. No hidden
              kitchens, no mystery.
            </p>
            <Link href="/experience" className="btn btn-primary" style={{ borderRadius: "4px" }}>
              Discover Our Story
            </Link>
          </motion.div>

          {/* Sharp Image Bento */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3/4",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
              background: "var(--bg-primary)"
            }}
          >
            <Image
              src="/hero_fire_kitchen.jpg"
              alt="Open kitchen roaring fire"
              fill
              style={{ objectFit: "cover", filter: "contrast(115%) saturate(110%)" }}
            />
          </motion.div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}

// ─── Page Assembly ──────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <AwardsStrip />
      <CulinaryCascade />
      <OpenKitchenTheatre />
      <ReviewsCarousel />
    </>
  );
}
