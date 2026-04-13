"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { products, searchProducts, researchGroups, type Product } from "@/lib/constants";
import { ProductDrawerModal } from "@/components/ui/product-drawer-modal";

function ProductGridCard({ product, onClick }: { product: Product, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col rounded-2xl border border-border bg-background hover:border-primary/40 hover:shadow-[0_16px_40px_hsl(32,100%,70%,0.18)] transition-all duration-500 overflow-hidden text-left w-full h-full"
    >
      <div className="relative w-full aspect-square bg-gradient-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-primary/15 border border-primary/40 px-2.5 py-0.5 text-[10px] font-semibold text-foreground uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Image
            src={product.image}
            alt={product.name}
            width={240}
            height={240}
            className="w-auto h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_8px_20px_rgba(255,192,103,0.25)]"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 min-h-[140px] flex-1">
        <h3
          className="font-heading font-black tracking-tighter uppercase text-base text-foreground group-hover:text-primary transition-colors"
        >
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-snug line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center rounded-full bg-background border border-primary/30 px-2.5 py-1 text-xs font-semibold text-foreground">
            {product.size} · {product.priceDisplay}
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
            Learn more
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </button>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const groupFilter = searchParams.get("group") ?? "";

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = q ? searchProducts(q) : products;
    if (groupFilter) {
      list = list.filter((p) => p.group === groupFilter);
    }
    return list;
  }, [q, groupFilter]);

  const activeGroup = researchGroups.find((g) => g.id === groupFilter);

  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">·</span>
            <span className="text-foreground">Shop All</span>
            {activeGroup && (
              <>
                <span className="mx-2">·</span>
                <span className="text-foreground">{activeGroup.name}</span>
              </>
            )}
          </nav>

          {/* Header */}
          <div className="mb-12 max-w-3xl">
            <h1
              className="font-heading font-black tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl text-foreground mb-5"
            >
              Research{" "}
              <em className="not-italic">
                <span
                  className="italic text-primary drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]"
                >
                  Catalog
                </span>
              </em>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Browse our complete catalog of USA-manufactured research peptides. Every product is synthesized
              in GMP-certified facilities with third-party purity verification and published Certificates of
              Analysis. All orders include free 2-day shipping within the United States.
            </p>
            {q && (
              <p className="mt-4 text-sm text-muted-foreground">
                Showing {filtered.length} result{filtered.length === 1 ? "" : "s"} for{" "}
                <span className="text-foreground font-semibold">&ldquo;{q}&rdquo;</span>
              </p>
            )}
          </div>

          {/* Research group filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/shop"
              className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                !groupFilter
                  ? "bg-primary/15 border border-primary/50 text-foreground"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              All ({products.length})
            </Link>
            {researchGroups.map((group) => {
              const count = products.filter((p) => p.group === group.id).length;
              const isActive = groupFilter === group.id;
              return (
                <Link
                  key={group.id}
                  href={`/shop?group=${group.id}`}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary/15 border border-primary/50 text-foreground"
                      : "bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {group.name} ({count})
                </Link>
              );
            })}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground mb-4">No products match your search.</p>
              <Link
                href="/shop"
                className="inline-flex items-center rounded-full gradient-button px-6 h-10 text-sm font-semibold"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <ProductGridCard 
                  key={product.sku} 
                  product={product} 
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}

          <p className="mt-12 text-xs text-muted-foreground/70 italic text-center">
            All products currently listed are for research purposes only.
          </p>
        </div>
      </main>
      <Footer />

      {/* Catalog Item Modal */}
      <ProductDrawerModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </SmoothScrollProvider>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopContent />
    </Suspense>
  );
}
