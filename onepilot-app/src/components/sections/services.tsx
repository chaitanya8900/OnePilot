"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Hammer, TrendingUp, Zap, Settings, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PillarItem {
  title: string;
  icon: LucideIcon;
  subtitle: string;
  items: string[];
  x: number;
  y: number;
  align: "left" | "right";
}

const pillars: PillarItem[] = [
  {
    title: "BUILD",
    icon: Hammer,
    subtitle: "Create your digital foundation",
    items: ["Websites", "Software", "Design", "Branding", "Digital Products"],
    x: 10,
    y: 75,
    align: "left",
  },
  {
    title: "AUTOMATE",
    icon: Zap,
    subtitle: "Eliminate repetitive work",
    items: ["AI Agents", "WhatsApp Automation", "AI Chatbots", "Workflow Automation"],
    x: 38,
    y: 28,
    align: "left",
  },
  {
    title: "OPERATE",
    icon: Settings,
    subtitle: "Run your business seamlessly",
    items: ["Customer Support", "BPO Services", "Data Analytics", "Business Operations"],
    x: 65,
    y: 65,
    align: "left", // or right depending on overlap
  },
  {
    title: "GROW",
    icon: TrendingUp,
    subtitle: "Accelerate your market presence",
    items: ["Marketing", "Lead Generation", "Advertising", "Content"],
    x: 90,
    y: 15,
    align: "right",
  },
];

function InteractivePill({ pillar }: { pillar: PillarItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute z-20 flex items-center"
      style={{
        left: `${pillar.x}%`,
        top: `${pillar.y}%`,
        transform: `translate(${pillar.align === "left" ? "-24px" : "calc(-100% + 24px)"}, -50%)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        className={cn(
          "relative flex flex-col justify-center bg-surface-1 border shadow-xl overflow-hidden backdrop-blur-xl",
          isHovered
            ? "w-[420px] h-auto p-8 rounded-[24px] border-primary/40 shadow-[0_16px_40px_rgba(0,0,0,0.5)] z-30"
            : "w-auto h-[60px] px-8 rounded-full border-hairline hover:border-hairline-strong cursor-pointer z-20"
        )}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.div layout className="flex items-center gap-4">
          <div
            className={cn(
              "relative flex items-center justify-center shrink-0 rounded-full transition-colors",
              isHovered ? "bg-primary/10 w-14 h-14" : "bg-transparent w-auto h-auto"
            )}
          >
            <pillar.icon className="text-primary z-10 relative" size={isHovered ? 30 : 28} />
            {!isHovered && (
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary/20 animate-ping" />
            )}
          </div>
          <motion.span layout className="font-semibold tracking-tight text-[18px] text-ink z-10 relative">
            {pillar.title}
          </motion.span>
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <p className="text-body-sm text-ink-muted mb-4 leading-relaxed">
                {pillar.subtitle}
              </p>
              <ul className="flex flex-col gap-2.5">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                    <span className="text-[13px] text-ink-subtle">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  // Reduced margin to ensure it triggers on mobile viewports
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  return (
    <section ref={sectionRef} className="py-[96px] md:py-[160px] bg-canvas overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="mb-16 md:mb-24"
        >
          <p className="text-eyebrow text-primary mb-4">What We Do</p>
          <h2 className="text-display-lg text-ink mb-4">
            Four Pillars of Growth
          </h2>
          <p className="text-body-lg text-ink-muted max-w-[500px]">
            Everything your business needs to build, grow, automate, and operate.
          </p>
        </motion.div>

        {/* Desktop Interactive Graph Layout */}
        <div className="hidden md:block relative w-full h-[500px]">
          {/* SVG Arrow Line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            {/* Glow / blur line behind */}
            <motion.path
              d="M 100 375 L 380 140 L 650 325 L 950 25"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="6"
              filter="blur(10px)"
              strokeOpacity="0.35"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
            {/* Solid sharp line */}
            <motion.path
              d="M 100 375 L 380 140 L 650 325 L 950 25"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
            {/* Arrowhead */}
            <motion.path
              d="M 920 25 L 950 25 L 950 55"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </svg>

          {/* Interactive Pills */}
          {isInView && pillars.map((pillar) => (
            <InteractivePill key={pillar.title} pillar={pillar} />
          ))}
        </div>

        {/* Mobile Fallback: Standard Cards */}
        <div className="flex md:hidden flex-col gap-6">
          {isInView &&
            pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-surface-1 border border-hairline rounded-[16px] p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <Icon className="text-primary" size={20} />
                    </div>
                    <h3 className="font-semibold text-ink tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-body-sm text-ink-muted mb-6">
                    {pillar.subtitle}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        <span className="text-[14px] text-ink-subtle">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
