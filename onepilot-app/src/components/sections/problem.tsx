"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Globe,
  Megaphone,
  Zap,
  Headphones,
  Palette,
  BarChart3,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

const vendors = [
  { title: "Website Agency", icon: Globe, rotation: -3, offsetX: -20, offsetY: -15 },
  { title: "Marketing Agency", icon: Megaphone, rotation: 2.5, offsetX: 15, offsetY: -10 },
  { title: "Automation Expert", icon: Zap, rotation: -1.5, offsetX: -10, offsetY: 12 },
  { title: "Support Team", icon: Headphones, rotation: 3, offsetX: 18, offsetY: -8 },
  { title: "Design Team", icon: Palette, rotation: -2, offsetX: -14, offsetY: 10 },
  { title: "Data Analyst", icon: BarChart3, rotation: 1.5, offsetX: 12, offsetY: -14 },
  { title: "AI Consultant", icon: Brain, rotation: -2.5, offsetX: -8, offsetY: 16 },
];

type AnimationPhase = "hidden" | "scattered" | "converging" | "resolved";

// Timing constants (ms)
const SCATTER_APPEAR_DURATION = 800;    // Time for cards to appear
const CARDS_VISIBLE_DURATION = 1600;     // Time cards stay fully visible (readable)
const CONVERGE_DURATION = 900;           // Time for converge animation
const RESOLVED_DISPLAY_DURATION = 2500;  // Time "One Partner" stays visible (same as cards)
const FADE_OUT_DURATION = 600;           // Time for resolved card to fade

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [phase, setPhase] = useState<AnimationPhase>("hidden");
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  }, []);

  // Run the animation loop whenever in view
  useEffect(() => {
    if (!isInView) {
      clearAllTimers();
      setPhase("hidden");
      return;
    }

    function runCycle() {
      clearAllTimers();

      // Phase 1: Cards appear scattered
      setPhase("scattered");

      // Phase 2: After cards are visible long enough, converge
      addTimer(() => {
        setPhase("converging");
      }, SCATTER_APPEAR_DURATION + CARDS_VISIBLE_DURATION);

      // Phase 3: Show resolved card
      addTimer(() => {
        setPhase("resolved");
      }, SCATTER_APPEAR_DURATION + CARDS_VISIBLE_DURATION + CONVERGE_DURATION);

      // Phase 4: Restart the cycle
      addTimer(() => {
        setPhase("hidden");
        // Small gap before restarting
        addTimer(() => {
          runCycle();
        }, FADE_OUT_DURATION);
      }, SCATTER_APPEAR_DURATION + CARDS_VISIBLE_DURATION + CONVERGE_DURATION + RESOLVED_DISPLAY_DURATION);
    }

    runCycle();

    return () => clearAllTimers();
  }, [isInView, clearAllTimers, addTimer]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas py-[96px] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-eyebrow text-primary mb-4 text-center"
        >
          The Problem
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
          className="text-display-lg text-ink text-center mb-16"
        >
          Businesses Need Too Many Vendors.
        </motion.h2>

        {/* Cards Area */}
        <div className="relative min-h-[400px] md:min-h-[480px] flex items-center justify-center">
          {/* Scattered / Converging Cards */}
          <AnimatePresence mode="wait">
            {(phase === "scattered" || phase === "converging") && (
              <motion.div
                key="vendor-grid"
                className={cn(
                  "grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-5",
                  "justify-center items-center w-full max-w-[900px]"
                )}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                {vendors.map((vendor, index) => {
                  const Icon = vendor.icon;
                  const staggerDelay = index * 0.08;

                  return (
                    <motion.div
                      key={vendor.title}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        rotate: vendor.rotation * 2,
                        x: vendor.offsetX * 3,
                        y: vendor.offsetY * 3,
                        filter: "blur(8px)",
                      }}
                      animate={
                        phase === "scattered"
                          ? {
                            opacity: 1,
                            scale: 1,
                            rotate: vendor.rotation,
                            x: vendor.offsetX,
                            y: vendor.offsetY,
                            filter: "blur(0px)",
                          }
                          : phase === "converging"
                            ? {
                              opacity: 0,
                              scale: 0.6,
                              rotate: 0,
                              x: 0,
                              y: 0,
                              filter: "blur(12px)",
                            }
                            : {}
                      }
                      transition={
                        phase === "scattered"
                          ? {
                            duration: 0.6,
                            delay: staggerDelay,
                            ease: "easeOut" as const,
                          }
                          : phase === "converging"
                            ? {
                              duration: 0.7,
                              delay: index * 0.04,
                              ease: "easeInOut" as const,
                            }
                            : {}
                      }
                      className={cn(
                        "bg-surface-1 border border-hairline rounded-[12px] p-6",
                        "flex flex-col items-start",
                        "md:w-[180px] md:shrink-0",
                        index === 6 && "col-span-2 justify-self-center md:col-span-1"
                      )}
                    >
                      <Icon
                        size={24}
                        className="text-ink-subtle mb-3"
                        strokeWidth={1.5}
                      />
                      <span className="text-card-title text-ink">
                        {vendor.title}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resolved "One Partner" Card */}
          <AnimatePresence>
            {phase === "resolved" && (
              <motion.div
                key="one-partner"
                initial={{ opacity: 0, scale: 0.7, filter: "blur(16px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut" as const,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className={cn(
                    "bg-surface-1 border border-primary/50 rounded-[12px]",
                    "px-12 py-10 text-center",
                    "shadow-[0_0_60px_-12px_rgba(94,106,210,0.3)]",
                    "relative"
                  )}
                >
                  {/* Subtle glow behind */}
                  <div
                    className="absolute inset-0 rounded-[12px] opacity-20"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(94,106,210,0.4) 0%, transparent 70%)",
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-display-md text-ink relative z-10"
                  >
                    One Partner.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
