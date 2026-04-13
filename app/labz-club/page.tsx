import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LabzClub } from "@/components/sections/labz-club";
import { aboutCopy } from "@/lib/constants";

export const metadata = {
  title: "The Labz Club | Phase One Labz",
  description:
    "Wholesale pricing on every peptide in our catalog, priority order handling, early access to new research compounds. Join the founding-member waitlist.",
};

export default function LabzClubPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-28 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
          <h1
            className="font-heading font-black tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight"
            
          >
            {aboutCopy.labzClubH2}
          </h1>
          <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
            {aboutCopy.labzClubBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
        <LabzClub />
      </main>
      <Footer />
    </>
  );
}
