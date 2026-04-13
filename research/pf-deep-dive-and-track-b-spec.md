# Peptide Foundry Deep Dive + Phase One Labz Track B Spec

**Source:** peptidefoundry.com (live SPA, rendered via Playwright 2026-04-11)
**Purpose:** capture exact copy, layout, and UX patterns across PF's homepage, /shop, /about, /contact, cart, and search — then map them to Phase One Labz Track B implementation with a name-swap/compliance-adaptation layer.
**Method note:** WebFetch couldn't see PF content (SPA renders client-side). Pivoted to rendered-DOM extraction via the Playwright Browser skill session, which returned the real content verbatim.

---

## Part 1 — Peptide Foundry deep dive (exact copy + patterns)

### 1.1 Global nav + header

- **Desktop nav:** `Home / Shop All / About / Contact / Foundry Club / Sign In`
- **Header contains:** logo, desktop search input, nav, Foundry Club button (hexagon icon, primary glow), cart icon, user menu
- **Mobile:** hamburger reveals full-screen nav with same items + Foundry Club CTA
- **Header background:** cream/90 backdrop-blur
- **Age gate:** every route appears to render behind the sign-in modal on first visit (a gate, not a pop-up). Gate copy: *"By logging in, you certify that you are 21 or older and that any products purchased will be used exclusively for research purposes."* — with full legal checkbox (see §6 for exact text).

### 1.2 Homepage

#### Hero (video bg)
- **Video:** `/hero-bg.webm` (autoplay, loop, poster `/hero-poster.webp`)
- **Gradient overlay:** mobile bottom→top, desktop left→right, both fading from charcoal `rgb(35,30,26)` to transparent
- **H1** (Playfair, staggered `animate-reveal-up` delay 0.2s):
  > Research-Grade
  > *Peptides* ← italic, `text-primary` orange
- **Subhead** (delay 0.3s): *"Quality peptides for research. Third-party tested, comprehensive COAs."*
- **CTA** (delay 0.4s): "Join The Foundry Club" — uses the `.animate-star-btn` animated radial-gradient border effect that travels along an offset-path (the single most distinctive animation on the site)

#### Trust strip (sticky, 160–200vh scroll container)
- **3 test-type toggle buttons** (each opens a Radix dialog modal with educational content):
  - "Purity Tested"
  - "Heavy Metal Tested"
  - "Endotoxin Tested"
- **H2** (Playfair, charcoal): "Research-Grade Quality, *Every Batch*" (italic primary accent)
- **Body para 1:** *"Every peptide we offer is manufactured in the USA and undergoes rigorous, multi-panel testing before it reaches your lab. We partner with independent, third-party laboratories so you never have to question what's in the vial."*
- **Body para 2:** *"Full Certificates of Analysis are published for every product and every lot. Our manufacturer tests for heavy metal contamination, and we independently verify peptide purity and endotoxin levels. No shortcuts, no exceptions."*
- **Right column:** canvas-rendered animated vial graphic (896×1184) with orange drop-shadow
- **2 feature cards below:**
  1. **"Free 2-Day Shipping"** (light card): *"Same-day dispatch before 3 PM ET on every order, nationwide."*
  2. **"Manufactured, Tested & Shipped in the USA"** (charcoal card): *"GMP-certified facility. Every batch independently verified."*

#### Catalog section
- `.divider-organic` separator
- H2: "All Peptides"
- Toggle: **"By Category"** (primary button) / **"A-Z"** (outline button)
- **7 horizontal-scroll carousels**, one per category:
  1. Best Sellers
  2. Tissue Repair Research (with category tile bg image)
  3. Muscle & Performance Research
  4. Metabolic Research
  5. Cellular Health Research
  6. Cognition & Mood Research
  7. Research Supplies
- Category tile opens each row with a `#C8825A` bronze card. Product cards follow.

#### Foundry Club promo block (before footer)
- Charcoal dark block, large hexagon SVG icon (10×10, primary)
- **H3** (Playfair, white): "The Foundry Club"
- **Copy:** *"Unlock wholesale pricing on all peptides with our exclusive membership. Priority support, early access to new products, and more."*
- **CTA:** "Join The Foundry Club" with arrow slide + primary glow

#### Footer
- `bg-charcoal`, 5-column grid
- **Col 1 (logo span):** logo (inverted), tagline *"Research-grade peptides for scientific discovery"*, `support@peptidefoundry.com`, address `12460 Crabapple Rd, Ste 202 / Alpharetta, GA 30004`
- **Col 2 — SHOP:** All Peptides
- **Col 3 — SUPPORT:** Contact Us / About Us / FAQ / Shipping Info
- **Col 4 — ACCOUNT:** Sign In / Create Account / Order History / Foundry Club (with hexagon icon, `text-primary`)
- **Legal block (4 paragraphs — see §1.7)**
- **Bottom bar:** Privacy Policy / Terms of Service / Refund Policy / Shipping Policy | © 2026 Peptide Foundry. All rights reserved.

### 1.3 /shop page

- **H1:** "Shop All Peptides"
- **Subhead:** *"Browse our complete catalog of USA-manufactured research peptides. Every product is synthesized in GMP-certified facilities with third-party purity verification and published Certificates of Analysis. All orders include free 2-day shipping within the United States."*
- **Layout:** single full-width 4-column grid (2 on mobile, 3 on tablet)
- **No sidebar filters. No sort dropdown. No pagination.** Just every product on one page.
- **Breadcrumb:** Home · Shop All
- **Product card** — branded vial image (consistent template, labeled), optional badge (`Blend` on blends), product name, 1-line scientific description, `{dosage} - ${price}` pill, `Learn more →` link routing to `/{slug}`
- **Live product sample (real PF prices for reference):**
  | SKU | Price | Description |
  |---|---|---|
  | BPC-157 10mg | $55 | Studied for tissue repair and GI pathway modulation |
  | BPC-157 + TB-500 10/10mg | $115 | Combined peptides for tissue regeneration studies *(Blend badge)* |
  | CJC-1295 + Ipamorelin 5/5mg | $85 | Researched for GH secretagogue activity *(Blend badge)* |
  | AOD-9604 5mg | $75 | HGH fragment studied for lipolytic activity |
  | Epithalon 50mg | $125 | Researched for telomerase activation pathways |
  | DSIP 5mg | $55 | Nonapeptide studied for sleep modulation and stress response pathways |
- **Copy pattern formula:** `{Studied|Researched|Investigated} for {pathway|mechanism} {pathway keywords}` — these are the magic verbs that keep PF compliant. No outcomes, no benefits, no human-use language. Pure pathway science.
- **PF's full 21-SKU catalog** (from rendered DOM routes): BPC-157, TB-500, Ipamorelin, IGF-1 LR3, Tesamorelin, Sermorelin, AOD-9604, GLP-3RT *(Retatrutide — confirms PHL's ION-3R identification)*, MOTS-c, GHK-Cu, Selank, Semax, NAD+, Glutathione, PT-141, Melanotan-2, Epithalon, CJC-1295+Ipamorelin, BPC-157+TB-500, GLOW, Bacteriostatic Water, DSIP.

### 1.4 /about page

- **Eyebrow:** "OUR STORY"
- **H1** (Playfair): "Built by Curiosity, Driven by Quality"
- **No images on the page** — text only. Notable because it completely avoids the compliance risk of lab photography, founder headshots, or lifestyle imagery. Pure typography storytelling.
- **Opening (2 paragraphs):**
  > *"Peptide Foundry was founded by a team passionate about advancing peptide science. What began as a fascination with biochemistry and molecular signaling became a mission: to provide researchers with the highest-quality peptide materials at accessible prices."*
  >
  > *"As a family-owned and operated company, we hold ourselves to a higher standard. Every product we carry is selected for its research value, rigorously tested by independent laboratories, and backed by full documentation. We believe researchers deserve materials they can trust, without the markup."*
- **Pullout quote (mission):**
  > *"Our mission is simple: provide research-grade peptides with full transparency, rigorous third-party testing, and pricing that doesn't gatekeep scientific discovery."*
- **4 value cards (H3 + 1 sentence each):**
  1. **Scientific Rigor** — *"Every peptide undergoes multi-panel third-party testing. We publish Certificates of Analysis for every product and every lot. No exceptions."*
  2. **Family Operated** — *"We're not a faceless distributor. Peptide Foundry is family-owned, and every order is handled with the care and accountability that comes with it."*
  3. **Accessible Pricing** — *"Quality research materials shouldn't break the budget. We keep our margins fair so more labs and researchers can access what they need."*
  4. **US Manufactured** — *"Every peptide we carry is synthesized in a GMP-certified facility based in the United States, ensuring consistent quality and regulatory compliance."*
- **Star rating strip** — 50 star glyphs rendered (likely a 5-star block × 10 lot numbers, visual trust signal with no text)
- **H2: "Testing"** — subhead: *"Every batch is independently tested before it's made available. Here's exactly what we screen for."*
- **3 testing cards:**
  1. **Purity (HPLC)** — *"High-performance liquid chromatography confirms peptide identity and purity levels. Each COA reports exact purity percentages so you know precisely what you're working with."*
  2. **Endotoxins (LAL)** — *"Limulus Amebocyte Lysate testing screens for bacterial endotoxins that could compromise research results. We test every lot to ensure levels fall well within acceptable limits."*
  3. **Heavy Metals (MS)** — *"Mass spectrometry detects trace heavy metal contamination. This ensures your research materials are free from lead, mercury, arsenic, and cadmium."*
- **H2: "The Foundry Club"** — copy:
  > *"Think of it like a membership for serious researchers. Foundry Club members unlock wholesale pricing on every peptide in our catalog, get priority order handling, and receive early access to new products as they're released."*
  >
  > *"More than a discount, it's a community of curious minds who share a passion for discovery. Members connect to discuss their research, exchange insights, and stay at the forefront of peptide science."*
- **CTA:** "Join The Foundry Club"

### 1.5 /contact page

- **H1:** "Contact Us"
- **Subhead:** *"Have questions about peptides or our process? Reach out to our support team, and we'll respond within 24 hours."*  ← 24-hour SLA commitment
- **Two-section layout:**
  1. **Email Us** (H3) — `support@peptidefoundry.com` clickable
  2. **Send Us a Message** (H3) — *"Fill out the form below and our team will get back to you shortly."*
- **Form (3 fields, no subject dropdown):**
  | Label | Placeholder | Type | Required |
  |---|---|---|---|
  | Name | `Your full name` | text | no (HTML attr) |
  | Email | `your@email.com` | email | no |
  | Message | `Tell us how we can help...` | textarea | no |
- **Submit button:** "Send Message"
- **No phone, no map, no social links, no B2B/wholesale pathway, no success-state copy visible.** Email + form only. Clean + minimal.

### 1.6 Cart drawer + search

#### Cart (header button → Radix Dialog)
- Markup: `<button aria-label="Shopping cart" aria-haspopup="dialog" aria-expanded="false">`
- Opens a `[role=dialog][data-state=open]` overlay (sheet/drawer pattern)
- **H1 (inside drawer):** "Shopping Cart"
- **Empty state (icon + text):** *"Your cart is empty"*
- **CTA button:** **"Browse Peptides"** (routes to /shop)
- **Close button:** labeled "Close"
- Populated-state structure not visible (cart is empty on first visit), but standard Radix Dialog pattern implies: line items with image + name + size + qty stepper + remove, then subtotal + checkout CTA.

#### Search (header input)
- **Desktop:** persistent input in header, placeholder `"Search peptides..."`
- **Mobile:** search icon opens a drop-down input with same placeholder
- **Behavior:** routes via form submit to `/shop?q={term}` — confirmed by schema's `SearchAction` target and by the absence of any autocomplete dropdown / listbox / popper markup in the rendered DOM. **No live autocomplete. No command palette. Plain GET route.**

### 1.7 Footer legal disclaimer (4 paragraphs — exact)

This is the single most important block of copy on the site for compliance purposes. Rendered in muted gray at the bottom of every page:

> **Para 1:** *"All products sold by Peptide Foundry are intended strictly for research, laboratory, and analytical purposes only. Products are not for human consumption of any kind and are not approved by the U.S. Food and Drug Administration (FDA) for human or medical use. Under no circumstances should any product be used for purposes other than research."*
>
> **Para 2:** *"The statements made on this website have not been evaluated by the FDA. The products offered by Peptide Foundry are not intended to diagnose, treat, cure, or prevent any disease."*
>
> **Para 3:** *"Peptide Foundry is not a compounding pharmacy or chemical compounding facility as defined under 503A of the Federal Food, Drug, and Cosmetic Act, nor an outsourcing facility as defined under 503B."*
>
> **Para 4:** *"By purchasing or using any product from Peptide Foundry, you acknowledge and agree that you will use them solely in accordance with all applicable federal, state, and local laws and regulations, and that you accept full responsibility for their use."*

And the /about page carries an additional inline disclaimer block:

> *"For Research Use Only. All products sold by Peptide Foundry are intended strictly for laboratory research and educational purposes. They are not intended for human or animal consumption, therapeutic use, or any diagnostic procedures. By purchasing from Peptide Foundry, you acknowledge that these products will be used solely in a research setting by qualified professionals."*

### 1.8 Age-gate checkbox (exact)

> *"I confirm that I am a qualified researcher or institutional professional, that all products purchased are strictly for lawful Research Use Only (not for human or animal use, clinical, diagnostic, or therapeutic purposes), and that I accept full responsibility for compliance with all applicable laws and regulations. I assume all risks associated with handling research materials and agree to hold the company harmless from any claims or liabilities."*

---

## Part 2 — Phase One Labz Track B Spec (PF → PHL mapping)

### 2.1 What Track B actually is

Track B = **rebuild the homepage + ship 4 new routes + apply compliance copy everywhere + swap in the real 16-SKU catalog + reframe the quiz + rebuild the footer with exact legal copy.**

**In scope:**
- Homepage section rewrite (copy + structure to match PF pattern)
- `/shop` route (new)
- `/about` route (new)
- `/contact` route (new)
- `/faq` route (new — separated from the homepage FAQ section, since PF has it as a footer link)
- Cart drawer component (new — Radix Dialog, empty state, matches PF pattern)
- Header search input routing to `/shop?q={term}` (no autocomplete — phase 2)
- Real 16-SKU catalog in `lib/constants.ts` (expand from the current 4)
- Footer rebuild (exact compliance disclaimer adapted)
- Labz Club waitlist page + nav CTA
- Quiz compliance reframe (goals → pathways)
- Legal pages stubs: Privacy, Terms, Refund, Shipping — draft copy, lawyer review before launch

**Out of scope (Track D/E, not blocking Track B):**
- Actual age-gate + auth (Track D — Supabase Auth)
- Stripe checkout (Track D — waiting on processor decision)
- Product detail pages (separate track — Track C, after Track B)
- Product photos (Content queue — gated on Gemini API key for Nano Banana Pro)
- Hero video (Content queue — gated on Gemini API key for VEO)

### 2.2 Copy adaptation table — PF → PHL (name + brand swap)

Every piece of PF copy below is the **source**. The PHL column is what actually ships. No direct plagiarism — all copy rewritten to preserve voice/structure but swap brand, compound references, and (where needed) California-beaches palette tone.

| Location | PF copy (source) | PHL copy (ship) |
|---|---|---|
| Hero H1 | Research-Grade *Peptides* | Research-Grade *Peptides* (keeping the italic primary-accent pattern — same words, different palette) |
| Hero subhead | "Quality peptides for research. Third-party tested, comprehensive COAs." | "USA-manufactured research peptides with comprehensive Certificates of Analysis. Independent third-party purity, heavy-metal, and endotoxin panels on every lot." (already shipped in Track A) |
| Hero CTA | "Join The Foundry Club" | "Join the Labz Club" (waitlist) + "Browse Catalog" (primary, already shipped) + "Find Your Research Pathway" (quiz secondary, already shipped) |
| Trust strip H2 | "Research-Grade Quality, *Every Batch*" | "Research-Grade Quality, *Every Lot*" |
| Trust strip para 1 | "Every peptide we offer is manufactured in the USA and undergoes rigorous, multi-panel testing before it reaches your lab. We partner with independent, third-party laboratories so you never have to question what's in the vial." | "Every peptide in our catalog is synthesized in a US GMP-certified facility and put through rigorous multi-panel testing before it's released. We partner with independent third-party laboratories so you never have to guess what's in the vial." |
| Trust strip para 2 | "Full Certificates of Analysis are published for every product and every lot. Our manufacturer tests for heavy metal contamination, and we independently verify peptide purity and endotoxin levels. No shortcuts, no exceptions." | "Full Certificates of Analysis are published for every product and every lot. Our manufacturer screens for heavy metal contamination, and we independently verify peptide purity and endotoxin levels on every batch. No shortcuts, no exceptions." |
| 3 test toggles | Purity Tested / Heavy Metal Tested / Endotoxin Tested | Same labels (these are descriptive, not brand copy) |
| Feature card 1 | "Free 2-Day Shipping" — "Same-day dispatch before 3 PM ET on every order, nationwide." | "Free 2-Day Shipping" — "Same-day dispatch before 3 PM ET on every order. US nationwide." **(⚠️ Pending client confirmation — see `client-asset-needs.md` P0 item 7)** |
| Feature card 2 | "Manufactured, Tested & Shipped in the USA" — "GMP-certified facility. Every batch independently verified." | "Manufactured, Tested & Shipped in the USA" — "GMP-certified facility. Every lot independently verified." |
| Shop H1 | "Shop All Peptides" | "Research Catalog" |
| Shop subhead | "Browse our complete catalog of USA-manufactured research peptides. Every product is synthesized in GMP-certified facilities with third-party purity verification and published Certificates of Analysis. All orders include free 2-day shipping within the United States." | "Browse our complete catalog of USA-manufactured research peptides. Every product is synthesized in GMP-certified facilities with third-party purity verification and published Certificates of Analysis. All orders include free 2-day shipping within the United States." (nearly identical — this paragraph is pure compliance fact, no brand voice) |
| About eyebrow | "OUR STORY" | "OUR STORY" |
| About H1 | "Built by Curiosity, Driven by Quality" | "Built for Rigor, Priced for Discovery" |
| About opening para 1 | "Peptide Foundry was founded by a team passionate about advancing peptide science. What began as a fascination with biochemistry and molecular signaling became a mission: to provide researchers with the highest-quality peptide materials at accessible prices." | "Phase One Labz was founded on a simple frustration: that researchers working on some of the most important questions in biology shouldn't have to compromise between purity and cost. What started as a search for a better supplier became a commitment — to deliver research peptides with the quality a lab deserves and the transparency a scientist expects." |
| About para 2 | "As a family-owned and operated company, we hold ourselves to a higher standard. Every product we carry is selected for its research value, rigorously tested by independent laboratories, and backed by full documentation. We believe researchers deserve materials they can trust, without the markup." | "We hold ourselves to a higher standard than a distributor. Every product in our catalog is selected for its research value, rigorously tested by independent laboratories, and backed by full documentation. We believe researchers deserve materials they can trust — without the markup." |
| About pullout | "Our mission is simple: provide research-grade peptides with full transparency, rigorous third-party testing, and pricing that doesn't gatekeep scientific discovery." | "Our mission is simple: research-grade peptides with full transparency, rigorous third-party testing, and pricing that doesn't gatekeep discovery." |
| Value card: Scientific Rigor | "Every peptide undergoes multi-panel third-party testing. We publish Certificates of Analysis for every product and every lot. No exceptions." | Same — this copy is pure compliance fact |
| Value card: Family Operated | "We're not a faceless distributor. Peptide Foundry is family-owned, and every order is handled with the care and accountability that comes with it." | "We're not a faceless distributor. Phase One Labz is independently owned, and every order is handled with the care and accountability that comes with it." *(or "Independently Operated" if not family-run — needs client input)* |
| Value card: Accessible Pricing | "Quality research materials shouldn't break the budget. We keep our margins fair so more labs and researchers can access what they need." | Same |
| Value card: US Manufactured | "Every peptide we carry is synthesized in a GMP-certified facility based in the United States, ensuring consistent quality and regulatory compliance." | Same |
| Testing H2 subhead | "Every batch is independently tested before it's made available. Here's exactly what we screen for." | Same |
| Testing card: Purity (HPLC) | "High-performance liquid chromatography confirms peptide identity and purity levels. Each COA reports exact purity percentages so you know precisely what you're working with." | Same — compliance fact |
| Testing card: Endotoxins (LAL) | (full text in §1.4) | Same |
| Testing card: Heavy Metals (MS) | (full text in §1.4) | Same |
| Labz Club H3 | "The Foundry Club" | "The Labz Club" |
| Labz Club subhead | "Unlock wholesale pricing on all peptides with our exclusive membership. Priority support, early access to new products, and more." | "Wholesale pricing on every peptide in our catalog. Priority support, early access to new research compounds, and a private channel for serious researchers. **Joining phase 1 as a waitlist — we'll notify founding members when enrollment opens.**" |
| Labz Club (/about version — longer) | (full text in §1.4) | "Think of it as a membership for serious researchers. Labz Club members unlock wholesale pricing on every peptide in our catalog, get priority order handling, and receive early access to new products as they're released. More than a discount, it's a community of curious minds who share a passion for discovery. Members connect to discuss their research, exchange insights, and stay at the forefront of peptide science." |
| Contact H1 | "Contact Us" | "Contact Us" |
| Contact subhead | "Have questions about peptides or our process? Reach out to our support team, and we'll respond within 24 hours." | "Have questions about our catalog, COAs, or process? Reach out to our support team — we'll respond within 24 hours." |
| Contact form labels/placeholders | Name / Your full name — Email / your@email.com — Message / Tell us how we can help... | Same |
| Contact submit | "Send Message" | "Send Message" |
| Cart drawer H1 | "Shopping Cart" | "Your Cart" (slightly more personal) |
| Cart empty state | "Your cart is empty" | "Your cart is empty" |
| Cart empty CTA | "Browse Peptides" | "Browse Catalog" |
| Cart close | "Close" | "Close" |
| Search placeholder | "Search peptides..." | "Search peptides..." |
| Tagline (footer col 1) | "Research-grade peptides for scientific discovery" | "Research-grade peptides for scientific discovery" |
| Footer legal para 1 | (full text in §1.7) | *"All products sold by Phase One Labz are intended strictly for research, laboratory, and analytical purposes only. Products are not for human consumption of any kind and are not approved by the U.S. Food and Drug Administration (FDA) for human or medical use. Under no circumstances should any product be used for purposes other than research."* |
| Footer legal para 2 | (full text in §1.7) | *"The statements made on this website have not been evaluated by the FDA. The products offered by Phase One Labz are not intended to diagnose, treat, cure, or prevent any disease."* |
| Footer legal para 3 | (full text in §1.7) | *"Phase One Labz is not a compounding pharmacy or chemical compounding facility as defined under 503A of the Federal Food, Drug, and Cosmetic Act, nor an outsourcing facility as defined under 503B."* |
| Footer legal para 4 | (full text in §1.7) | *"By purchasing or using any product from Phase One Labz, you acknowledge and agree that you will use them solely in accordance with all applicable federal, state, and local laws and regulations, and that you accept full responsibility for their use."* |
| Age-gate checkbox | (full text in §1.8) | *"I confirm that I am a qualified researcher or institutional professional, that all products purchased are strictly for lawful Research Use Only (not for human or animal use, clinical, diagnostic, or therapeutic purposes), and that I accept full responsibility for compliance with all applicable laws and regulations. I assume all risks associated with handling research materials and agree to hold the company harmless from any claims or liabilities."* (same — this is legal boilerplate, safe to reuse verbatim) |

**Voice note:** PF's voice is "serious researcher / family shop / no corners cut." We adapt it to "serious researcher / independent lab / transparent and modern" — slightly more tech-forward, slightly less family-warm. The California beaches palette supports this naturally because it reads cleaner and more clinical-modern than PF's warm earth tones.

### 2.3 Product copy — 16 SKUs (final scientific-technical descriptions)

All descriptions follow the PF formula: `{Studied|Researched|Investigated} for {pathway/mechanism}`. No outcomes. No claims. No dosage guidance. Mechanism + pathway only.

| # | SKU Code | Display Name | Size | Price | Description |
|---|---|---|---|---|---|
| 1 | `PHL-BPC157-10` | BPC-157 | 10mg | $65 | Pentadecapeptide studied for tissue repair and GI pathway modulation |
| 2 | `PHL-TB500-10` | TB-500 | 10mg | $75 | Synthetic Thymosin Beta-4 fragment researched for actin-binding and cell migration pathways |
| 3 | `PHL-BPCTB-20` | BPC-157 + TB-500 | 20mg | $120 | Combined peptides researched for tissue regeneration pathway studies *(Blend)* |
| 4 | `PHL-GHKCU-50` | GHK-Cu | 50mg | $60 | Copper tripeptide complex studied for extracellular matrix and collagen pathway research |
| 5 | `PHL-KPV-10` | KPV | 10mg | $60 | α-MSH C-terminal tripeptide researched for NF-κB pathway modulation |
| 6 | `PHL-CJCIPA-5` | CJC-1295 + Ipamorelin (No DAC) | 5/5mg | $85 | GHRH analog paired with GHRP; researched for pulsatile GH pathway activity *(Blend)* |
| 7 | `PHL-TESA-10` | Tesamorelin | 10mg | $110 | Synthetic GHRH analog studied for lipogenesis pathway research |
| 8 | `PHL-MOTSC-10` | MOTS-c | 10mg | $125 | Mitochondrial-derived peptide researched for AMPK pathway activity |
| 9 | `PHL-LIPOC-10` | LIPO-C + B12 (Methylated) | 10mg | $50 | Methionine / inositol / choline + methylcobalamin research compound *(Blend)* |
| 10 | `PHL-RETA-10` | Retatrutide (ION-3R) | 10mg | $170 | Triple-receptor agonist (GLP-1 / GIP / glucagon) researched for metabolic pathway studies |
| 11 | `PHL-RETA-20` | Retatrutide (ION-3R) | 20mg | $320 | Same compound, larger research fill |
| 12 | `PHL-MLT2-10` | MLT II | 10mg | $45 | Synthetic α-MSH analog studied for MC1R/MC4R receptor pathway research |
| 13 | `PHL-GLOW-70` | GLOW | 70mg | $135 | Regenerative blend: GHK-Cu 50mg + BPC-157 10mg + TB-500 10mg *(Blend)* |
| 14 | `PHL-KLOW-80` | KLOW | 80mg | $155 | Regenerative blend: GHK-Cu 50mg + KPV 10mg + BPC-157 10mg + TB-500 10mg *(Blend)* |
| 15 | `PHL-BACH-30` | Bacteriostatic Water (Hospira) | 30ml | $20 | Hospira-brand bacteriostatic water, 0.9% benzyl alcohol preservative |
| 16 | `PHL-BAC-10` | Bacteriostatic Water | 10ml | $10 | Bacteriostatic water, 0.9% benzyl alcohol preservative |

**Per-product badge:** *"All products currently listed on this site are for research purposes only."* (required by client compliance doc; appears above or below each product card)

### 2.4 Homepage section order (final)

Matches the PF structural pattern, subtracts PF sections that are compliance violations (benefits/testimonials were already deleted in Track A), adds the Labz-unique quiz block, and uses the California beaches palette.

1. **Navbar** — already rebuilt in Option 1. No change.
2. **Hero** — already rebuilt in Track A. No change.
3. **Trust strip** — NEW (Track B). Sticky 2-col: left has 3 test toggles + H2 + 2 paragraphs (copy in §2.2). Right has a placeholder for an illustrated vial (replaced with Nano Banana Pro output once key arrives).
4. **Feature cards** — NEW (Track B). 2 cards: 2-Day Shipping + US-Made. Matches PF pattern, hexagon watermarks.
5. **Research Pathway Quiz promo block** — NEW. 1-section CTA featuring the reframed quiz. "Find the research pathway for your next study."
6. **Catalog by research group** — NEW. Replace the current flat 4-product `Products` section with 6 horizontal-scroll carousels (one per research group from §2.3 / §16.5 of catalog).
7. **Science / Testing** — rewrite the existing `science.tsx` to match PF's 3-card testing pattern (Purity HPLC / Endotoxins LAL / Heavy Metals MS). Copy from §1.4.
8. **Labz Club waitlist block** — NEW. Slate-brand dark block, hexagon icon, H3 + paragraph + waitlist email input + CTA "Join the Waitlist".
9. **FAQ** — rewrite existing accordion with compliance-safe Q&As (see §2.7).
10. **Footer** — rebuild with PF 5-col structure, full 4-paragraph legal disclaimer (adapted in §2.2), exact legal page links.

**Removed from current MVP** (compliance or redundancy):
- SocialProof section ("10K+ Customers Served" → violation, see §2.6)
- HowItWorks section ("Start Your Protocol" → violation)
- FinalCTA section ("Ready to Optimize?" → violation; functionally replaced by the Labz Club block)

### 2.5 New routes (Track B)

| Route | Type | Description |
|---|---|---|
| `/` | existing | homepage (rebuilt per §2.4) |
| `/shop` | NEW | full catalog, 4-col grid, no filters, matches PF pattern. Consumes the 16-SKU list from `lib/constants.ts`. Query param `?q=` filters by name (simple includes match). |
| `/about` | NEW | single-page story, copy from §2.2, no images (matches PF's text-only approach for compliance safety) |
| `/contact` | NEW | 2-section layout, email + form, copy from §2.2 |
| `/faq` | NEW | dedicated FAQ page — same accordion as homepage section but standalone. Linked from footer. |
| `/quiz` | NEW | standalone research-pathway quiz route (in addition to the homepage modal version) |
| `/labz-club` | NEW | waitlist signup with the full Labz Club copy from §1.4 adapted |
| `/privacy-policy` | NEW stub | boilerplate privacy policy, lawyer review required before launch |
| `/terms-of-service` | NEW stub | same |
| `/refund-policy` | NEW stub | research chemicals typically non-returnable — specific language |
| `/shipping-policy` | NEW stub | Free 2-day claim + fulfillment details (⚠️ pending client confirmation) |

Deferred to Track C (not in Track B):
- `/shop/[slug]` — 16 individual product detail pages (heavy — needs its own track after Track B)
- `/sign-in` + age-gate modal (Track D — Supabase Auth)
- `/dashboard` + `/dashboard/orders` (Track D — auth-gated)
- `/cart` page (phase 1 uses the drawer only — no separate route needed)
- `/checkout` (Track D — waiting on payment processor)

### 2.6 Compliance audit of existing MVP copy (violations to delete/rewrite)

| Location | Current copy | Violation | Action |
|---|---|---|---|
| `social-proof.tsx` | "10K+ Customers Served" | consumer language | Delete or rewrite as "10K+ COAs published" / "200+ Lots tested" |
| `social-proof.tsx` | "50+ Peptide Formulas" | fine | Keep (or soften to "Research Catalog") |
| `social-proof.tsx` | "99.9% Purity" | fine | Keep — relabel "HPLC-verified purity" |
| `social-proof.tsx` | "USA Lab Tested" | fine | Keep |
| `how-it-works.tsx` step 3 | "Start Your Protocol" | "protocol" banned | Delete whole section or rewrite: "Place Your Order" / "Open Your COA" |
| `how-it-works.tsx` subhead | "Get matched with your ideal peptide protocol" | banned | "Explore research pathways across our catalog" |
| `how-it-works.tsx` step 2 | "Get Your Profile — Receive your personalized Peptide Profile" | "personalized" implies human use | "See Your Pathway — Review the research literature and category matches" |
| `science.tsx` h2 | "Pharmaceutical-Grade Quality Assurance" | "pharmaceutical" implies drug | Rewrite: "Research-Grade Quality Assurance" |
| `final-cta.tsx` h2 | "Ready to *Optimize*?" | "optimize" = wellness claim | **Delete entire section.** Replaced by the Labz Club block in the new homepage flow. |
| `final-cta.tsx` subhead | "Discover your personalized peptide profile" | "personalized" | N/A — section deleted |
| `footer.tsx` tagline | "for the modern biohacker" | **critical violation — influencer/lifestyle marketing explicitly banned** | Rewrite to "Research-grade peptides for scientific discovery" (matches PF) |
| Quiz archetypes | Recovery / Performance / Longevity / Weight Management | all banned claim categories | Reframe as research pathways (§2.8) |

Action: delete `social-proof.tsx`, `how-it-works.tsx`, `final-cta.tsx` entirely. Rewrite `science.tsx`. Rewrite `footer.tsx`. Reframe quiz data.

### 2.7 FAQ (compliance-safe, 8 Q&As)

Drafted by Buff, lawyer-reviewable, research-framed only:

1. **Q:** What does "research use only" actually mean?
   **A:** All peptides in our catalog are sold strictly for laboratory, academic, and institutional research. They are not intended for human or animal consumption, therapeutic use, or any diagnostic purpose, and are not FDA-approved for medical use. By purchasing, you agree to use them only in a research setting.

2. **Q:** What is a Certificate of Analysis?
   **A:** A Certificate of Analysis (COA) is a document produced by an independent laboratory that confirms a peptide's identity, purity, and screening results. Every product we carry ships with a COA covering HPLC purity, LAL endotoxin, and mass-spec heavy metal panels. You can download any COA from the product detail page before purchase.

3. **Q:** What testing methods do you use?
   **A:** We use the three standard research-grade panels: HPLC for purity and identity, LAL for bacterial endotoxin, and mass spectrometry for heavy metals. Every lot is tested independently by third-party labs before it's released for sale.

4. **Q:** Where are your peptides manufactured?
   **A:** Every peptide in our catalog is synthesized in a GMP-certified facility located in the United States. We do not source from overseas suppliers.

5. **Q:** How does shipping work?
   **A:** Orders placed before 3 PM ET ship same-day via USPS / UPS / FedEx 2-day service within the continental United States. Shipping is free on all orders. *(⚠️ Pending client confirmation — see client-asset-needs.md P0 item 7.)*

6. **Q:** Do you ship internationally?
   **A:** No. We currently ship only within the United States.

7. **Q:** Can I return a product?
   **A:** Due to the nature of research chemicals, all sales are final once an order ships. If a product arrives damaged or mislabeled, contact support within 48 hours and we will replace it.

8. **Q:** What is the Labz Club?
   **A:** The Labz Club is our membership program for serious researchers. Members get wholesale pricing on every product in our catalog, priority order handling, and early access to new research compounds. We are currently building the founding-member waitlist — join to be notified when enrollment opens.

### 2.8 Quiz reframe — research pathway selector

**Before (violation):** 5 questions → archetype (Recovery / Performance / Longevity) → product recommendations based on personal goal.

**After (compliant):** 5 questions → research pathway identification → catalog matches based on published pathway literature. Same UX, same conversion flow, zero compliance risk.

**New question set (draft, lawyer-reviewable):**

1. *"Which of the following best describes your current research focus?"*
   - Tissue repair and regeneration
   - Metabolic pathway modulation
   - GH secretagogue activity
   - Cellular senescence and telomerase
   - Neurological / melanocortin signaling
   - Not sure yet — exploring options

2. *"Are you investigating single peptides or combination formulations?"*
   - Single peptides only
   - Combination blends
   - Both

3. *"Which testing rigor level do you require?"*
   - Standard third-party COA (HPLC + LAL + MS)
   - Extended panels (need custom testing — contact support)

4. *"What fill size matches your protocol?"*
   - Research-scale (5–10mg per vial)
   - Lab-scale (20mg+ per vial)
   - Either

5. *"What's your timeline?"*
   - Ready to order
   - Comparing suppliers
   - Early-stage planning

**Result screen:** "Your research pathway: **{pathway name}**. Compatible peptides in our catalog:" + list of 3–6 SKUs from that research group with scientific-pathway descriptions (no personal recommendations, no dosage, no "your ideal" language).

---

## Part 3 — Content generation queue (Nano Banana Pro + VEO)

**Gated on:** Gemini API key (Colin to provide).

**Existing skill:** `nano-banana-pro` skill is already available in Buff's skill library. VEO is available via the Gemini API with the same key.

### 3.1 Images to generate (16 SKUs + supporting)

**Style guide for all product shots:**
- Consistent vial template: amber/clear glass research vial, minimalist white label with black sans-serif text
- Backdrop: soft neutral gradient matching the California beaches palette (white/off-white base with subtle pastel-orange or sky-blue glow)
- Lighting: soft diffuse, single primary light from upper-left, subtle rim light
- Style: "editorial product photography, pharmaceutical research lab aesthetic, minimal, clean, clinical but warm, shallow depth of field"
- Size: 1024×1024 square, PNG with transparency (or white bg)
- Naming: `/products/{sku-code}.png` in `public/`

| # | SKU | Label text on vial | Notes |
|---|---|---|---|
| 1–5 | Regenerative group (BPC-157, TB-500, BPC+TB, GHK-Cu, KPV) | Compound name + mg | All same vial template |
| 6–7 | GH group (CJC+Ipa, Tesamorelin) | Compound name + mg | Same template |
| 8–11 | Metabolic group (MOTS-c, LIPO-C+B12, Retatrutide ×2) | Compound + mg | Retatrutide 20mg subtly larger |
| 12 | Melanocortin (MLT II) | "MLT II 10mg" | Same template |
| 13 | GLOW | "GLOW 70mg" + small "Regenerative Blend" | Same template |
| 14 | KLOW | "KLOW 80mg" + small "Regenerative Blend" | Same template |
| 15 | Bac Water Hospira | "Bacteriostatic Water 30ml" + Hospira callout | Slightly different — larger vial |
| 16 | Bac Water generic | "Bacteriostatic Water 10ml" | Small generic vial |

**Additional product-support imagery (3 images):**

- Hero background still (if VEO video isn't ready): wide cinematic lab bench shot with warm natural light, research vials out of focus in background, depth of field, California beaches palette gradient wash. `/hero-poster.webp`.
- Trust strip illustration: stylized single vial in front view with microscope + molecular structure overlay, pastel orange primary, matches brand palette. Replaces PF's canvas-rendered vial. `/trust-vial.webp`.
- Research pathway quiz section illustration: abstract molecular-pathway graph/diagram in pastel blues and orange, editorial science-editorial style. `/quiz-pathway-illustration.webp`.

**Total image generation jobs: 16 product shots + 3 supporting = 19 images.** All batchable in a single Nano Banana Pro skill run once the key is in.

### 3.2 Video to generate (VEO)

**Hero video:** 6–8 second looping clip. Prompt draft:

> "Slow dolly-in on a research laboratory bench. Shallow depth of field, soft warm natural window light from the left. In the foreground: three amber research vials with minimal white labels, slightly out of focus. Background: a microscope eyepiece and blurred pipette rack bokeh. Subtle atmospheric dust motes drifting through the light beam. Cinematic, editorial, serene, modern-clinical. 6 seconds, loopable, 1920×1080, warm color grade with pastel orange and sky blue highlights."

Output: `/hero-bg.webm` (VEO outputs MP4; convert to webm via ffmpeg).
Size: ~2–5 MB targeted; must loop seamlessly.
Fallback: the `/hero-poster.webp` still (from §3.1) renders while video loads, and replaces video entirely on mobile to save bandwidth.

### 3.3 Batch execution plan (when key arrives)

1. Save Gemini API key to `.env.local` (gitignored) under `GEMINI_API_KEY=...`
2. Run Nano Banana Pro skill once with a batch manifest of all 19 image jobs → outputs to `/public/products/` and `/public/`
3. Run a separate VEO job for the hero video → outputs to `/public/hero-bg.webm`
4. Update `lib/constants.ts` catalog entries to reference the new image paths
5. Drop the hero video into `hero.tsx` (restore the PF video-bg pattern)
6. Visual verify via Browser skill

**Estimated time:** 2–3 hours of batched runs + verification. Batch is idempotent — can be re-run to iterate on prompts.

---

## Part 4 — What Colin needs to decide / provide

| Item | Blocker level | Needs |
|---|---|---|
| **Gemini API key** | unblocks content gen (3 hours of batched work) | Paste the key — Buff will save to `.env.local` |
| **Retatrutide confirmation** | unblocks product detail copy for 2 SKUs | 5-second client confirmation: "yes it's Retatrutide" or "no it's X" |
| **GLOW/KLOW ingredient confirmation** | unblocks product detail copy for 2 SKUs | 5-second client confirmation that the math-verified industry-standard formulations are correct |
| **Free 2-day shipping claim** | unblocks hero + feature card + FAQ + shipping policy | Client confirmation that "2-day shipping, 3 PM ET cutoff" is real, or adjusted wording |
| **Business address + support email** | unblocks footer + contact page | Legal business name, mailing address, support email |
| **"Family operated" or "Independently operated"** | unblocks About page value card | Client input on framing |
| **Payment processor status update** | unblocks Track D (not Track B) | Current state of processor selection |

Nothing in this list blocks Track B code work from starting **right now**. All of it can be swapped in later via simple text changes + Supabase seed updates.

---

## Part 5 — Track B execution order (recommended)

When Colin says "go," I recommend this sequence:

1. **Expand `lib/constants.ts`** — replace the 4 hardcoded products with all 16 SKUs (§2.3), add `researchGroups` map for the 6 category carousels, add new FAQ content (§2.7), add new quiz questions (§2.8), rewrite tagline and footer data.
2. **Rebuild `components/sections/products.tsx`** as `catalog.tsx` — consumes research groups, renders 6 horizontal-scroll carousels with placeholder vial images (text label boxes until Nano Banana output arrives).
3. **Rebuild `components/sections/science.tsx`** — 3-card PF testing pattern, scientific copy from §1.4.
4. **Build `components/sections/trust-strip.tsx`** (new) — 2-col layout, 3 test toggles, H2, 2 paragraphs, placeholder vial illustration, 2 feature cards below.
5. **Build `components/sections/labz-club.tsx`** (new) — slate-brand dark block, hexagon icon, paragraph, email waitlist input, "Join the Waitlist" CTA.
6. **Delete** `social-proof.tsx`, `how-it-works.tsx`, `final-cta.tsx` (all 3 contain violations beyond rescue).
7. **Rewrite `components/sections/faq.tsx`** — 8 compliance-safe Q&As from §2.7.
8. **Rebuild `components/layout/footer.tsx`** — 5-col PF structure, exact 4-paragraph legal disclaimer from §2.2, legal page links, contact info.
9. **Rewrite `app/page.tsx`** — new section order from §2.4.
10. **Build `/shop` route** — `app/shop/page.tsx`, full catalog grid, `?q=` filter.
11. **Build `/about` route** — `app/about/page.tsx`, copy from §2.2.
12. **Build `/contact` route** — `app/contact/page.tsx`, form from §2.2, wire to Supabase `contact_submissions` table (or stub to `console.log` until Supabase is live).
13. **Build `/faq` route** — `app/faq/page.tsx`, reuses FAQ component.
14. **Build `/labz-club` route** — `app/labz-club/page.tsx`, full Labz Club copy + waitlist form.
15. **Build `/quiz` route** — `app/quiz/page.tsx`, standalone version of the reframed quiz modal.
16. **Stub legal pages** — `app/privacy-policy/`, `app/terms-of-service/`, `app/refund-policy/`, `app/shipping-policy/` — boilerplate each, lawyer review before launch.
17. **Build cart drawer component** — `components/cart/cart-drawer.tsx`, Radix Dialog, empty state + stub line items (no checkout logic yet).
18. **Wire header search** — `navbar.tsx` search input routes to `/shop?q={term}` on submit (already the pattern PF uses).
19. **Reframe quiz data** — `components/quiz/quiz-data.ts`, new pathway questions and result screens.
20. **Verify build + browser check** — `pnpm build` + Playwright screenshot walkthrough of every new route.

**Estimated Track B effort:** 1.5–2.5 days of focused work, dominated by content rewriting (not code). Every file I touch is small; the work is breadth, not depth.

---

## Part 6 — What's NOT in Track B

Out of scope, tracked separately:

- **Product detail pages** (`/shop/[slug]`) — Track C. 16 pages, each with an ingredients table (for blends), COA download link, scientific description, mechanism diagram (optional). Should ship after Track B so the shop page links are live.
- **Supabase backend** — Track D. Schema, seed, auth, checkout. Gated on payment processor decision.
- **Actual age-gate + auth** — Track D. Phase 1 ships without the age gate; phase 2 adds it once Supabase Auth is live.
- **Stripe / payments** — Track D. Gated on processor decision.
- **Product photos + hero video** — Content queue. Gated on Gemini API key.
- **Lawyer review of legal copy** — non-engineering. Blocks launch but not development.

---

**End of spec.** This doc + [`2026-04-11-peptidefoundry-teardown-and-merge-plan.md`](./2026-04-11-peptidefoundry-teardown-and-merge-plan.md) + [`client-asset-needs.md`](./client-asset-needs.md) together are the complete reference for executing everything from Track B through launch.
