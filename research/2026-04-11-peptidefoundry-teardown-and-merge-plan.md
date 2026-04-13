# Site Teardown: Peptide Foundry → Phase One Labz Merge Plan

**Source URL:** https://peptidefoundry.com
**Built with:** Vite + React SPA (Lovable.dev generated), Supabase backend
**Target project:** `/Users/colinryan/ALEX/phase-one-labz` (Next.js 16 + React 19 + Tailwind v4)
**Date analyzed:** 2026-04-11
**Last updated:** 2026-04-11 — decisions locked, compliance rules applied

---

> 📌 **Companion docs:**
> - [`client-asset-needs.md`](./client-asset-needs.md) — single source of truth for everything outstanding from the client (COAs, payment processor, legal review, photos, logo, about copy, etc.), organized P0/P1/P2.
> - [`pf-deep-dive-and-track-b-spec.md`](./pf-deep-dive-and-track-b-spec.md) — **Track B reference.** Full Playwright-rendered teardown of PF's /, /shop, /about, /contact, cart drawer, and search UX with exact copy, plus the Track B build spec, copy adaptation table, compliance rewrites of every existing MVP section, 16-SKU catalog copy, reframed quiz questions, Nano Banana + VEO content-gen queue, and execution order.

## 🔒 DECISIONS LOCKED (2026-04-11)

1. **Palette:** "California beaches" — `#FFC067` pastel orange (primary), `#66F4FF` cyan, `#66C4FF` sky blue, `#7D99AA` slate blue-grey, on white `#FFFFFF` background. Dark blocks use slate `#7D99AA` rather than charcoal.
2. **Primary color:** Pastel orange `#FFC067`.
3. **Typography:** Playfair Display (serif headings) + Inter (sans body) — confirmed.
4. **Quiz:** Featured prominently (homepage block + dedicated `/quiz` route). **Reframed for compliance** — see Compliance Override below.
5. **Backend:** Supabase (client will fund). Payment processor still TBD (client working on it) → **Track D checkout is DEFERRED to phase 2**; phase 1 stubs cart state only, no Stripe integration.
6. **Membership club:** Built as **waitlist-only** in phase 1.
7. **Catalog size:** ✅ **16 SKUs locked, priced, and coded** — 15 unique products + Retatrutide in 2 sizes. ION-3R identified as Retatrutide (LY-3437943); GLOW/KLOW compositions inferred from industry-standard blend formulations (math-verified against fill sizes); all 16 SKUs priced and assigned internal SKU codes. See "Catalog — Phase One Labz SKU List" section below. Client still owes: COA PDFs, product photos, final price confirmation — see `client-asset-needs.md`.

---

## 🚨 COMPLIANCE OVERRIDE — HIGHEST PRIORITY

Client supplied binding compliance rules (must pass for approval). These **override** anything in the original merge plan that conflicts. They also invalidate several current MVP sections.

### Hard rules (from client compliance doc)

- **Per-product disclaimer required:** exact text → *"All products currently listed on this site are for research purposes only."*
- **Footer disclaimer required:** exact text → *"All products sold on this website are intended for research and identification purposes only. These products are not intended for human dosing, injection, or ingestion."*
- Product descriptions must be **scientific/technical only**.
- **NO** health, anti-aging, performance, wellness, weight-loss, or recovery claims — including in reviews.
- **NO** dosage guidance, protocols, "cycles," or "stacks."
- **NO** testimonials describing outcomes or effects.
- **NO** influencer, social media, or lifestyle marketing.
- **NO** blogs, FAQs, or SEO terms that imply personal or human use.
- Peptides are strictly for laboratory, academic, or institutional research — not for human or animal consumption.

### What this kills in the current phase-one-labz MVP

| Current MVP element | Status under compliance | Action |
|---|---|---|
| `components/sections/benefits.tsx` — 6 benefit cards (Recovery, Performance, Longevity, Weight Management, Cognitive, Immune Health) | ❌ **VIOLATION** — every one is a banned claim category | **Delete** or rewrite as "Research Areas" with scientific pathway names only |
| `components/sections/testimonials.tsx` — 3 customer quotes with outcomes | ❌ **VIOLATION** — testimonials describing outcomes explicitly banned | **Delete entirely** |
| `components/sections/science.tsx` — "quality assurance" section | ⚠️ Keep structure, rewrite copy to avoid wellness framing | Rewrite |
| `components/sections/social-proof.tsx` — "10k+ customers" stat | ⚠️ Implies consumer use | Rewrite as lab/research framing ("X batches tested", "X COAs published") or remove |
| `components/sections/faq.tsx` — product usage FAQs | ❌ Likely violations if any Q implies human use | Rewrite for research framing only, or remove from phase 1 |
| `components/quiz/` — archetype quiz with goals (Recovery/Performance/etc.) | ❌ **VIOLATION** — personal-goal framing banned | **Reframe as research-category selector** (see below) |
| Hero copy ("Unlock Your Body's Full Potential") | ❌ Human-use implication | Rewrite |
| Product cards with wellness/performance language | ❌ | Rewrite as technical descriptions (mechanism of action, structural class, molecular weight, research pathway) |

### Quiz reframe (compliance-safe version)

The archetype quiz stays structurally (5 questions → category → product list) but **becomes a research-pathway selector**, not a personal-goal selector.

- ❌ Old: *"What's your primary goal? Recovery / Performance / Longevity / Weight loss"*
- ✅ New: *"Which research pathway are you investigating? Tissue repair / Metabolic modulation / Cellular senescence / Neurological signaling / GPCR agonism"*

- ❌ Old: *"Your archetype is **The Optimizer** — here are peptides to help you perform."*
- ✅ New: *"Your research area: **Metabolic modulation**. Peptides in our catalog with published literature in this pathway:"*

Same UX, same conversion flow, zero compliance risk. Quiz copy will need a full rewrite pass before launch.

### New compliance-driven homepage section order

Replacing the original "homepage merge" list:

1. **Navbar** — unchanged plan (cream→white bg, pastel orange CTA accents)
2. **Hero** — video bg OK; copy must be research-framed. Candidate h1: *"Research-Grade **Peptides**"* (italic on word "Peptides" in pastel orange). Subhead: *"Third-party tested. Comprehensive COAs. For laboratory research use only."*
3. **Trust / Testing Strip** — Purity / Heavy Metal / Endotoxin toggles ✅ (already scientific framing). Keep.
4. **Research Pathway Quiz block** — prominent CTA to the reframed quiz.
5. **Category carousels** — categories must be named by **research pathway**, not benefit (e.g., "Tissue Repair Research", "Metabolic Research" — Peptide Foundry already does this, we copy the framing convention).
6. **~~Benefits~~** — **REMOVED** (violations top to bottom).
7. **~~Testimonials~~** — **REMOVED**.
8. **Methodology / COA section** — replaces "Science" section. Shows multi-panel testing, per-lot COAs, GMP facility, chain of custody. All scientific framing.
9. **Labz Club waitlist** — hexagon-branded, research newsletter framing ("Be notified of new research-grade peptides and published COAs"), no outcome promises.
10. **Footer** — multi-column + **exact required footer disclaimer text verbatim** + per-page legal links.

---

## 📦 Catalog — Phase One Labz SKU List (16 SKUs)

Grouped into **research pathways** (compliance-safe category naming). Every product will ship with the per-product disclaimer and a scientific-technical description only (mechanism of action, structural class, molecular weight, published research pathway — no human effects).

### Group 1 — Regenerative & Tissue Repair Research (5 SKUs)
| SKU | Size | Type | Scientific framing |
|---|---|---|---|
| BPC-157 | 10mg | Single peptide | Pentadecapeptide; studied in GI tract cytoprotection and angiogenesis pathways |
| TB-500 | 10mg | Single peptide | Synthetic Thymosin Beta-4 fragment; actin-binding research |
| BPC157 + TB500 | 20mg | **Blend** | Combined regenerative pathway research formulation |
| GHK-Cu | 50mg | Copper peptide | Tripeptide–copper complex; extracellular matrix and collagen research |
| KPV | 10mg | Tripeptide | α-MSH C-terminal fragment; NF-κB pathway research |

### Group 2 — Growth Hormone Secretagogue Research (2 SKUs)
| SKU | Size | Type | Scientific framing |
|---|---|---|---|
| CJC-1295 + Ipamorelin (No DAC) | 5/5mg | **Blend** | GHRH analog + GHRP; pulsatile GH release pathway research |
| Tesamorelin | 10mg | Single peptide | Synthetic GHRH analog; lipogenesis pathway research |

### Group 3 — Metabolic & Mitochondrial Research (4 SKUs)
| SKU | Size | Type | Scientific framing |
|---|---|---|---|
| MOTS-c | 10mg | Mitochondrial-derived peptide | 16-aa peptide from mitochondrial 12S rRNA; AMPK pathway research |
| LIPO-C + B12 (Methylated) | 10mg | **Blend** | Methionine / inositol / choline + methylcobalamin research compound |
| Retatrutide (ION-3R) | 20mg | Triple agonist | **Retatrutide** (LY-3437943); GLP-1 / GIP / glucagon triple receptor agonist; metabolic pathway research |
| Retatrutide (ION-3R) | 10mg | Same (smaller SKU) | Same compound, smaller fill size |

> **Note on ION-3R identity:** client said "Retamorelin," but that compound does not exist — the `-morelin` suffix is reserved for ghrelin mimetics (Ipamorelin, Anamorelin, etc.). The "3R" almost certainly refers to **triple receptor**, which matches **Retatrutide** (Eli Lilly's LY-3437943 GLP-1/GIP/glucagon triple agonist, currently in phase 3 trials). Copy and grouping are written against Retatrutide. Colin to confirm with client before launch; if wrong, swap the compound name but the metabolic grouping stands regardless.

### Group 4 — Melanocortin Pathway Research (1 SKU)
| SKU | Size | Type | Scientific framing |
|---|---|---|---|
| MLT II (Melanotan II) | 10mg | Single peptide | Synthetic α-MSH analog; MC1R/MC4R agonism research |

### Group 5 — Proprietary Research Blends (2 SKUs)
| SKU | Size | Type | Inferred composition (industry-standard) |
|---|---|---|---|
| GLOW | 70mg | Regenerative blend | GHK-Cu 50mg + BPC-157 10mg + TB-500 10mg (= 70mg — math verified) |
| KLOW | 80mg | Regenerative blend | GHK-Cu 50mg + KPV 10mg + BPC-157 10mg + TB-500 10mg (= 80mg — math verified) |

> **Note on GLOW / KLOW:** these compositions are the widely circulated industry-standard blends whose total masses exactly match the 70mg and 80mg vial sizes on the catalog. The math only works with these specific formulations, which is strong evidence the client uses the same recipe. Proceeding with these as product copy. **Colin to confirm with client** before launch — if the client uses a different formulation, only the ingredients table on the product detail page needs updating.

### Group 6 — Research Supplies (2 SKUs)
| SKU | Size | Notes |
|---|---|---|
| Bacteriostatic Water (Hospira) | 30ml | Branded / larger size |
| Bacteriostatic Water | 10ml | Generic / smaller size |

---

---

### Pricing + SKU codes (locked for phase 1 seed data)

All prices are **placeholder market-reasonable values** chosen from typical research-peptide market ranges. Client can adjust in Supabase without code changes. SKU codes follow the pattern `PHL-{COMPOUND}-{MG}` (Phase One Labz — compound — fill size), uppercase, no spaces or punctuation in the compound segment, used for URLs and internal references.

| # | SKU Code | Display Name | Size | Group | Price (USD) |
|---|---|---|---|---|---|
| 1 | `PHL-BPC157-10` | BPC-157 | 10mg | Regenerative | **$65** |
| 2 | `PHL-TB500-10` | TB-500 | 10mg | Regenerative | **$75** |
| 3 | `PHL-BPCTB-20` | BPC-157 + TB-500 | 20mg | Regenerative (blend) | **$120** |
| 4 | `PHL-GHKCU-50` | GHK-Cu | 50mg | Regenerative | **$60** |
| 5 | `PHL-KPV-10` | KPV | 10mg | Regenerative | **$60** |
| 6 | `PHL-CJCIPA-5` | CJC-1295 + Ipamorelin (No DAC) | 5/5mg | GH Secretagogue (blend) | **$65** |
| 7 | `PHL-TESA-10` | Tesamorelin | 10mg | GH Secretagogue | **$110** |
| 8 | `PHL-MOTSC-10` | MOTS-c | 10mg | Metabolic | **$125** |
| 9 | `PHL-LIPOC-10` | LIPO-C + B12 (Methylated) | 10mg | Metabolic (blend) | **$50** |
| 10 | `PHL-RETA-10` | Retatrutide (ION-3R) | 10mg | Metabolic | **$170** |
| 11 | `PHL-RETA-20` | Retatrutide (ION-3R) | 20mg | Metabolic | **$320** |
| 12 | `PHL-MLT2-10` | MLT II | 10mg | Melanocortin | **$45** |
| 13 | `PHL-GLOW-70` | GLOW (regenerative blend) | 70mg | Proprietary Blend | **$135** |
| 14 | `PHL-KLOW-80` | KLOW (regenerative blend) | 80mg | Proprietary Blend | **$155** |
| 15 | `PHL-BACH-30` | Bacteriostatic Water (Hospira) | 30ml | Research Supplies | **$20** |
| 16 | `PHL-BAC-10` | Bacteriostatic Water | 10ml | Research Supplies | **$10** |

**Total catalog value (1 of each):** $1,485. Average SKU price: ~$93.

**Pricing rationale:**
- Regenerative singles clustered around $60–$75 (competitive entry category)
- Regenerative blend carries a modest premium (BPC+TB @ $120 vs. $65+$75=$140 à la carte, so the blend is a slight *discount* — standard market behavior)
- CJC-1295+Ipamorelin at $65 because 5/5mg is a small fill
- Tesamorelin $110 (expensive to synth, specialty)
- MOTS-c $125 (mitochondrial peptides are premium)
- Retatrutide is the most expensive — $170 at 10mg, $320 at 20mg (slight per-mg discount on the larger fill to encourage upsell; still below typical market high of $180/10mg because client is new)
- GLOW $135 and KLOW $155 priced higher than their raw component costs would suggest — blend premium reflects formulation work
- Bac water is commodity — $20/$10 is standard

**Adjust before launch:** client should verify against (a) his COGS + margin targets, (b) what Peptide Foundry and competitors are charging live. All 16 prices are single-query Supabase updates — not code changes.

---

### Catalog implications for the plan

- Category carousels go from the original "7 Peptide Foundry categories" → **6 Phase One Labz research groups** (Regenerative, GH Secretagogue, Metabolic, Melanocortin, Proprietary Blends, Supplies). Simpler, cleaner, and each category has at least 1 product.
- The hero "Trust Strip" (Purity / Heavy Metal / Endotoxin tested) gets extra weight because 3 of our SKUs are proprietary blends where lab verification is the only trust signal customers can rely on.
- Quiz reframe needs to map pathways → these 6 groups (not more — keep it tight).
- Product detail page template needs to handle both **single peptide** and **blend** layouts. Blends need an "Ingredients" table showing each component + mg. Singles just need one component row.
- **Retatrutide will be the biggest attention-grabber** — it's the most expensive, most talked-about compound in research circles right now. Homepage "Best Sellers" strip should include it even though it's not technically in the Regenerative group — category carousels handle this by having a curated "Featured" row that cross-cuts the pathways.

### Catalog implications for the plan

- Category carousels go from the original "7 Peptide Foundry categories" → **6 Phase One Labz research groups** (Regenerative, GH Secretagogue, Metabolic, Melanocortin, Proprietary Blends, Supplies). Simpler, cleaner, and each category has at least 1 product.
- The hero "Trust Strip" (Purity / Heavy Metal / Endotoxin tested) gets extra weight because 3 of our SKUs are proprietary blends where lab verification is the only trust signal customers can rely on.
- Quiz reframe needs to map pathways → these 6 groups (not more — keep it tight).
- Product detail page template needs to handle both **single peptide** and **blend** layouts. Blends need an "Ingredients" table showing each component + mg. Singles just need one component row.

---

### Compliance checklist to gate launch

Before any page goes to production, verify against this list:
- [ ] Every product page carries the required per-product disclaimer text, visible above the fold
- [ ] Footer carries the required footer disclaimer text verbatim on every page
- [ ] No testimonials anywhere in the codebase
- [ ] No outcome/benefit/wellness/performance/recovery language in any copy (grep for: recovery, performance, longevity, weight loss, anti-aging, wellness, energy, muscle, fat loss, improve, boost, enhance, optimize your body, unlock, potential)
- [ ] No dosage, protocol, cycle, stack language (grep for: mg, dose, dosage, protocol, cycle, stack, mcg per kg)
- [ ] Product descriptions reference mechanism of action, structural class, molecular weight, research pathway, published literature — not human effects
- [ ] Quiz reframed to research pathways, no personal goals
- [ ] FAQ entries reviewed line by line — none imply human use
- [ ] No influencer photos, lifestyle imagery, before/after, "I tried this" framing
- [ ] Site metadata (title, description, OG) uses research framing, not wellness framing
- [ ] JSON-LD schema uses `Product` with research-grade positioning, not `Drug` or health claims

---

## TL;DR

Peptide Foundry is a **warm-light, Playfair-serif, orange-accented** e-commerce SPA with heavy frosted-glass UI, video hero, 7 horizontal-scroll category carousels, and a "Foundry Club" membership hook. Phase One Labz is currently a **dark-mode, blue-accented** single-page marketing shell with a unique **peptide-archetype quiz** but no real e-commerce plumbing.

**Strategic recommendation:** adopt Peptide Foundry's warm-light palette + serif typography (it's more premium and distinctive than generic dark SaaS blue), keep Phase One Labz's quiz as the differentiator Peptide Foundry lacks, and build out the missing e-commerce infrastructure (routes, backend, payments, auth) on top.

---

## Peptide Foundry — Confirmed Tech Stack

| Technology | Evidence | Purpose |
|---|---|---|
| Vite + React SPA | `/assets/index-*.js` + chunked `react-vendor`, `ui-vendor`, `data-vendor`, `animation-vendor` | Build tool / framework |
| Tailwind CSS | Utility-first markup, CSS custom props, `@property` rules | Styling |
| shadcn/ui + Radix | `data-state`, `aria-controls="radix-:r*"`, Dialog patterns | Headless components |
| Framer Motion 1.3.16 | `animation-vendor` chunk analysis | Layout/variant/gesture animations |
| Lenis | `<html class="lenis">` | Smooth scroll |
| Sonner | `[data-sonner-toast]` inline CSS | Toast notifications |
| Supabase | `preconnect` to `lxkgqglqrmtpinxqsztc.supabase.co` | Backend (products, auth, orders) |
| Microsoft Clarity | `clarity.ms/tag/w83mevfu8w` | Heatmaps + session replay |
| Playfair Display + Inter | Self-hosted woff2 in `/fonts/` | Serif display + sans body |
| Brockmann Medium | `/brockmann-medium-webfont.woff2` | Decorative accent font (lightly used) |

---

## Design System — Phase One Labz ("California Beaches" palette)

**Note:** the tokens below are the *Phase One Labz brand palette* Colin locked in. The original Peptide Foundry tokens are archived at the bottom of this doc for reference. We are NOT copying PF's warm earth tones — we're taking their layout, interaction patterns, and component architecture, but stamping them with an entirely different color story.

### Color Tokens — Phase One Labz (HSL for shadcn/Tailwind v4 `@theme`)

| Token | Value (HSL) | Hex | Use |
|---|---|---|---|
| `--background` | `0 0% 100%` | `#FFFFFF` | Page bg, card bg |
| `--foreground` | `210 14% 20%` | `#2B333A` | Body text (darker slate for contrast on white) |
| `--card` | `0 0% 100%` | `#FFFFFF` | Card surfaces |
| `--card-foreground` | `210 14% 20%` | `#2B333A` | |
| `--primary` | `32 100% 70%` | **`#FFC067`** | **Pastel orange — CTAs, accents, hover glows** |
| `--primary-foreground` | `210 30% 15%` | `#1A2530` | Text on primary (dark slate, not white — pastel needs dark contrast) |
| `--secondary` | `202 100% 70%` | `#66C4FF` | Sky blue — secondary buttons, link hovers, badges |
| `--secondary-foreground` | `210 30% 15%` | `#1A2530` | |
| `--accent` | `184 100% 70%` | `#66F4FF` | Cyan — highlights, "new" badges, selected states |
| `--accent-foreground` | `210 30% 15%` | `#1A2530` | |
| `--muted` | `205 18% 95%` | `#ECEFF2` | Subtle section backgrounds, hover states |
| `--muted-foreground` | `205 15% 45%` | `#667380` | Secondary text |
| `--slate` | `205 15% 58%` | **`#7D99AA`** | Dark blocks (replaces PF's charcoal), footer bg, trust strip |
| `--slate-foreground` | `0 0% 100%` | `#FFFFFF` | Text on slate |
| `--border` | `205 20% 90%` | `#DDE4EA` | Card borders, dividers |
| `--input` | `205 20% 92%` | `#E2E8EC` | Form borders |
| `--ring` | `32 100% 70%` | `#FFC067` | Focus ring — matches primary |
| `--destructive` | `0 84% 60%` | `#E94444` | Errors |
| `--radius` | `0.75rem` | — | Base radius (inherits PF's radius scale) |

### Tailwind v4 `@theme` block (paste into `app/globals.css`)

```css
@theme inline {
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(210 14% 20%);
  --color-card: hsl(0 0% 100%);
  --color-card-foreground: hsl(210 14% 20%);
  --color-primary: hsl(32 100% 70%);           /* #FFC067 pastel orange */
  --color-primary-foreground: hsl(210 30% 15%);
  --color-secondary: hsl(202 100% 70%);        /* #66C4FF sky blue */
  --color-secondary-foreground: hsl(210 30% 15%);
  --color-accent: hsl(184 100% 70%);           /* #66F4FF cyan */
  --color-accent-foreground: hsl(210 30% 15%);
  --color-muted: hsl(205 18% 95%);
  --color-muted-foreground: hsl(205 15% 45%);
  --color-slate-brand: hsl(205 15% 58%);       /* #7D99AA */
  --color-slate-brand-foreground: hsl(0 0% 100%);
  --color-border: hsl(205 20% 90%);
  --color-input: hsl(205 20% 92%);
  --color-ring: hsl(32 100% 70%);
  --color-destructive: hsl(0 84% 60%);
  --radius: 0.75rem;
  --font-sans: var(--font-inter);
  --font-display: var(--font-playfair-display);
}
```

### Palette usage rules

- **Primary pastel orange `#FFC067`** — the ONLY attention-grabbing color. Use on: primary CTAs, the hero word accent (italic), hover glows, focus rings, "Join Waitlist" buttons, active states. **Never** use as body text (low contrast on white).
- **Sky blue `#66C4FF`** — secondary CTAs, link hovers, trust-badge backgrounds, category pill outlines.
- **Cyan `#66F4FF`** — reserved for highlights only: "New" badges, selected filter pills, progress indicators. Scarcest color in the system.
- **Slate `#7D99AA`** — dark surfaces (footer, trust strip, "Labz Club" waitlist block). Replaces the charcoal Peptide Foundry uses. Gives us a dark panel that still reads airy + modern, not heavy.
- **White `#FFFFFF`** — primary page background. Everything breathes.
- **Dark slate text `#2B333A`** — body copy on white. Not pure black; keeps the soft modern-clinical feel.

### Color contrast gotcha ⚠️
Pastel orange `#FFC067` against white has **~1.6:1 contrast** — fails WCAG for text. **Never put text directly on primary as a button label without a dark-slate foreground.** The shadcn token `--primary-foreground: #1A2530` handles this — just make sure custom buttons inherit it. For large display use only (e.g., the italic h1 accent word), visual emphasis is OK because it's not body text.

### Shadow + glow scale (adapted for pastel palette)

- `shadow-glow-primary`: `0 0 24px hsl(32 100% 70% / 0.35)` — orange glow for CTAs
- `shadow-glow-accent`: `0 0 20px hsl(184 100% 70% / 0.25)` — cyan highlight glow (sparingly)
- `shadow-card`: `0 1px 2px rgb(0 0 0 / .04), 0 8px 24px rgb(0 0 0 / .06)` — soft card lift
- `shadow-card-hover`: `0 2px 4px rgb(0 0 0 / .05), 0 16px 40px rgb(0 0 0 / .10)` — card hover

### Border radius — inherit PF scale
`--radius: 0.75rem` base, multiplier scale: sm/md/lg/xl/2xl/3xl → same as shadcn defaults.

### Typography
- **Headings (h1–h3, `.font-serif`, `.font-display`):** Playfair Display, `letter-spacing: -0.02em to -0.025em`, `line-height: 1.1–1.2`
- **Body / UI (`.font-sans`):** Inter, weight range 400–700
- **Hero h1:** `text-4xl sm:text-5xl lg:text-6xl font-serif` — word "Peptides" italicized with `text-primary` (orange) for the editorial pop
- **Mono:** system UI monospace stack

### Keyframes
```css
@keyframes reveal-up {
  0%   { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-reveal-up { animation: reveal-up 0.8s cubic-bezier(.23,1,.32,1) forwards; }

@keyframes star-btn {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
```
Hero stagger: h1 delay `0.2s`, subhead `0.3s`, CTAs `0.4s`.

### Signature UI Classes (copy these verbatim)

**`.nav-link`** — underline-on-hover animation via `::after` width transition, color shift from `#584B41` to `#DB6D24`.

**`.gradient-button`** — animated radial gradient with `@property` CSS custom props (`--pos-x`, `--pos-y`, `--spread-x`, `--color-1..5`, `--border-angle`). Transitions all of them on hover. This is the hero CTA and it's the single most distinctive piece of CSS on the site.

**`.card-organic`** — soft triple-layer shadow, 1.25rem radius, 0.5s cubic-bezier lift on hover (`translateY(-2px)` + deeper shadow).

**`.divider-organic`** — hairline gradient fade `transparent → stone-warm → transparent`, used between sections.

**Frosted glass product cards** (from markup):
```
bg-gradient-to-br from-white/10 via-white/5 to-transparent
backdrop-blur-xl border border-white/20
group-hover:shadow-[0_16px_48px_rgba(255,107,0,0.15)]
group-hover:border-primary/30
```
Plus a hidden blob shadow layer (`absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 group-hover:scale-150`) that scales/fades in on hover.

---

## Page Structure (top → bottom)

| # | Section | Notes |
|---|---|---|
| 1 | Header (fixed) | Logo + search + nav (Home / Shop All / About / Contact) + **Foundry Club** button (hexagon icon, primary glow) + Cart + User menu. Cream/90 backdrop-blur bg. |
| 2 | Hero | Full-bleed `/hero-bg.webm` video with poster, gradient overlay (mobile bottom-up, desktop left-right), h1 **"Research-Grade *Peptides*"** (italic primary accent on "Peptides"), subhead **"Quality peptides for research. Third-party tested, comprehensive COAs."**, primary CTA **"Join The Foundry Club"**, staggered reveal animations. |
| 3 | Trust/Testing Strip | Two-column: left has 3 toggle buttons (**Purity Tested / Heavy Metal Tested / Endotoxin Tested**) + long copy about multi-panel testing + COAs per lot. Right has a canvas-rendered animated vial graphic with orange drop-shadow. Below, 2 feature cards: **"Free 2-Day Shipping"** (light bg) and **"Manufactured, Tested & Shipped in the USA"** (charcoal bg) with hexagon watermarks. |
| 4 | Divider + "All Peptides" header | `.divider-organic`, h2, and two view-toggle buttons (**By Category** / **A-Z**). |
| 5–11 | 7 Category Carousels | Horizontal-scroll rows, each opens with a branded tile card (background image for 5 of 7), followed by product cards. Categories: **Best Sellers → Tissue Repair → Muscle & Performance → Metabolic → Cellular Health → Cognition & Mood → Research Supplies**. Each section has `id="category-section-N"` for scroll anchors. Category tile uses `#C8825A` bronze tint. |
| 12 | Foundry Club Promo | Dark block, large hexagon icon, h3 serif **"The Foundry Club"**, copy about wholesale pricing + priority support + early access, primary CTA "Join The Foundry Club". |
| 13 | Footer | `bg-charcoal`, 4–5 column grid: Logo+tagline+address (Alpharetta GA), Shop, Support (Contact/About/FAQ/Shipping), Account (Sign In/Create/Orders/**Foundry Club**). Legal disclaimer paragraphs (research-only, non-FDA, not a compounding pharmacy). Bottom bar: Privacy/Terms/Refund/Shipping + © 2026. |

**Site map (routes referenced in markup):** `/`, `/shop`, `/about`, `/contact`, `/faq`, `/dashboard`, `/dashboard/orders`, `/sign-in`, `/sign-up`, plus ~18 product detail slugs (`/bpc-157`, `/cjc-1295-ipamorelin`, `/aod-9604`, `/epithalon`, `/selank`, `/bacteriostatic-water`, `/glp-3rt`, `/ghk-cu`, `/dsip`, `/igf-1-lr3`, `/ipamorelin`, `/melanotan-2`, `/mots-c`, `/nad`, `/pt-141`, `/glow`, `/glutathione`, `/bpc-157-tb-500`), plus legal pages.

### Product card structure (reusable)

```
<a href="/{slug}">
  [frosted glass container, w:200–240, h:320]
    [hidden blob-shadow layer]
    [image container h:208 → scale-110 + orange drop-shadow on hover]
    [body: font-display title (gradient→primary on hover) + 2-line clamped research description + dosage/price pill + "Learn more →" with translate-x-1 arrow slide]
</a>
```

---

## Phase One Labz MVP — Current State

| Area | Status |
|---|---|
| **Framework** | Next.js 16 + React 19 + TS strict + Tailwind v4 (via `@theme inline`, no tailwind.config.ts) |
| **Design mode** | Dark-only, forced via next-themes |
| **Primary color** | Blue `hsl(217 91% 60%)` |
| **Fonts** | Inter (body) + Space_Grotesk (headings) via next/font |
| **Animation** | framer-motion ^12.38 already installed ✅ |
| **Components installed** | Button, Badge, Dialog, Accordion, Input, Label, Progress, RadioGroup, Separator |
| **Routes** | **Only `/`** — a single monolithic landing page |
| **Sections on `/`** | Navbar → Hero → SocialProof → Benefits (6) → Products (4) → HowItWorks → Science → Testimonials → FAQ → FinalCTA → Footer |
| **Real content** | Copy is written, no lorem ipsum. 4 hardcoded products in `lib/constants.ts`: BPC-157 $49.99, TB-500 $54.99, GHK-Cu $44.99, Semaglutide $149.99 |
| **Unique asset** | **Peptide archetype quiz** (`components/quiz/`) — 5 questions → archetype → product recs. Uses Dialog + AnimatePresence. This is the differentiator. |
| **Backend / commerce** | None. No Supabase, Stripe, Prisma, auth, API routes, cart, checkout, product detail pages, account, legal pages, sitemap, analytics. |
| **Brand assets** | `public/logo.png` (3.1 MB), nothing else. `ALEX/ASSETS/` has one PNG. |

**Bottom line:** excellent marketing shell, zero e-commerce infrastructure.

---

## The Strategic Decisions (need Colin's call before build)

### 1. Light vs. dark mode — **RECOMMEND FLIP TO LIGHT**
Peptide Foundry's warm-cream palette is a big part of what makes it feel premium and differentiated from every other peptide vendor. Phase One Labz's current dark blue reads like generic B2B SaaS. **Recommendation: adopt the Peptide Foundry warm-light palette as default, treat dark as optional.**

### 2. Primary color — **RECOMMEND ORANGE `#C4581A`**
Distinctive, ownable, reads as "scientific energy + approachability." Keep it as the single accent, use it sparingly (CTAs, glows, hover states), leverage opacity modifiers (`/10`, `/20`, `/40`) for depth.

### 3. Typography — **RECOMMEND Playfair Display + Inter**
Swap Space Grotesk → Playfair Display for headings. This is the biggest single win — the serif heading against warm cream is the whole vibe. Inter stays for body.

### 4. Keep the quiz? — **YES, feature it prominently**
Peptide Foundry has no quiz. The archetype quiz is a real lead-gen + retention tool. Recommendation: promote it to its own section on the homepage (between hero and categories) AND a dedicated `/quiz` route.

### 5. Backend stack — **RECOMMEND Supabase + Stripe**
Matches Peptide Foundry's choice (proven for this use case). Fastest path to: product catalog, auth, orders, user dashboard. Stripe for payments (Checkout, not custom — faster to launch).

### 6. Membership ("Foundry Club" equivalent) — **DECIDE name + whether to build in phase 1**
Peptide Foundry's hexagon-branded club is visually central. Phase One Labz needs its own equivalent ("Labz Club"? "Founders Circle"?). Decide: build the nav/CTA/promo sections in phase 1 as a waitlist, defer actual membership billing to phase 2.

### 7. Product catalog size — how many SKUs at launch?
Peptide Foundry ships ~18. Phase One Labz currently has 4. Need to decide: match their catalog (18), start smaller (8–10 bestsellers), or go bigger. This drives content work (product copy, images, COAs).

---

## Phase 1 Build Plan (proposed — awaiting approval)

### Track A — Design system migration (1–2 days)
1. Update `app/globals.css`: swap `@theme inline` tokens to the warm-light Peptide Foundry palette (all values provided in the Design System section above).
2. Swap fonts in `app/layout.tsx`: Space_Grotesk → Playfair Display via next/font/google. Keep Inter.
3. Add brand utility classes: `.bg-charcoal`, `.bg-cream`, `.bg-stone-warm`, `.text-charcoal`, `.text-cream`, `.nav-link`, `.card-organic`, `.divider-organic`, `.animate-reveal-up`, `.gradient-button`, plus the `@property` declarations for the animated gradient button.
4. Remove `next-themes` forced-dark; set light as default, dark optional.
5. Install `lenis` + wire up root smooth scroll.

### Track B — Homepage merge (2–3 days)
Rebuild `app/page.tsx` with this section order, reusing existing components where possible:
1. **Navbar** — rebuild with cream/90 backdrop blur, add search input, Foundry-Club-equivalent glowing button with hexagon icon, cart, user menu.
2. **Hero** — video background (need to source/create `hero-bg.webm` + poster), serif h1 with italic primary accent on one word, subhead, primary CTA, staggered `animate-reveal-up` entry.
3. **Trust / Testing Strip** — 3 toggles (Purity / Heavy Metal / Endotoxin) + long-form copy + hexagon feature cards (free 2-day shipping, US-made).
4. **Quiz CTA block** — NEW: prominent card promoting the archetype quiz (unique to Phase One Labz). Links to `/quiz` and also opens the modal inline.
5. **Category carousels** — 5–7 horizontal-scroll rows by category. Reuse frosted-glass product card component.
6. **Social proof / testimonials** — keep existing, restyle to warm palette.
7. **Labz Club promo** — dark charcoal block, hexagon icon, waitlist CTA.
8. **FAQ** — keep existing accordion, restyle.
9. **Footer** — rebuild multi-column with legal disclaimer paragraphs.

### Track C — New routes (3–5 days)
- `/shop` — full catalog with category + A-Z toggle, filtering, search
- `/shop/[slug]` — product detail pages (image gallery, COA download, research description, dosage options, add-to-cart)
- `/about` — brand story + team + facility
- `/contact` — form → Supabase + email
- `/faq` — dedicated page
- `/quiz` — standalone quiz page (in addition to modal)
- `/sign-in`, `/sign-up` — Supabase Auth
- `/dashboard`, `/dashboard/orders` — account area
- `/cart`, `/checkout` — cart state + Stripe Checkout redirect
- `/privacy-policy`, `/terms-of-service`, `/refund-policy`, `/shipping-policy` — legal

### Track D — Backend (2–3 days, PAYMENT DEFERRED)
1. Set up Supabase project: `products`, `product_variants` (for size options like ION-3R 10mg/20mg), `ingredients` (for blends), `research_groups`, `orders`, `order_items`, `users`, `addresses`, `waitlist` (Labz Club), `quiz_submissions` tables.
2. Seed product catalog from the 16-SKU list above.
3. Supabase Auth (email + Google).
4. **⏸ Stripe / checkout DEFERRED** — client is still selecting a processor. Phase 1 stubs cart state in React (Zustand or Context) and a `/checkout` page that reads "Checkout coming soon — join waitlist" until processor is confirmed.
5. Move quiz submissions to Supabase.
6. Waitlist endpoint: `app/api/waitlist/route.ts` → Supabase `waitlist` table (for Labz Club signups).

### Track E — Content + assets (ongoing, parallel)
- Product photos (18 peptides — Midjourney or stock + lab-vial style)
- Hero video (stock lab footage + color grade, or custom shoot)
- COA PDFs per product
- Product research descriptions (research-only language, FDA-compliant)
- Legal copy (lawyer review needed — research-use-only disclaimer is critical for this category)

### Track F — Launch readiness (1–2 days)
- SEO: per-page metadata, OG images, `app/sitemap.ts`, `app/robots.ts`, JSON-LD product schema
- Analytics: Microsoft Clarity + Vercel Analytics
- Error boundaries (`app/error.tsx`, `app/global-error.tsx`)
- Lighthouse pass + image optimization (`next/image` for everything)
- Deploy: Vercel, domain, SSL, Stripe live keys, Supabase prod project

**Total phase 1 estimate: 10–16 working days depending on content bottleneck.**

---

## Critical Non-Engineering Blockers

1. **Legal review** — research-use-only language, FDA compliance, refund policy. Non-negotiable for this product category. Get a lawyer familiar with research chemical / supplement compliance before launch.
2. **Payment processor acceptance** — Stripe has been known to deplatform research peptide vendors. Need to confirm policy or have a backup (Authorize.net, NMI, high-risk processor). **This is a real launch risk — validate before building checkout.**
3. **Supplier / fulfillment** — who ships, where from, how is "free 2-day shipping" honored, return policy.
4. **Product photography + COA PDFs** — can't launch without them.

---

## Assets Needed

| Asset | How to source |
|---|---|
| Hero video | Stock lab footage (Envato, Artgrid) + color grade to warm tones, OR Runway ML text-to-video |
| Product photos (18) | Stock peptide vial photos + consistent color grade, OR commissioned shoot |
| Category background images (5) | Midjourney: `"warm cinematic lab photograph, amber lighting, scientific glassware, shallow depth of field, editorial style"` |
| Logo variants | Already have `logo.png` — need to convert to SVG + create inverted/cream variant for dark sections |
| Hexagon icon | Inline SVG (use same Lucide `hexagon` icon Peptide Foundry uses) |
| Favicon set | Generate from logo via realfavicongenerator.net |
| OG social card | Figma template, 1200×630 |
| Font files | Playfair Display + Inter from Google Fonts via next/font (no self-hosting needed) |

---

## What NOT to Clone

- Peptide Foundry's exact copy (plagiarism + brand dilution)
- Their product slugs/names as the catalog (make your own decisions)
- Microsoft Clarity tracking ID (get your own)
- Their Supabase URL (obviously)
- The exact hero video (need your own)

Clone the **structure, design system, interaction patterns, and component architecture.** Bring your own content, brand voice, and quiz differentiator.
