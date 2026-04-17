import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  FlaskConical,
  ShieldCheck,
  Download,
  AlertTriangle,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { testPanels } from "@/lib/constants";
import { getProductBySlug, toLegacyProduct } from "@/lib/catalog";

export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const row = await getProductBySlug(slug);
  if (!row) notFound();

  const product = toLegacyProduct(row);
  const outOfStock = row.available !== null && row.available <= 0;

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 bg-background min-h-screen text-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Pre-Orders
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-card border border-border/50 rounded-xl overflow-hidden flex items-center justify-center shadow-2xl p-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(195,100%,50%,0.08)_0%,transparent_70%)] pointer-events-none" />
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-sm bg-primary border border-primary/20 px-2.5 py-1 text-xs font-black text-primary-foreground uppercase tracking-widest shadow-[0_0_15px_hsl(195,100%,50%,0.5)]">
                  {product.badge}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full max-w-sm h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,191,255,0.15)] relative z-10"
              />
            </div>

            <div className="flex flex-col">
              <div className="mb-2 inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-sm border border-primary/40 bg-primary/10 text-primary-foreground text-[10px] font-black tracking-widest uppercase self-start shadow-[0_0_15px_rgba(0,191,255,0.1)]">
                <FlaskConical size={12} className="text-primary shrink-0" />
                <span>Phase 1 Pre-Order Allocation</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-foreground mb-2 mt-4 break-words">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-primary/10 border border-primary/50 text-primary px-3 py-1 rounded-sm text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(0,191,255,0.2)]">
                  {product.size}
                </span>
                <span className="font-heading font-black text-2xl text-foreground tracking-widest">
                  {product.priceDisplay}
                </span>
                {row.available !== null && (
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    {outOfStock
                      ? "Unavailable"
                      : `${row.available} in stock`}
                  </span>
                )}
              </div>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium mb-8">
                {product.description}
              </p>

              <div className="bg-card border border-border p-5 sm:p-6 rounded-xl mb-8 space-y-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-[10px] sm:text-xs font-bold text-muted-foreground leading-relaxed uppercase tracking-widest">
                    <span className="text-foreground">Pre-Order Status:</span> Secure your allocation before US laboratory validation clears. Expected queue deployment upon launch.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={outOfStock}
                  className="w-full flex items-center justify-center gap-2 rounded-[4px] gradient-button h-14 text-sm sm:text-base font-black uppercase tracking-widest glow-primary-hover shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={18} />
                  {outOfStock ? "Out of Stock" : "Secure Pre-Order"}
                </button>
              </div>

              <div className="space-y-4 border-t border-border pt-8">
                <h3 className="font-heading font-black uppercase tracking-tighter text-xl mb-4">
                  Independent Testing Specifications
                </h3>
                {testPanels.map((panel) => (
                  <div
                    key={panel.key}
                    className="p-4 border border-border/50 rounded-lg bg-card/30 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={16} className="text-primary drop-shadow-[0_0_8px_rgba(0,191,255,0.8)]" />
                      <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">
                        {panel.fullName}
                      </h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-foreground/80 font-bold leading-relaxed uppercase tracking-wider">
                      {panel.body}
                    </p>
                  </div>
                ))}

                <button className="flex w-full items-center justify-center gap-2 p-4 mt-4 border border-dashed border-border/60 rounded-lg text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-card/50 hover:text-primary transition-all group">
                  <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                  Download Sample C.O.A.
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
