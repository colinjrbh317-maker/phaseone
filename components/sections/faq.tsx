"use client";

import { motion } from "framer-motion";
import { faqItems } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-heading font-black tracking-tighter uppercase text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
            
          >
            Research{" "}
            <em className="not-italic">
              <span
                className="italic text-primary drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]"
                
              >
                FAQ
              </span>
            </em>
          </h2>
          <p className="text-muted-foreground">
            Answers about our catalog, testing, shipping, and the Labz Club.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                className="border border-border rounded-xl px-6 bg-background data-[open]:border-primary/30 data-[open]:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-sm text-foreground hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
