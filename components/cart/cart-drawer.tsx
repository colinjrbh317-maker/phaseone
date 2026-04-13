"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, ArrowRight, Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useCart } from "@/lib/context/cart-context";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  
  // Backwards compatibility for when we passed props
  const isOpen = open ?? isCartOpen;
  const setOpen = onOpenChange ?? setIsCartOpen;

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Shopping Cart"
      data-state="open"
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-background shadow-2xl border-l border-border flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-primary" />
            <h2
              className="font-heading tracking-tighter uppercase font-black text-lg text-foreground"
            >
              Your Cart
            </h2>
            <span className="flex items-center justify-center bg-primary/20 text-primary w-5 h-5 rounded-full text-[10px] font-black ml-2">
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,191,255,0.2)]">
              <ShoppingCart size={24} className="text-primary drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]" />
            </div>
            <h3
              className="font-heading tracking-tighter uppercase font-black text-xl text-foreground mb-2"
            >
              Your Cart is Empty
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-6 font-semibold">
              Browse the research catalog and add your peptide selection.
            </p>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-full gradient-button px-6 h-11 text-sm font-semibold glow-primary-hover transition-shadow"
            >
              Browse Catalog
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin">
              {items.map(({ product, quantity }) => (
                <div key={product.sku} className="flex gap-4 p-4 border border-border/50 rounded-xl bg-card">
                  <div className="w-20 h-20 bg-primary/5 rounded-lg border border-border p-2 flex items-center justify-center shrink-0">
                    <Image src={product.image} alt={product.name} width={60} height={60} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-heading font-black text-base uppercase tracking-tight leading-tight line-clamp-2">
                        {product.name}
                      </h3>
                      <button onClick={() => removeFromCart(product.sku)} className="text-muted-foreground hover:text-destructive transition-colors mt-0.5">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 mb-2">
                      {product.size}
                    </span>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-black text-sm tracking-widest">{product.priceDisplay}</span>
                      <div className="flex items-center gap-3 bg-background border border-border rounded-full px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(product.sku, quantity - 1)}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          disabled={quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-black w-4 text-center">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(product.sku, quantity + 1)}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Subtotal</span>
                <span className="font-heading font-black text-2xl tracking-tight">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={() => alert("Payment processor routing pending.")}
                className="w-full flex items-center justify-center gap-2 rounded-full gradient-button h-14 text-sm font-black uppercase tracking-widest glow-primary-hover shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-all mb-4"
              >
                <CreditCard size={18} />
                Checkout
              </button>
              <p className="text-[10px] text-muted-foreground/80 font-bold uppercase tracking-widest leading-relaxed text-center">
                All items are strictly for research use. Not for human consumption.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
