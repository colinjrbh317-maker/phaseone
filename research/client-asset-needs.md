# Client Asset & Context Needs — Phase One Labz

**Purpose:** single source of truth for everything we still need from the client (or need to produce ourselves) to take phase-one-labz to a compliant production launch. Organized by urgency — P0 blocks launch, P1 blocks specific features, P2 is nice-to-have polish.

**Last updated:** 2026-04-11

---

## 🔴 P0 — Blocks launch (must-have)

### 1. Payment processor decision
- **Why blocks:** no processor = no checkout = no revenue on day 1. Phase 1 currently stubs cart without checkout.
- **Ask:** which processor did the client land on? Stripe, Authorize.net, NMI, CornerStone, ePayments, Square (unlikely for this vertical), or a high-risk specialist?
- **What we need once confirmed:** API keys (test + live), webhook signing secret, supported payment methods, chargeback policy, whether the processor requires specific compliance copy on checkout (some high-risk processors do).
- **Our action if deferred:** ship phase 1 with "checkout coming soon — join waitlist" on the cart page, all products purchasable once the processor is wired up in phase 2. Zero rework.

### 2. Legal review of compliance copy
- **Why blocks:** client supplied compliance rules for approval (research-only disclaimer, no human-use framing, etc.). Before launch, all on-site copy must be reviewed by someone who can sign off that it meets those rules — and preferably a lawyer familiar with research-chemical / peptide compliance.
- **Ask:** does the client have counsel already engaged, or do we need a recommendation? Who signs off on the final copy before launch?
- **What we need:** approval on hero copy, product descriptions, FAQ content, about page, footer disclaimer, terms of service, privacy policy, refund policy, shipping policy.

### 3. Business entity + contact info
- **Why blocks:** required for footer, legal pages, structured data, receipts, support emails.
- **Ask:**
  - Legal business name (e.g., "Phase One Labz LLC")
  - Business address (for footer — even a PO box works)
  - Support email address (needs to be set up on the client's domain — `support@phaseonelabz.com` or similar)
  - Customer service phone (optional but increases trust — toll-free or Google Voice works)
  - EIN (only needed if we set up Stripe / tax reporting — not needed for site copy)

### 4. Domain + hosting
- **Why blocks:** can't go live without it.
- **Ask:** does the client own `phaseonelabz.com` (or equivalent)? Where is it registered? Are we deploying to Vercel, Netlify, client's existing infra?
- **What we need:** DNS access (or a DNS admin we can work with), SSL cert handling preference (Vercel handles this automatically).

### 5. Product photography (16 SKUs)
- **Why blocks:** product cards and detail pages literally cannot render without images. Placeholder boxes are OK during dev but not for launch.
- **Ask:** does the client have any existing product photography? Raw vial shots, labeled vials, lifestyle (none — lifestyle is a compliance violation anyway)?
- **Options if none exist:**
  - **Option A — Consistent vial template:** one stock photo of a research vial + digital label overlay per SKU. Fastest and cheapest (~1 day in Figma). Looks professional. Recommended for launch.
  - **Option B — Commissioned shoot:** 16 SKUs × real vial × studio lighting. 1–2 weeks + $500–1500 depending on photographer. Higher quality but slower.
  - **Option C — AI-generated:** Midjourney or Nano Banana vial shots with label overlays. Fast, but quality is inconsistent and compliance reviewers may flag as unauthentic. Not recommended.
- **Recommendation:** Option A for launch, Option B as a phase-2 upgrade.

### 6. COA (Certificate of Analysis) PDFs — at least 1 per SKU
- **Why blocks:** the entire trust narrative of the site (purity tested, heavy-metal tested, endotoxin tested, third-party verified) collapses if we don't have COAs to actually link to. Compliance-sensitive visitors will look.
- **Ask:** does the client have COAs from his supplier / testing lab? HPLC purity report, mass spec, heavy metal panel, endotoxin panel — the standard 4.
- **What we need:** one PDF per SKU (ideally per lot, but per SKU is the minimum). Uploaded to Supabase Storage, linked from each product detail page.
- **If the client doesn't have them yet:** site launch cannot include the trust strip as currently designed. Either (a) delay launch until COAs are produced by a lab, or (b) reword the trust strip to aspirational ("Every product third-party tested before release" — no links) and add COAs post-launch. Option (b) is legally riskier.

### 7. Shipping + fulfillment details
- **Why blocks:** the hero promise "Free 2-day shipping" is a commitment, not a decoration.
- **Ask:**
  - Is 2-day shipping real or aspirational? Ground? Express?
  - Who fulfills — client directly, a 3PL, drop-ship from supplier?
  - Same-day cutoff time (Peptide Foundry says "3 PM ET")?
  - Shipping regions (US only? US + territories?)
  - Carrier (USPS, UPS, FedEx)?
  - Packaging — insulated / cold chain needed for any of the 16 SKUs?
  - Return policy — research chemicals are typically non-returnable; confirm wording.
- **What we need:** final shipping policy copy for the shipping policy legal page + hero + checkout.

### 8. Final pricing confirmation
- **Why blocks:** placeholder prices are in the plan doc (see `2026-04-11-peptidefoundry-teardown-and-merge-plan.md` → Catalog → Pricing). Client needs to verify each of the 16 prices against his COGS + margin targets before we seed Supabase with real data.
- **Ask:** review the 16 placeholder prices, adjust, return final list.
- **Our action:** prices are single-query Supabase updates — no code changes needed post-launch.

---

## 🟡 P1 — Blocks specific features (not launch-blocking on their own)

### 9. ION-3R / Retatrutide identity confirmation
- **Why needed:** the plan currently writes ION-3R as **Retatrutide** (LY-3437943) based on the "3R = triple receptor" reasoning. Client said "Retamorelin" but that compound doesn't exist (the `-morelin` suffix is reserved for ghrelin mimetics). Need confirmation.
- **Ask:** is ION-3R Retatrutide? If not, what is it?
- **Impact if wrong:** product page copy on 2 SKUs (Retatrutide 10mg + 20mg) needs a rewrite. Category grouping (Metabolic) stays regardless.

### 10. GLOW / KLOW composition confirmation
- **Why needed:** compositions are inferred from industry-standard blends that happen to mathematically match the 70mg / 80mg fill sizes exactly:
  - GLOW 70mg = GHK-Cu 50mg + BPC-157 10mg + TB-500 10mg
  - KLOW 80mg = GHK-Cu 50mg + KPV 10mg + BPC-157 10mg + TB-500 10mg
- **Ask:** client to confirm or correct. If the formulation is different, the ingredients table on each product detail page is a 2-minute copy change.
- **Impact if wrong:** product detail page ingredient table on 2 SKUs needs updating. Nothing else.

### 11. Logo files
- **Why needed:** `public/logo.png` is 3.1 MB (too big) and PNG (not ideal). Need SVG version for scalability and an inverted/light version for dark surfaces (footer, Labz Club block).
- **Ask:**
  - Original logo design file (Figma, Illustrator, .ai)
  - Or: someone to vectorize the existing PNG (can be done with Figma or Adobe Illustrator auto-trace in ~15 min)
- **What we need:** `logo.svg` (on-white version), `logo-inverted.svg` (on-dark version), `logo-icon.svg` (square icon for favicon + mobile)

### 12. Favicon set
- **Why needed:** browser tab icon, apple touch icon, Android icons, manifest.
- **Ask:** does the client have a brand mark / symbol separate from the full wordmark logo? Or just the wordmark?
- **What we need:** one square asset at 512×512 minimum. We run it through realfavicongenerator.net → produces the full set (favicon.ico, favicon-16/32/48/192/512, apple-touch-icon, site.webmanifest).

### 13. OG / social share card
- **Why needed:** what appears when someone shares a PHL link on iMessage, Slack, Twitter, LinkedIn. Currently would be broken.
- **What we need:** 1200×630 image with logo + tagline + brand visual. Produce from Figma template using the California beaches palette.

### 14. About page content
- **Why needed:** `/about` route is in the plan and linked from nav + footer. Without content, it's a dead link.
- **Ask:**
  - Founder story (compliance-safe — no health journey framing, focus on research standards and lab quality)
  - Facility / lab details (if any)
  - Team (photos + bios optional — photos may introduce compliance risk if they look "lifestyle," stick to lab coats / neutral)
  - Certifications, partnerships, supplier relationships (if publishable)
- **Recommendation:** write this ourselves as a draft from whatever raw facts the client provides, then client edits.

### 15. Contact form destination
- **Why needed:** `/contact` form needs to submit somewhere.
- **Ask:** where should contact form submissions go? Options:
  - Client's support email (simplest — uses a transactional email service like Resend or SendGrid)
  - Supabase table + client checks dashboard
  - Helpdesk integration (Intercom, Crisp, HelpScout — phase 2)
- **Recommendation:** Supabase table + email notification via Resend. Cheap, simple, auditable.

### 16. Newsletter / email marketing provider
- **Why needed:** Labz Club waitlist + any future marketing emails.
- **Ask:** does the client already use Mailchimp, ConvertKit, Klaviyo, Beehiiv, or similar? If not, we pick one.
- **Recommendation:** **Beehiiv** (modern, good free tier, no bloat) or **Resend** (if we just need transactional email, no marketing automation).

### 17. Analytics preferences
- **Why needed:** traffic + behavior tracking post-launch.
- **Default stack (recommend unless client objects):**
  - **Vercel Analytics** — page views, web vitals, free tier (if hosting on Vercel)
  - **Microsoft Clarity** — heatmaps, session replay, free (same service Peptide Foundry uses)
- **Optional:** GA4 if client wants Google-native reporting. No Facebook/Meta pixel — compliance flags lifestyle marketing.

---

## 🟢 P2 — Polish / phase 2 considerations (nice-to-have, not blocking)

### 18. Video hero content
- **Why:** Peptide Foundry's video hero is distinctive. Phase One Labz can ship with a static hero image for phase 1, add video in phase 2.
- **Ask:** does the client have any lab footage? Drone shots of the facility? If not, stock research-lab footage from Artgrid / Envato + warm color grade.
- **Recommendation:** phase 1 launches with static hero image (still beautiful with the California beaches palette + Playfair serif). Video is phase 2.

### 19. Blog content strategy — **DEFERRED**
- Compliance doc explicitly bans blogs that imply human use. A compliant blog would have to be *research literature summaries* — essentially curating and citing published papers on the peptides in our catalog. That's a lot of writing work for uncertain ROI. **Recommendation: defer entirely to phase 3+, maybe never.**

### 20. Affiliate / referral program
- Phase 3. Not touching in phase 1.

### 21. Subscription / auto-refill
- Phase 3. Requires recurring billing setup (tied to payment processor decision).

### 22. Multi-currency / international shipping
- Phase 3. US-only for phase 1.

### 23. Product variants beyond mg size
- Phase 2. Current schema handles the 2 Retatrutide sizes. Adding vial count discounts ("3 for $X") is a phase 2 feature.

### 24. Customer reviews
- **Deferred permanently or rewritten carefully.** Compliance bans testimonials describing outcomes or effects. A compliant "review" would be limited to "arrived on time, well packaged, clear labeling" — which provides almost zero conversion lift. Not worth building.

---

## What I (Buff) can generate / research instead of asking the client

| Item | Status | Notes |
|---|---|---|
| Product descriptions (scientific-technical only) | ✅ Can write for all 16 | Using peer-reviewed literature language, structural class, mechanism, research pathway |
| FAQ (compliance-safe) | ✅ Can draft | Research-framed only: "What is a Certificate of Analysis?", "What does 'research use only' mean?", "What is peptide purity tested for?" |
| About page draft | ✅ Can draft | Need 3–5 raw facts from client, then I write the compliant version |
| Legal pages (privacy, terms, refund, shipping) | ⚠️ Can draft boilerplate, **must be lawyer-reviewed** | Starting from standard e-commerce templates + research-chemical industry modifications |
| Hero + homepage copy | ✅ Can write | Multiple versions to pick from |
| Category descriptions (6 research groups) | ✅ Can write | Scientific framing by pathway |
| Labz Club waitlist copy | ✅ Can write | Research-newsletter framing, no outcome promises |
| Email signup confirmation copy | ✅ Can write | |
| SEO meta tags per page | ✅ Can write | Research-framed only |
| JSON-LD structured data | ✅ Can generate | `Product` schema, no health claims |
| Quiz reframe (pathway selector) | ✅ Can rewrite | Replace archetype/goal framing with research pathway framing |
| 404 / error page copy | ✅ Can write | |
| Sitemap + robots.txt | ✅ Can generate | |

---

## Content / asset production timeline (if client moves fast)

| Item | Who | Effort | Can run in parallel with build |
|---|---|---|---|
| Product photo template + 16 overlays | Buff | 4–6 hours | ✅ |
| Product descriptions (16 SKUs) | Buff | 3–4 hours | ✅ |
| FAQ draft (~10 Q&As, research-framed) | Buff | 1 hour | ✅ |
| About page draft | Buff | 1 hour (after facts from client) | ✅ |
| Legal pages draft (4 pages) | Buff → lawyer review | 2–3 hours (draft) + client legal review | ⚠️ lawyer review is the bottleneck |
| Logo vectorization | Buff or designer | 30 min | ✅ |
| Favicon set | Buff | 15 min | ✅ |
| OG social card | Buff | 30 min | ✅ |
| Hero image (static) | Buff via image gen or stock | 1 hour | ✅ |
| Category background images (6) | Buff via image gen | 1 hour | ✅ |
| COAs | **Client** | Unknown | 🔴 P0 BLOCKER — nothing we can do about this |
| Payment processor decision | **Client** | Unknown | 🔴 P0 BLOCKER |
| Legal review sign-off | **Lawyer** | Unknown | 🔴 P0 BLOCKER |

**Bottom line:** Buff can produce essentially all the content and assets in parallel with the engineering build. The only things that truly block launch are **COAs**, the **payment processor decision**, and **legal sign-off on compliance copy**. Everything else can be drafted, reviewed, and revised on the build timeline.
