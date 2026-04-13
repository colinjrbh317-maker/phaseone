"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hexagon, ArrowRight, Check } from "lucide-react";
import { labzClubCopy } from "@/lib/constants";

export function LabzClub() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to /api/waitlist → Supabase waitlist table (Track D)
    console.log("Labz Club waitlist signup:", email);
    setSubmitted(true);
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Slate-brand dark background (replaces PF's charcoal) */}
      <div className="absolute inset-0 bg-[hsl(205,15%,58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(32,100%,70%,0.2)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(202,100%,70%,0.15)_0%,transparent_55%)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 border border-primary/40 mb-6 shadow-[0_0_32px_hsl(32,100%,70%,0.35)]">
            <Hexagon className="text-primary drop-shadow-[0_0_15px_rgba(0,191,255,0.8)]" size={32} strokeWidth={1.5} />
          </div>

          <h3
            className="font-heading font-black tracking-tighter uppercase text-3xl sm:text-4xl md:text-5xl text-foreground mb-4"
          >
            The{" "}
            <span className="text-primary drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]">
              Labz Club
            </span>
          </h3>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed font-bold">
            {labzClubCopy.subhead}
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={labzClubCopy.waitlistPlaceholder}
                className="flex-1 rounded-full px-5 h-12 bg-background border border-primary/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-[0_0_15px_rgba(0,191,255,0.1)]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full gradient-button px-6 h-12 text-sm font-semibold whitespace-nowrap glow-primary-hover transition-shadow"
              >
                {labzClubCopy.cta}
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary px-5 py-3 text-primary font-bold">
              <Check size={18} />
              <span className="text-sm">You&apos;re on the list — we&apos;ll be in touch.</span>
            </div>
          )}

          <p className="text-xs text-muted-foreground/60 mt-4 font-semibold uppercase tracking-widest">
            Phase 1 is a founding-member waitlist. No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
