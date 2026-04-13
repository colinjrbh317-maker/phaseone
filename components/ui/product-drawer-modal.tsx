"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, Plus, Minus, ShoppingCart, CreditCard } from "lucide-react";
import { type Product } from "@/lib/constants";
import { useCart } from "@/lib/context/cart-context";

export function TestingAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tests = [
    {
      label: "Purity Testing",
      desc: "Every batch is verified via HPLC to confirm peptide identity and 99.9% purity.",
    },
    {
      label: "Heavy Metal Testing",
      desc: "Screen for lead, mercury, arsenic, and cadmium to ensure all levels are well below USP limits.",
    },
    {
      label: "Endotoxin Testing",
      desc: "Bacterial endotoxin levels are measured via LAL and must pass before release.",
    },
  ];

  return (
    <div className="mt-6 border-t border-border pt-4">
      <h4 className="font-heading text-sm font-black uppercase tracking-widest text-foreground mb-3 flex items-center gap-2">
        <Info size={14} className="text-primary" /> Independent Lot Testing
      </h4>
      <div className="space-y-2">
        {tests.map((test, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border border-border/50 rounded-sm bg-muted/20 overflow-hidden hover:border-primary/30 transition-colors">
              <button
                type="button"
                className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <span className="font-bold text-xs uppercase tracking-wider text-foreground">{test.label}</span>
                {isOpen ? <Minus size={14} className="text-primary" /> : <Plus size={14} className="text-muted-foreground" />}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-3 pb-3 text-xs font-medium text-muted-foreground leading-relaxed"
                  >
                    {test.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ProductDrawerModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDrawerModal({ product, onClose }: ProductDrawerModalProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, 1);
    onClose();
  };

  const handleCheckout = () => {
    if (!product) return;
    addToCart(product, 1);
    onClose();
    alert("Payment processor setup is currently pending.");
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-md bg-card border-t sm:border border-border sm:rounded-xl shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Close Handle */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/10">
              <span className="font-black text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/40 px-2 py-1 rounded-sm border border-border">Quick View</span>
              <button onClick={onClose} className="p-1 rounded-full bg-background border border-border text-foreground hover:bg-muted transition">
                <X size={16} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 scrollbar-thin">
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full border border-primary/20 flex items-center justify-center shadow-[0_0_30px_hsl(195,100%,50%,0.2)]">
                  <Image src={product.image} alt={product.name} width={120} height={120} className="object-contain" />
                </div>
              </div>

              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter text-foreground mb-1">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-primary border border-primary/50 px-2 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-[0_0_10px_hsl(195,100%,50%,0.5)]">
                  {product.size}
                </span>
                <span className="font-bold text-sm text-foreground tracking-widest">{product.priceDisplay}</span>
              </div>

              <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              <TestingAccordion />

              {/* Bottom CTA Options */}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-sm gradient-button h-12 text-sm font-black uppercase tracking-widest glow-primary-hover shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-all"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="flex w-full items-center justify-center gap-2 rounded-sm border border-border hover:border-primary/40 bg-muted/30 hover:bg-muted h-12 text-sm font-black uppercase tracking-widest transition-all text-foreground"
                >
                  <CreditCard size={16} className="text-primary" /> Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
