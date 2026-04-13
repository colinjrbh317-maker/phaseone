"use client";

import { motion } from "framer-motion";
import { FlaskConical, ShieldCheck, Truck, Factory, ArrowRight } from "lucide-react";
import { trustStripCopy } from "@/lib/constants";
import Link from "next/link";

export function TrustStrip() {
  return (
    <section className="relative py-20 bg-background border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-foreground tracking-tighter uppercase leading-[0.9]">
              {trustStripCopy.h2}
              <span className="block mt-1 text-primary tracking-widest text-3xl sm:text-4xl" style={{textShadow: "0 0 30px hsl(195, 100%, 50%, 0.4)"}}>
                {trustStripCopy.h2Accent}
              </span>
            </h2>

            <p className="text-base font-medium text-muted-foreground leading-relaxed mb-6">
              {trustStripCopy.para1}
            </p>

            {/* Static Testing Bullet Points instead of tabs */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-foreground uppercase tracking-wider mb-1">Purity (HPLC)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">Verify peptide identity and confirm minimum 99% purity thresholds.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-foreground uppercase tracking-wider mb-1">Heavy Metals (MS)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">Detect trace metal contamination to ensure USP compliance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-foreground uppercase tracking-wider mb-1">Endotoxins (LAL)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">Measure bacterial endotoxin levels prior to lot release.</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm font-semibold text-muted-foreground/80 leading-relaxed italic border-l-2 border-primary/40 pl-4 mt-8">
              {trustStripCopy.para2}
            </p>
          </motion.div>

          {/* RIGHT — Creative Data Ring Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] mx-auto perspective-1000"
          >
            {/* Pulsing Glow Base */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-[60px] max-w-[80%] mx-auto max-h-[80%] mt-[10%]" />
            
            {/* Outer Data Ring (Animated Spin) */}
            <div className="absolute inset-0 rounded-full border border-primary/30 min-w-full" style={{ borderStyle: 'dotted', borderWidth: '4px', animation: 'spin 40s linear infinite' }} />
            
            {/* Inner Neon Mesh */}
            <div className="absolute inset-6 rounded-full border border-cyan-400/40 shadow-[inset_0_0_30px_rgba(0,191,255,0.2)] animate-[spin_60s_linear_infinite_reverse]" />
            
            {/* Core Shield / Readout Container */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full bg-background/90 backdrop-blur-xl rounded-full border border-primary/40 shadow-[0_0_40px_rgba(0,191,255,0.3)] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-primary/20 to-transparent" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <ShieldCheck size={32} className="text-primary mb-2 drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]" />
                  <div className="font-heading text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tighter leading-none mb-1">
                    3-Panel
                  </div>
                  <div className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest text-center leading-tight">
                    Independent<br/>Testing
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-[0.3em] mt-3">Every Lot</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature banners below the split (Neon Spiced Up) */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col sm:flex-row gap-5 items-center sm:items-stretch justify-between p-6 sm:p-8 rounded-xl bg-card border border-primary/30 shadow-[0_0_25px_rgba(0,191,255,0.1)] hover:border-primary/60 transition-all group"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30 text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(0,191,255,0.6)] transition-all">
                <Truck size={26} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-lg font-black uppercase tracking-widest text-foreground">
                  {trustStripCopy.featureCard1.title}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1 max-w-[240px]">
                  {trustStripCopy.featureCard1.body}
                </p>
              </div>
            </div>
            <Link href="/shop" className="w-full sm:w-auto self-center shrink-0 inline-flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground hover:brightness-110 px-6 py-3 rounded-sm shadow-[0_0_15px_rgba(0,191,255,0.4)] transition-all">
              Shop Now <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1 flex flex-col sm:flex-row gap-5 items-center sm:items-stretch justify-between p-6 sm:p-8 rounded-xl bg-card border border-primary/30 shadow-[0_0_25px_rgba(0,191,255,0.1)] hover:border-primary/60 transition-all group"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30 text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(0,191,255,0.6)] transition-all">
                <Factory size={26} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-lg font-black uppercase tracking-widest text-foreground">
                  {trustStripCopy.featureCard2.title}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1 max-w-[240px]">
                  {trustStripCopy.featureCard2.body}
                </p>
              </div>
            </div>
            <Link href="/shop" className="w-full sm:w-auto self-center shrink-0 inline-flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground hover:brightness-110 px-6 py-3 rounded-sm shadow-[0_0_15px_rgba(0,191,255,0.4)] transition-all">
              Shop Now <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
