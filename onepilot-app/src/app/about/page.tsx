"use client";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/sections/footer";
import FinalCta from "@/components/sections/final-cta";
import IndustriesMarquee from "@/components/sections/industries-marquee";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowDown, Code2, LineChart, Zap, Settings2 } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-canvas">
        {/* --- 1. HERO SECTION --- */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-28 px-6">
          <div className="max-w-[900px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-[1px] w-6 bg-primary/40" />
                <span className="text-[12px] text-primary tracking-[0.2em] uppercase font-semibold">About OnePilot</span>
                <div className="h-[1px] w-6 bg-primary/40" />
              </div>

              <h1 className="text-[40px] md:text-[56px] text-ink font-semibold tracking-tight leading-[1.1] mb-6">
                Businesses Need Fewer Vendors. Not More.
              </h1>

              <p className="text-[16px] md:text-[18px] text-ink-muted leading-[1.6] max-w-[700px] mx-auto mb-8">
                Modern businesses rely on websites, marketing, automation, support, analytics, and operations to grow. Managing them through separate vendors creates complexity, misalignment, and wasted time.
              </p>

              <p className="text-[18px] md:text-[20px] text-ink font-medium tracking-tight">
                OnePilot was built to bring everything together under one roof.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 2. THE PROBLEM --- */}
        <section className="py-20 md:py-28 bg-surface-1/50 border-y border-hairline px-6 overflow-hidden">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[32px] md:text-[42px] text-ink font-semibold tracking-tight mb-6 leading-[1.1]">
                Business Growth Has Become Fragmented.
              </h2>
              <p className="text-[16px] text-ink-muted leading-[1.6] mb-6">
                Most businesses spend more time coordinating vendors than actually growing their business.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-[16px] text-ink-muted font-medium">Different teams.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-[16px] text-ink-muted font-medium">Different priorities.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-[16px] text-ink-muted font-medium">Different systems.</span>
                </div>
              </div>
              <p className="text-[18px] text-primary font-semibold tracking-tight">
                OnePilot changes that.
              </p>
            </motion.div>

            {/* Vendor Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-canvas border border-hairline rounded-[20px] p-6 md:p-10 relative shadow-2xl"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 relative z-10">
                {[
                  "Website Agency", "Marketing Agency", "Automation Consultant",
                  "Support Team", "Data Analyst", "AI Specialist"
                ].map((vendor) => (
                  <div key={vendor} className="bg-surface-2 border border-hairline-strong rounded-[10px] p-3 flex items-center justify-center text-center">
                    <span className="text-[12px] text-ink-subtle font-medium">{vendor}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-8 relative z-10">
                <div className="bg-surface-2 p-2.5 rounded-full border border-hairline">
                  <ArrowDown className="text-primary animate-bounce" size={20} />
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-[14px] p-6 text-center relative z-10 shadow-[0_0_40px_rgba(94,106,210,0.15)]">
                <span className="text-[28px] font-bold text-primary tracking-tight tracking-widest">OnePilot</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 3. OUR APPROACH --- */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-[1280px] mx-auto text-center mb-12">
            <h2 className="text-[32px] md:text-[42px] text-ink font-semibold tracking-tight mb-5">
              One Team. Every Function.
            </h2>
            <p className="text-[16px] text-ink-muted max-w-[700px] mx-auto leading-[1.6]">
              We combine Technology, Marketing, AI, Automation, Support, and Operations into a single ecosystem designed around one goal:
              <br /><span className="text-primary font-semibold mt-2 inline-block">Helping businesses grow.</span>
            </p>
          </div>

          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "BUILD", desc: "Create the digital foundation.", icon: Code2 },
              { title: "GROW", desc: "Generate customers and revenue.", icon: LineChart },
              { title: "AUTOMATE", desc: "Eliminate repetitive work.", icon: Zap },
              { title: "OPERATE", desc: "Run your business efficiently.", icon: Settings2 }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-surface-1 border border-hairline rounded-[16px] p-6 hover:bg-surface-2 transition-colors"
                >
                  <Icon className="text-primary mb-5" size={24} strokeWidth={1.5} />
                  <h3 className="text-[16px] font-semibold text-ink mb-2 tracking-tight">{pillar.title}</h3>
                  <p className="text-[14px] text-ink-muted leading-[1.6]">{pillar.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* --- 4. WHAT WE BELIEVE --- */}
        <section className="py-20 md:py-28 bg-surface-1/30 px-6 border-y border-hairline">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-[28px] md:text-[36px] text-ink font-semibold tracking-tight mb-12 text-center">
              Our Principles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {[
                {
                  id: "01",
                  title: "Simplicity Wins",
                  desc: "Businesses shouldn't need ten different partners to achieve one goal."
                },
                {
                  id: "02",
                  title: "Systems Over Services",
                  desc: "Projects end. Systems continue creating value."
                },
                {
                  id: "03",
                  title: "AI Is A Tool",
                  desc: "Technology should solve problems, not create them."
                },
                {
                  id: "04",
                  title: "Growth Is The Outcome",
                  desc: "Every decision should contribute to measurable business growth."
                }
              ].map((principle, i) => (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <span className="text-[28px] md:text-[40px] font-display font-bold text-hairline-strong leading-none">
                    {principle.id}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-semibold text-ink mb-2 tracking-tight">{principle.title}</h3>
                    <p className="text-[15px] text-ink-muted leading-[1.6]">{principle.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. WHY ONEPILOT --- */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-[28px] md:text-[36px] text-ink font-semibold tracking-tight mb-12 text-center">
              What Makes OnePilot Different
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "One Partner", desc: "Everything managed through one team." },
                { title: "Connected Systems", desc: "Technology, marketing, and operations working together." },
                { title: "AI Integrated", desc: "Automation built where it creates real value." },
                { title: "Built To Scale", desc: "Designed for businesses at every stage of growth." }
              ].map((diff, i) => (
                <motion.div
                  key={diff.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-l-2 border-primary/30 pl-5 py-2 hover:border-primary transition-colors"
                >
                  <h3 className="text-[16px] font-semibold text-ink mb-2 tracking-tight">{diff.title}</h3>
                  <p className="text-[14px] text-ink-subtle leading-[1.6]">{diff.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. INDUSTRIES --- */}
        <IndustriesMarquee />

        {/* --- 7. VISION --- */}
        <section className="py-28 md:py-40 px-6 bg-canvas relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <span className="text-[12px] text-primary tracking-[0.2em] uppercase font-semibold mb-6 block">Our Vision</span>
            <h2 className="text-[28px] md:text-[42px] lg:text-[48px] text-ink font-medium tracking-tight leading-[1.2]">
              To become the operating system behind modern businesses by making technology, automation, growth, and operations accessible through a single partner.
            </h2>
          </div>
        </section>

      </main>

      {/* --- 8. FINAL CTA --- */}
      <FinalCta
        title={
          <>
            Ready To Build<br />What's Next?
          </>
        }
        description="Whether you're launching, growing, or scaling, OnePilot helps you move faster with the right systems behind your business."
        buttonText="Book A Strategy Call"
      />

      <Footer />
    </>
  );
}
