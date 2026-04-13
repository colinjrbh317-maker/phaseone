"use client";

import { motion } from "framer-motion";
import { ArrowRight, FlaskConical } from "lucide-react";
import { WaitlistInput } from "@/components/ui/waitlist-input";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] md:min-h-[90vh] flex items-center overflow-hidden bg-[hsl(210,30%,8%)]">
      {/* Premium Animated Biohacking Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00bfff1a_1px,transparent_1px),linear-gradient(to_bottom,#00bfff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Drifting glowing orbs - Hardware Accelerated */}
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[80px] transform-gpu will-change-transform animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[90px] transform-gpu will-change-transform animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[0%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[80px] transform-gpu will-change-transform animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Deep vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-primary/40 bg-primary/10 text-primary-foreground/90 text-sm mb-8 font-black tracking-widest uppercase shadow-[0_0_15px_hsl(195,100%,50%,0.2)]">
            <FlaskConical size={14} className="text-primary animate-pulse" />
            <span>Research Use Only</span>
          </div>

          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4 text-foreground leading-[0.9]">
            Research Grade
            <span className="block mt-2 text-primary font-black tracking-widest text-5xl sm:text-6xl lg:text-7xl drop-shadow-[0_0_25px_rgba(0,191,255,0.6)]">
              Peptides
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-[60ch] mb-10 leading-relaxed font-medium">
            USA-manufactured research peptides with comprehensive Certificates of Analysis.
            Independent third-party purity, heavy-metal, and endotoxin panels on every lot.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 min-h-[56px]">
            <a
              href="#catalog"
              className="flex items-center justify-center rounded-sm border border-border bg-card/50 backdrop-blur-sm hover:bg-muted hover:border-primary/40 text-foreground px-8 h-12 text-sm sm:text-base font-bold uppercase tracking-wider transition-all w-full sm:w-auto"
            >
              Browse Catalog
            </a>

            <div className="w-full sm:w-[320px]">
              <WaitlistInput />
            </div>
          </div>

          {/* Trust micro-row */}
          <div className="mt-12 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-8 gap-y-4 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-primary shadow-[0_0_8px_hsl(195,100%,50%,0.8)]" />
              Third-party tested
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-primary shadow-[0_0_8px_hsl(195,100%,50%,0.8)]" />
              Published COAs
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-primary shadow-[0_0_8px_hsl(195,100%,50%,0.8)]" />
              USA manufactured
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
