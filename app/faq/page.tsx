import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FAQ } from "@/components/sections/faq";

export const metadata = {
  title: "Research FAQ | Phase One Labz",
  description:
    "Answers about our research peptide catalog, Certificates of Analysis, third-party testing methodology, shipping, and the Labz Club.",
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-28 bg-background min-h-screen">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
