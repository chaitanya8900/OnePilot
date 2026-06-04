"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  TrendingUp,
  Globe,
  Brain,
  Zap,
  Headphones,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-provider";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROTATING_WORDS = ["Business", "Startup", "Company"] as const;
const WORD_CYCLE_MS = 2600;

const ecosystemNodes = [
  {
    label: "Marketing",
    icon: Megaphone,
    description: "Full-funnel campaigns that drive qualified leads.",
  },
  {
    label: "Sales",
    icon: TrendingUp,
    description: "Pipeline acceleration & conversion optimization.",
  },
  {
    label: "Websites",
    icon: Globe,
    description: "High-performance sites built for growth.",
  },
  {
    label: "AI",
    icon: Brain,
    description: "Intelligent automation & predictive insights.",
  },
  {
    label: "Automation",
    icon: Zap,
    description: "Workflows that eliminate manual busywork.",
  },
  {
    label: "Customer Support",
    icon: Headphones,
    description: "24/7 support systems your customers love.",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    description: "Real-time dashboards & actionable data.",
  },
  {
    label: "Operations",
    icon: Settings,
    description: "Streamlined ops that scale with you.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Hook: useRotatingWord                                              */
/* ------------------------------------------------------------------ */

function useRotatingWord(words: readonly string[], intervalMs: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [words.length, intervalMs]);
  return { word: words[index], index };
}

/* ------------------------------------------------------------------ */
/*  Hook: useTypewriter                                                */
/* ------------------------------------------------------------------ */

function useTypewriter(words: readonly string[], typingSpeed = 100, deletingSpeed = 60, pauseMs = 1400) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tick = useCallback(() => {
    const currentWord = words[wordIdx];

    if (!isDeleting) {
      // Typing
      if (display.length < currentWord.length) {
        setDisplay(currentWord.slice(0, display.length + 1));
        timeoutRef.current = setTimeout(tick, typingSpeed);
      } else {
        // Pause at full word
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          tick();
        }, pauseMs);
        return;
      }
    } else {
      // Deleting
      if (display.length > 0) {
        setDisplay(currentWord.slice(0, display.length - 1));
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % words.length);
        timeoutRef.current = setTimeout(tick, typingSpeed);
        return;
      }
    }
  }, [display, wordIdx, isDeleting, words, typingSpeed, deletingSpeed, pauseMs]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick, typingSpeed]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getNodePosition(
  index: number,
  total: number,
  radius: number,
  cx: number,
  cy: number
) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

/* ------------------------------------------------------------------ */
/*  Light Pulse Component                                              */
/* ------------------------------------------------------------------ */

function LightPulse({
  fromX,
  fromY,
  toX,
  toY,
  delay,
  duration,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  delay: number;
  duration: number;
}) {
  return (
    <motion.circle
      r={3}
      fill="#5e6ad2"
      opacity={0}
      filter="url(#glow)"
      animate={{
        cx: [fromX, toX],
        cy: [fromY, toY],
        opacity: [0, 0.9, 0.9, 0],
        r: [2, 3.5, 3, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 0.1 + Math.random() * 0.5,
        ease: "easeInOut" as const,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop SVG Ecosystem                                              */
/* ------------------------------------------------------------------ */

function EcosystemSVG() {
  const [hovered, setHovered] = useState<number | null>(null);
  const typewriterText = useTypewriter(ROTATING_WORDS, 110, 70, 1600);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Theme-aware SVG color palette
  const c = {
    surface: isLight ? "#ffffff" : "#0f1011",
    hairline: isLight ? "#d4d4d8" : "#23252a",
    hairlineStrong: isLight ? "#a1a1aa" : "#34343a",
    ink: isLight ? "#111113" : "#f7f8f8",
    inkMuted: isLight ? "#3a3a42" : "#d0d6e0",
    inkSubtle: isLight ? "#6b6b76" : "#8a8f98",
    primary: isLight ? "#4f5bc4" : "#5e6ad2",
    tooltipBg: isLight ? "#ffffff" : "#141516",
    tooltipBorder: isLight ? "#d4d4d8" : "#34343a",
  };

  const svgSize = 560;
  const center = svgSize / 2;
  const orbitRadius = 200;
  const nodeRadius = 32;
  const centerRadius = 60;

  return (
    <svg
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      className="w-full h-full"
      fill="none"
    >
      {/* Glow filter for light pulses */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c.primary} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Center ambient glow */}
      <circle cx={center} cy={center} r={90} fill="url(#centerGlow)" />

      {/* ---------- connecting lines ---------- */}
      {ecosystemNodes.map((node, i) => {
        const { x, y } = getNodePosition(
          i,
          ecosystemNodes.length,
          orbitRadius,
          center,
          center
        );
        const isActive = hovered === i;
        return (
          <line
            key={`line-${node.label}`}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke={isActive ? c.primary : c.hairline}
            strokeWidth={isActive ? 1 : 0.5}
            opacity={isActive ? 1 : 0.5}
            className="transition-all duration-300"
          />
        );
      })}

      {/* ---------- Light pulses shooting along lines ---------- */}
      {ecosystemNodes.map((_, i) => {
        const { x, y } = getNodePosition(
          i,
          ecosystemNodes.length,
          orbitRadius,
          center,
          center
        );
        return (
          <LightPulse
            key={`pulse-${i}`}
            fromX={x}
            fromY={y}
            toX={center}
            toY={center}
            delay={i * 0.4}
            duration={1.4}
          />
        );
      })}

      {/* ---------- orbit ring ---------- */}
      <circle
        cx={center}
        cy={center}
        r={orbitRadius}
        stroke={c.hairline}
        strokeWidth={0.5}
        strokeDasharray="4 6"
        opacity={0.3}
      />

      {/* ---------- center circle ---------- */}
      <circle
        cx={center}
        cy={center}
        r={centerRadius}
        fill={c.surface}
        stroke={c.primary}
        strokeWidth={1.5}
      />

      {/* Center text — "Your" */}
      <text
        x={center}
        y={center - 8}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={c.ink}
        fontSize={12}
        fontWeight={600}
        fontFamily="Inter, sans-serif"
      >
        Your
      </text>

      {/* Center text — typewriter word */}
      <text
        x={center}
        y={center + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={c.ink}
        fontSize={12}
        fontWeight={600}
        fontFamily="Inter, sans-serif"
      >
        {typewriterText}
        <tspan fill={c.primary} opacity={0.8}>|</tspan>
      </text>

      {/* ---------- orbiting nodes ---------- */}
      {ecosystemNodes.map((node, i) => {
        const { x, y } = getNodePosition(
          i,
          ecosystemNodes.length,
          orbitRadius,
          center,
          center
        );
        const isActive = hovered === i;
        const Icon = node.icon;

        return (
          <g
            key={node.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
            style={{
              transform: isActive ? `scale(1.1)` : `scale(1)`,
              transformOrigin: `${x}px ${y}px`,
              transition: "transform 0.3s ease",
            }}
          >
            {/* node circle */}
            <circle
              cx={x}
              cy={y}
              r={nodeRadius}
              fill={c.surface}
              stroke={isActive ? c.primary : c.hairline}
              strokeWidth={isActive ? 1.5 : 1}
              className="transition-all duration-300"
            />

            {/* icon */}
            <foreignObject
              x={x - 8}
              y={y - 8}
              width={16}
              height={16}
              style={{ overflow: "visible" }}
            >
              <Icon
                size={16}
                className={cn(
                  "transition-colors duration-300",
                  isActive ? "text-primary" : "text-ink-subtle"
                )}
              />
            </foreignObject>

            {/* label */}
            <text
              x={x}
              y={y + nodeRadius + 16}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isActive ? c.ink : c.inkSubtle}
              fontSize={11}
              fontWeight={500}
              fontFamily="Inter, sans-serif"
              className="transition-all duration-300"
            >
              {node.label}
            </text>


          </g>
        );
      })}

      {/* Render tooltips LAST so they are completely on top of all nodes and lines */}
      {ecosystemNodes.map((node, i) => {
        const { x, y } = getNodePosition(
          i,
          ecosystemNodes.length,
          orbitRadius,
          center,
          center
        );
        const isActive = hovered === i;
        if (!isActive) return null;

        const tooltipW = 200;
        const tooltipH = 54;
        const isTopHalf = y < center;
        const tipY = isTopHalf
          ? y + nodeRadius + 12
          : y - nodeRadius - tooltipH - 12;
        const tipX = Math.max(8, Math.min(x - tooltipW / 2, svgSize - tooltipW - 8));

        return (
          <foreignObject
            key={`tooltip-${node.label}`}
            x={tipX}
            y={tipY}
            width={tooltipW}
            height={tooltipH}
            style={{ pointerEvents: "none", overflow: "visible" }}
          >
            <div
              style={{
                background: c.tooltipBg,
                border: `1px solid ${c.tooltipBorder}`,
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 12,
                lineHeight: 1.4,
                color: c.ink,
                fontWeight: 500,
                fontFamily: "Inter, sans-serif",
                textAlign: "center",
                whiteSpace: "normal",
                wordWrap: "break-word",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
              }}
            >
              {node.description}
            </div>
          </foreignObject>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Grid Ecosystem                                              */
/* ------------------------------------------------------------------ */

function EcosystemGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 w-full max-w-[360px]">
      {ecosystemNodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            className="flex flex-col items-center gap-2"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-14 h-14 rounded-full bg-surface-1 border border-hairline flex items-center justify-center">
              <Icon size={18} className="text-ink-subtle" />
            </div>
            <span className="text-[10px] font-medium text-ink-subtle text-center leading-tight">
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Rotating Word (headline)                                           */
/* ------------------------------------------------------------------ */

function RotatingWord() {
  const { word, index } = useRotatingWord(ROTATING_WORDS, WORD_CYCLE_MS);

  return (
    <span className="inline-flex overflow-hidden h-[1.1em] align-bottom relative">
      {/* Invisible placeholder for longest word to preserve layout width */}
      <span className="invisible pointer-events-none" aria-hidden="true">
        Company
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`${word}-${index}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut" as const,
          }}
          className="absolute left-0 inline-block text-primary"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-56px)] flex flex-col justify-center bg-canvas overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-6 pt-[20px] md:pt-[40px] pb-20">
        {/* Two-column layout: text left, ecosystem right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center">

          {/* ---------- Left Column: Text Content ---------- */}
          <div className="flex flex-col items-start text-left gap-6 lg:flex-1 lg:max-w-[600px]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-surface-1 border border-hairline rounded-full px-3 py-1.5"
            >
              <span className="text-[12px] font-medium tracking-wide uppercase text-ink-subtle">
                Your Growth Infrastructure Partner
              </span>
            </motion.div>

            {/* Headline — two lines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
                Everything Your <RotatingWord /> Needs.
              </h1>
              <p className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.08] tracking-[-0.03em] text-ink-subtle mt-2">
                One Partner.
              </p>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[15px] md:text-[16px] leading-[1.6] text-ink-muted max-w-[520px]"
            >
              Technology, Marketing, Automations, AI and Operations — OnePilot
              replaces multiple vendors by handling all of them under one roof.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3 items-start"
            >
              <a href="/contact" className="inline-flex justify-center items-center bg-primary text-white px-6 py-3 rounded-[8px] text-[14px] font-medium hover:bg-primary-hover transition-colors cursor-pointer">
                Book a Strategy Call
              </a>
              <p className="text-[12px] leading-[1.4] text-ink-tertiary">
                No commitment required · Free strategy session
              </p>
            </motion.div>
          </div>

          {/* ---------- Right Column: Ecosystem Visual ---------- */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full lg:flex-1 lg:max-w-[560px]"
          >
            {/* Desktop SVG */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
              className="hidden md:block aspect-square"
            >
              <EcosystemSVG />
            </motion.div>

            {/* Mobile grid fallback */}
            <div className="block md:hidden py-6">
              <EcosystemGrid />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />
    </section>
  );
}
