"use client";

import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Catalog } from "@/components/sections/catalog";
import { Science } from "@/components/sections/science";
import { LabzClub } from "@/components/sections/labz-club";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Catalog />
        <Science />
        <LabzClub />
        <FAQ />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
