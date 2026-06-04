"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We analyze your business bottlenecks, map your operations, and identify where time and money are being lost.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We deploy the systems and infrastructure your business needs — websites, tools, workflows, and integrations.",
  },
  {
    number: "03",
    title: "Automate",
    description:
      "We implement AI agents, chatbots, and operational workflows that eliminate manual work and accelerate output.",
  },
  {
    number: "04",
    title: "Scale",
    description:
      "We continuously optimize, analyze performance, and expand your capabilities as your business grows.",
  },
];

function MagnifiedText({
  children,
  mouseX,
  mouseY,
  className,
  originX = "center",
}: {
  children: React.ReactNode;
  mouseX: any;
  mouseY: any;
  className?: string;
  originX?: "left" | "right" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const elementX = useMotionValue(0);
  const elementY = useMotionValue(0);

  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        elementX.set(rect.left + rect.width / 2);
        elementY.set(rect.top + rect.height / 2);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [elementX, elementY]);

  const distance = useTransform(
    [mouseX, mouseY, elementX, elementY],
    ([mx, my, ex, ey]: number[]) => {
      if (mx === 0 && my === 0) return 1000; // default off-screen
      const dx = mx - ex;
      const dy = my - ey;
      return Math.sqrt(dx * dx + dy * dy);
    }
  );

  // 120px radius is ~3cm on screen. Max scale 1.15.
  const scaleRaw = useTransform(distance, [0, 120], [1.15, 1]);
  const smoothScale = useSpring(scaleRaw, { stiffness: 300, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale, transformOrigin: `${originX} center` }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TimelineStep({
  step,
  index,
  mouseX,
  mouseY,
}: {
  step: Step;
  index: number;
  mouseX: any;
  mouseY: any;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stepRef, { once: true, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={stepRef}
      className={cn(
        "relative grid items-start",
        // Desktop: two-column grid with center gap for the dot
        "md:grid-cols-[1fr_48px_1fr]",
        // Mobile: single row
        "grid-cols-[24px_1fr]",
        "z-10 hover:z-20 transition-z"
      )}
    >
      {/* Left content — visible on even steps (desktop), hidden on odd */}
      <div
        className={cn(
          "hidden md:flex",
          isEven ? "justify-end" : "justify-end"
        )}
      >
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{
              duration: 0.6,
              ease: "easeOut" as const,
              delay: index * 0.2,
            }}
            className="text-right pr-8 pb-16 flex flex-col items-end"
          >
            <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="right">
              <span className="text-mono text-primary text-[13px] font-mono">
                {step.number}
              </span>
            </MagnifiedText>
            
            <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="right" className="mt-2">
              <h3 className="text-headline text-ink">{step.title}</h3>
            </MagnifiedText>
            
            <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="right" className="mt-3">
              <p className="text-body text-ink-muted max-w-[400px]">
                {step.description}
              </p>
            </MagnifiedText>
          </motion.div>
        )}
      </div>

      {/* Center dot — desktop */}
      <div className="hidden md:flex items-start justify-center pt-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut" as const,
            delay: index * 0.2 + 0.1,
          }}
          className="w-3 h-3 rounded-full bg-primary border-2 border-canvas relative z-10"
        />
      </div>

      {/* Right content — visible on odd steps (desktop), hidden on even */}
      <div
        className={cn(
          "hidden md:flex",
          !isEven ? "justify-start" : "justify-start"
        )}
      >
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{
              duration: 0.6,
              ease: "easeOut" as const,
              delay: index * 0.2,
            }}
            className="text-left pl-8 pb-16 flex flex-col items-start"
          >
            <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="left">
              <span className="text-mono text-primary text-[13px] font-mono">
                {step.number}
              </span>
            </MagnifiedText>

            <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="left" className="mt-2">
              <h3 className="text-headline text-ink">{step.title}</h3>
            </MagnifiedText>

            <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="left" className="mt-3">
              <p className="text-body text-ink-muted max-w-[400px]">
                {step.description}
              </p>
            </MagnifiedText>
          </motion.div>
        )}
      </div>

      {/* Mobile dot */}
      <div className="flex md:hidden items-start justify-center pt-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut" as const,
            delay: index * 0.2 + 0.1,
          }}
          className="w-3 h-3 rounded-full bg-primary border-2 border-canvas relative z-10"
        />
      </div>

      {/* Mobile content — always shown on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{
          duration: 0.6,
          ease: "easeOut" as const,
          delay: index * 0.2,
        }}
        className="md:hidden pl-4 pb-12 flex flex-col items-start"
      >
        <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="left">
          <span className="text-mono text-primary text-[13px] font-mono">
            {step.number}
          </span>
        </MagnifiedText>

        <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="left" className="mt-2">
          <h3 className="text-headline text-ink">{step.title}</h3>
        </MagnifiedText>

        <MagnifiedText mouseX={mouseX} mouseY={mouseY} originX="left" className="mt-3">
          <p className="text-body text-ink-muted max-w-[400px]">
            {step.description}
          </p>
        </MagnifiedText>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });

  // Track global mouse position for the magnifier effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="py-[96px]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <p className="text-eyebrow text-primary mb-4 text-center">
            Our Process
          </p>
          <h2 className="text-display-lg text-ink text-center mb-16">
            From Chaos to Clarity
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Desktop timeline line — center */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut" as const,
              delay: 0.2,
            }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-hairline origin-top"
          />

          {/* Mobile timeline line — left side */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut" as const,
              delay: 0.2,
            }}
            className="md:hidden absolute left-[11px] top-0 w-[1px] h-full bg-hairline origin-top"
          />

          {/* Steps */}
          {steps.map((step, index) => (
            <TimelineStep
              key={step.number}
              step={step}
              index={index}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
