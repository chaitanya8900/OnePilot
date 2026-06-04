"use client";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/sections/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

function TypewriterText({ text, delay = 600 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Initial delay before starting
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, 35); // typing speed

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className="inline-block relative">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] align-middle"
      />
    </span>
  );
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-56px)] bg-canvas pt-16 pb-24 md:pt-24 md:pb-32 relative overflow-hidden flex flex-col justify-center">

        {/* Background ambient glow - Left */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 blur-[150px] rounded-full pointer-events-none z-0" />

        {/* Background ambient glow - Right */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0" />

        {/* Dot Grid Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.10] md:opacity-[0.20]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, var(--color-ink) 1.5px, transparent 0)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 100%)",
          }}
        />

        <motion.div
          className="relative z-10 w-full max-w-[1280px] mx-auto px-6 text-left"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <motion.div
            className="flex items-center justify-start gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="h-[1px] w-6 bg-primary/40" />
            <span className="text-[11px] font-semibold text-primary tracking-[0.2em] uppercase">Pricing</span>
            <div className="h-[1px] w-6 bg-primary/40" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-[36px] md:text-[52px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Pricing Shouldn't<br className="md:hidden" /> Decide The Solution.
          </motion.h1>

          {/* Body Text */}
          <motion.div
            className="text-[16px] md:text-[17px] leading-[1.7] text-ink-muted flex flex-col gap-6 max-w-[640px] mb-14 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <p>
              Every business has unique goals, challenges, and requirements. Instead of forcing businesses into predefined packages, we create tailored solutions based on what your business actually needs.
            </p>

            <div className="w-[200%] relative text-left my-6 md:my-10 h-[36px] sm:h-[48px] md:h-[60px]">
              <p className="font-semibold text-[24px] sm:text-[32px] md:text-[42px] lg:text-[38px] tracking-[-0.02em] text-ink whitespace-nowrap">
                <TypewriterText text="Explore our services, identify what you need, and book a strategy call." delay={800} />
              </p>
            </div>

            <p>
              Together, we'll discuss your goals, build the right systems, streamline operations, and create a plan for sustainable growth.
            </p>
            <p>
              Whether it's technology, marketing, AI, automation, customer support, or business operations, every engagement is designed around your business—not a package.
            </p>
            <div className="pt-6 text-left font-medium text-ink">
              <p className="mb-1">Tell us where you want to go.</p>
              <p className="mb-8">We'll help you build the right path.</p>
              <p className="text-primary font-semibold text-[19px] md:text-[21px]">Everything your business needs.</p>
              <p className="text-primary font-semibold text-[19px] md:text-[21px]">One partner.</p>
            </div>
          </motion.div>

          {/* CTA Button + Trust Line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-8 py-4 rounded-[8px] text-[16px] font-medium hover:bg-primary-hover transition-colors shadow-[0_0_24px_rgba(79,91,196,0.3)] hover:shadow-[0_0_32px_rgba(79,91,196,0.5)]"
            >
              Book a Strategy Call
            </Link>

            <p className="text-[13px] leading-[1.4] text-ink-tertiary mt-6">
              No commitment required · Free strategy session
            </p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
