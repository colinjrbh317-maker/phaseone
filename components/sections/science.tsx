"use client";

import { motion } from "framer-motion";
import { FlaskConical, ShieldCheck, Microscope } from "lucide-react";
import { testPanels } from "@/lib/constants";

const icons = [FlaskConical, Microscope, ShieldCheck];

export function Science() {
  return (
    <section id="science" className="py-20 sm:py-28 bg-muted/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-heading font-black tracking-tighter uppercase text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
            
          >
            Independent{" "}
            <em className="not-italic">
              <span
                className="italic text-primary drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]"
                
              >
                Testing
              </span>
            </em>
          </h2>
          <p className="text-muted-foreground">
            Every lot is independently tested before it&apos;s made available. Here&apos;s exactly what we screen for.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testPanels.map((panel, i) => {
            const Icon = icons[i] ?? FlaskConical;
            return (
              <motion.div
                key={panel.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-organic p-6 md:p-8"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 text-primary mb-5">
                  <Icon size={22} />
                </div>
                <h3
                  className="font-heading font-black tracking-tighter uppercase font-bold text-xl text-foreground mb-2"
                  
                >
                  {panel.fullName}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{panel.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
