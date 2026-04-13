"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus, X, Info } from "lucide-react";
import {
  researchGroups,
  getProductsByGroup,
  getBestSellers,
  type Product,
} from "@/lib/constants";

import { ProductDrawerModal } from "@/components/ui/product-drawer-modal";

// ----------------------------------------------------------------------
// Product Card Component
// ----------------------------------------------------------------------
function ProductCard({ product, onClick, priority = false }: { product: Product; onClick: () => void; priority?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col w-[200px] sm:w-[240px] shrink-0 text-left card-organic overflow-hidden transition-all hover:border-primary/50"
    >
      <div className="relative h-44 bg-gradient-to-br from-card to-background overflow-hidden border-b border-border/50">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 inline-flex items-center rounded-sm bg-primary border border-primary/20 px-1.5 py-0.5 text-[9px] font-black text-primary-foreground uppercase tracking-widest shadow-[0_0_8px_hsl(195,100%,50%,0.4)]">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={150}
            priority={priority}
            className="w-auto h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_8px_15px_rgba(0,191,255,0.1)]"
            onError={(e) => {
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) parent.innerHTML = '<div class="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg></div>';
            }}
          />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-heading font-black text-base uppercase tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs font-medium text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex flex-col gap-2 pt-2 mt-auto">
          <span className="self-start inline-flex items-center rounded-sm bg-muted/40 border border-border/50 px-2 py-1 text-[10px] font-black tracking-widest text-foreground">
            {product.size} · {product.priceDisplay}
          </span>
          <span className="inline-flex items-center gap-1.5 py-1 text-xs font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-all">
            Learn more
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </button>
  );
}

// ----------------------------------------------------------------------
// Main Catalog Component
// ----------------------------------------------------------------------
export function Catalog() {
  const [activeTab, setActiveTab] = useState<string>("Best Sellers");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const tabs = ["All", "Best Sellers", ...researchGroups.map((g) => g.name)];

  return (
    <>
      <section id="catalog" className="py-20 bg-background relative z-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground">
              All <span className="text-primary" style={{textShadow: "0 0 20px hsl(195, 100%, 50%, 0.4)"}}>Peptides</span>
            </h2>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 rounded-sm gradient-button px-6 h-10 text-xs font-black uppercase tracking-widest glow-primary-hover shrink-0"
            >
              Full Catalog <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filtering Tabs */}
          <div className="flex overflow-x-auto snap-x pb-4 mb-8 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-none gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`snap-start whitespace-nowrap px-4 py-2 text-xs font-black uppercase tracking-widest rounded-sm border transition-all ${
                    isActive 
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_4px_15px_hsl(195,100%,50%,0.3)]" 
                      : "bg-card text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Catalog Rows */}
          <div className="space-y-12">
            
            {/* Best Sellers Row */}
            {(activeTab === "All" || activeTab === "Best Sellers") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h3 className="font-heading font-black text-xl uppercase tracking-tighter text-foreground border-l-4 border-primary pl-3">
                  Best Sellers
                </h3>
                <div className="flex gap-4 overflow-x-auto snap-x pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                  {getBestSellers().map((p, i) => (
                    <div key={p.sku} className="snap-start">
                      <ProductCard product={p} onClick={() => setSelectedProduct(p)} priority={i < 4} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Category Rows */}
            {researchGroups.map((group) => {
              if (activeTab !== "All" && activeTab !== group.name) return null;
              
              const groupProducts = getProductsByGroup(group.id);
              if (groupProducts.length === 0) return null;

              return (
                <motion.div key={group.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-black text-xl uppercase tracking-tighter text-foreground border-l-4 border-primary pl-3">
                      {group.name}
                    </h3>
                  </div>
                  <div className="flex gap-4 overflow-x-auto snap-x pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {groupProducts.map((p) => (
                      <div key={p.sku} className="snap-start">
                        <ProductCard product={p} onClick={() => setSelectedProduct(p)} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Reusable Product Drawer Modal */}
      <ProductDrawerModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
