"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface CaseStudy {
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  metricValue: string;
  metricNumber: number;
  metricSuffix: string;
  metricLabel: string;
}

const caseStudies: CaseStudy[] = [
  {
    industry: "D2C E-Commerce",
    challenge:
      "A growing D2C brand was losing leads across disconnected tools — separate website, email platform, CRM, and ad accounts with no unified strategy.",
    solution:
      "We unified their entire digital presence — rebuilt their website, connected marketing automation, deployed AI chatbots, and created a single customer journey.",
    outcome:
      "Lead conversion increased by 3× within 90 days with 40% lower acquisition cost.",
    metricValue: "3×",
    metricNumber: 3,
    metricSuffix: "×",
    metricLabel: "Lead Conversion",
  },
  {
    industry: "SaaS Platform",
    challenge:
      "A scaling SaaS company was drowning in manual customer support tickets, with average response times over 12 hours and growing churn.",
    solution:
      "We deployed AI-powered support agents, built a knowledge base, and automated ticket routing and escalation workflows.",
    outcome:
      "Average response time dropped from 12 hours to under 2 minutes. Customer satisfaction scores improved by 45%.",
    metricValue: "70%",
    metricNumber: 70,
    metricSuffix: "%",
    metricLabel: "Faster Response",
  },
  {
    industry: "Retail Chain",
    challenge:
      "A multi-location retail chain was spending heavily on fragmented marketing across agencies, with no unified data or attribution model.",
    solution:
      "We consolidated all marketing under one strategy, implemented unified analytics, and deployed targeted AI-driven campaigns across channels.",
    outcome:
      "Customer acquisition cost decreased by 50% while revenue per location grew by 35%.",
    metricValue: "50%",
    metricNumber: 50,
    metricSuffix: "%",
    metricLabel: "Cost Reduction",
  },
];

const contentBlocks: { key: "challenge" | "solution" | "outcome"; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "outcome", label: "Outcome" },
];

function AnimatedNumber({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      if (current !== start) {
        start = current;
        setDisplayValue(current);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

function CaseStudyCard({
  study,
  index,
  progress,
  total,
}: {
  study: CaseStudy;
  index: number;
  progress: any;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const cardsAfter = total - 1 - index; 
  const targetScale = 1 - cardsAfter * 0.1; 
  const startShrinking = index / total;
  
  const scale = useTransform(progress, [startShrinking, 1], [1, targetScale]);
  const brightnessValue = useTransform(progress, [startShrinking, 1], [1, 1 - cardsAfter * 0.4]);
  const filter = useMotionTemplate`brightness(${brightnessValue})`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        ease: "easeOut" as const,
        delay: index * 0.1,
      }}
      className={cn(
        "group w-full bg-surface-1 border border-hairline rounded-[16px]",
        "p-6 md:p-10",
        "flex flex-col-reverse md:flex-row",
        "shadow-xl",
        "sticky"
      )}
      style={{
        top: `calc(120px + ${index * 40}px)`,
        zIndex: index + 10,
        scale,
        filter,
        transformOrigin: "top center",
      }}
    >
      {/* Left side — Text content (60%) */}
      <div className="flex-1 md:w-[60%] md:pr-10">
        {/* Industry badge */}
        <span className="inline-block bg-surface-2 text-ink-muted text-[12px] rounded-full px-3 py-1 mb-6 border border-hairline">
          {study.industry}
        </span>

        {/* Content blocks */}
        <div className="flex flex-col gap-6">
          {contentBlocks.map((block, blockIndex) => (
            <div
              key={block.key}
              className={cn(
                blockIndex > 0 && "border-t border-hairline pt-6"
              )}
            >
              <p className="text-eyebrow text-ink-tertiary mb-2">
                {block.label}
              </p>
              <p className="text-body text-ink-muted">{study[block.key]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side — Metric display (40%) */}
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "mb-8 md:mb-0 md:w-[40%]",
          "md:border-l md:border-hairline md:pl-10"
        )}
      >
        <div className="text-center">
          <p
            className={cn(
              "font-display font-semibold text-primary",
              "text-[56px] md:text-[80px] leading-none tracking-[-3px]"
            )}
          >
            <AnimatedNumber
              value={study.metricNumber}
              suffix={study.metricSuffix}
              isInView={isInView}
            />
          </p>
          <p className="text-body-sm text-ink-subtle mt-2">
            {study.metricLabel}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={sectionRef} className="py-[96px] md:py-[144px] relative">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <p className="text-eyebrow text-primary mb-4 text-center">
            Impact Stories
          </p>
          <h2 className="text-display-lg text-ink text-center mb-16 md:mb-24">
            Real Businesses. Real Growth.
          </h2>
        </motion.div>

        {/* Case study cards — sticky stacked */}
        <div className="flex flex-col gap-12 md:gap-[100px] relative pb-[80px]">
          {caseStudies.map((study, index) => (
            <CaseStudyCard 
              key={study.industry} 
              study={study} 
              index={index} 
              progress={scrollYProgress}
              total={caseStudies.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
