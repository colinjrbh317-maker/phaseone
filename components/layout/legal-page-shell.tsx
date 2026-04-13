import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/**
 * Reusable shell for legal pages. All copy inside these pages is boilerplate DRAFT
 * and MUST be reviewed by counsel before launch. See client-asset-needs.md P0 item 2.
 */
export function LegalPageShell({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 bg-background min-h-screen">
        <article className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1
            className="font-heading font-black tracking-tighter uppercase text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight"
            
          >
            {title}
          </h1>
          <p className="text-xs text-muted-foreground mb-10">Last updated: {lastUpdated}</p>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-5 leading-relaxed [&_h2]:font-heading font-black tracking-tighter uppercase [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-bold [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_strong]:text-foreground">
            {children}
          </div>
          <p className="mt-12 text-xs text-muted-foreground/60 italic">
            This page is a draft and is subject to review by legal counsel before launch.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
