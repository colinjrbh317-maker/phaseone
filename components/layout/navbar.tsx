"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, FlaskConical, ShoppingCart, Search, Hexagon } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WaitlistInput } from "@/components/ui/waitlist-input";

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/shop?q=${encodeURIComponent(q)}`);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-background/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Wordmark */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="Phase One Labz">
              <span
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 text-primary group-hover:bg-primary/25 transition-colors"
                aria-hidden="true"
              >
                <FlaskConical size={16} />
              </span>
              <span className="font-heading font-black text-xl sm:text-2xl tracking-tighter text-foreground uppercase">
                Phase One <span className="text-primary tracking-widest font-sans font-light text-lg">Labz</span>
              </span>
            </Link>

            {/* Desktop search */}
            <form
              onSubmit={handleSearch}
              className="hidden md:block flex-1 max-w-[200px] lg:max-w-[240px] relative transition-all"
            >
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search peptides"
                className="w-full h-9 pl-9 pr-4 rounded-full bg-muted border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </form>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-xs font-bold tracking-widest uppercase whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side — cart + Labz Club + hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link
                href="/labz-club"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full px-4 h-9 text-xs font-bold uppercase tracking-wider border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap"
              >
                <Hexagon size={14} className="mr-1" />
                Labz Club
              </Link>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label="Shopping cart"
                className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors relative"
              >
                <ShoppingCart size={20} />
              </button>
              <button
                type="button"
                className="lg:hidden p-2 text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search peptides..."
                  className="w-full h-11 pl-9 pr-4 rounded-full bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </form>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-base font-bold tracking-widest uppercase text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <WaitlistInput />
              </div>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
