"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PeptideQuiz } from "@/components/quiz/peptide-quiz";
import { FlaskConical } from "lucide-react";

export default function QuizPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/15 border border-primary/40 text-primary mb-6">
            <FlaskConical size={28} />
          </div>
          <h1
            className="font-heading font-black tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-5 tracking-tight"
            
          >
            Find Your{" "}
            <em className="not-italic">
              <span
                className="italic text-primary drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]"
                
              >
                Research Pathway
              </span>
            </em>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
            Answer 5 quick questions and we&apos;ll match you with the research group and compatible peptides
            from our catalog that fit your pathway investigation. Under 60 seconds.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full gradient-button px-8 h-12 text-base font-semibold glow-primary-hover transition-shadow"
          >
            <FlaskConical size={16} />
            Start the Pathway Selector
          </button>
          <p className="text-xs text-muted-foreground/70 italic mt-6">
            For laboratory research use only. No recommendations constitute medical or dosage guidance.
          </p>
        </div>
      </main>
      <Footer />
      <PeptideQuiz open={open} onOpenChange={setOpen} />
    </>
  );
}
