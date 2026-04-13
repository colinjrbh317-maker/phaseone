import Link from "next/link";
import { Hexagon } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { aboutCopy, testPanels } from "@/lib/constants";

// Note: About page uses no imagery — deliberate compliance choice (avoids any risk of
// founder/lab/lifestyle photos triggering FDA "lifestyle marketing" concerns).
// This matches Peptide Foundry's approach.

export const metadata = {
  title: "About Us | Phase One Labz",
  description:
    "Phase One Labz is independently operated and built for researchers. Every peptide in our catalog is third-party tested and backed by a published Certificate of Analysis.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <div className="text-xs font-semibold tracking-[0.2em] text-primary mb-4">
              {aboutCopy.eyebrow}
            </div>
            <h1
              className="font-heading font-black tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight"
              
            >
              {aboutCopy.h1}
            </h1>
          </div>

          {/* Story */}
          <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-16">
            <p>{aboutCopy.paraLead}</p>
            <p>{aboutCopy.paraSecondary}</p>
          </div>

          {/* Mission pullout */}
          <blockquote className="my-16 pl-6 border-l-4 border-primary">
            <p
              className="font-heading font-black tracking-tighter uppercase text-2xl md:text-3xl italic text-foreground leading-snug"
              
            >
              “{aboutCopy.mission}”
            </p>
          </blockquote>

          {/* 4 value cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-20">
            {aboutCopy.valueCards.map((card) => (
              <div key={card.title} className="card-organic p-6">
                <h3
                  className="font-heading font-black tracking-tighter uppercase font-bold text-xl text-foreground mb-2"
                  
                >
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Testing section */}
          <div className="mb-20">
            <h2
              className="font-heading font-black tracking-tighter uppercase text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight"
              
            >
              {aboutCopy.testingSection.h2}
            </h2>
            <p className="text-muted-foreground mb-8">{aboutCopy.testingSection.subhead}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testPanels.map((panel) => (
                <div key={panel.key} className="card-organic p-5">
                  <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                    {panel.label}
                  </div>
                  <h4
                    className="font-heading font-black tracking-tighter uppercase font-bold text-lg text-foreground mb-2"
                    
                  >
                    {panel.fullName}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{panel.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Labz Club section */}
          <div className="mb-20 rounded-3xl bg-[hsl(205,15%,58%)] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(32,100%,70%,0.25)_0%,transparent_55%)]" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 text-primary mb-5">
                <Hexagon size={22} />
              </div>
              <h2
                className="font-heading font-black tracking-tighter uppercase text-3xl md:text-4xl font-bold mb-5 tracking-tight"
                
              >
                {aboutCopy.labzClubH2}
              </h2>
              <div className="space-y-4 text-white/85 max-w-xl leading-relaxed mb-8">
                {aboutCopy.labzClubBody.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <Link
                href="/labz-club"
                className="inline-flex items-center gap-2 rounded-full gradient-button px-6 h-11 text-sm font-semibold glow-primary-hover transition-shadow"
              >
                {aboutCopy.labzClubCta}
              </Link>
            </div>
          </div>

          {/* Research-use disclaimer */}
          <p className="text-xs text-muted-foreground/80 italic leading-relaxed">
            For Research Use Only. All products sold by Phase One Labz are intended strictly for laboratory
            research and educational purposes. They are not intended for human or animal consumption,
            therapeutic use, or any diagnostic procedures. By purchasing from Phase One Labz, you acknowledge
            that these products will be used solely in a research setting by qualified professionals.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
