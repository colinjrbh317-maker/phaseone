import Link from "next/link";
import { Hexagon, FlaskConical } from "lucide-react";
import {
  brand,
  footerColumns,
  footerLegalDisclaimer,
  legalLinks,
  requiredFooterDisclaimer,
} from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        {/* Top row — logo col + 3 link columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">
          {/* Logo / tagline / contact (spans full mobile, 2 lg) */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-2 group flex-shrink-0" aria-label="Phase One Labz">
              <span
                className="inline-flex items-center justify-center h-10 w-10 rounded-sm bg-primary/10 border border-primary text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_15px_hsl(195,100%,50%,0.5)]"
                aria-hidden="true"
              >
                <FlaskConical size={20} />
              </span>
              <span className="font-heading font-black text-2xl tracking-tighter text-foreground uppercase">
                Phase One <span className="text-primary tracking-widest font-sans font-light text-xl">Labz</span>
              </span>
            </Link>
            
            <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-sm">
              {brand.tagline}
            </p>
            
            <div className="text-sm font-bold tracking-wider text-muted-foreground space-y-2 uppercase">
              <a
                href={`mailto:${brand.supportEmail}`}
                className="block hover:text-primary transition-colors"
              >
                {brand.supportEmail}
              </a>
              <address className="not-italic text-xs text-muted-foreground/60 leading-relaxed font-semibold">
                {brand.address.street}
                {brand.address.city && (
                  <>
                    <br />
                    {brand.address.city}, {brand.address.state} {brand.address.zip}
                  </>
                )}
              </address>
            </div>
          </div>

          {/* 3 link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-5">
              <h4 className="font-bold text-sm text-foreground uppercase tracking-widest">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold tracking-wide text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                    >
                      {link.label === "Labz Club" && (
                        <Hexagon size={14} className="text-primary mr-1" />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Required per-page disclaimer */}
        <div className="mt-20 pt-10 border-t border-border">
          <p className="text-sm text-foreground font-bold uppercase tracking-widest mb-6 max-w-3xl">
            {requiredFooterDisclaimer}
          </p>

          {/* 4-paragraph legal disclaimer block */}
          <div className="space-y-4 max-w-5xl text-xs font-medium leading-relaxed text-muted-foreground/70">
            {footerLegalDisclaimer.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
            © {year} {brand.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
