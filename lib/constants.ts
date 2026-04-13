/**
 * Phase One Labz — single source of truth for catalog, navigation, copy, and brand data.
 *
 * Compliance notes:
 * - All product descriptions follow the {Studied|Researched|Investigated} for {pathway} formula.
 * - No outcome claims, no dosage guidance, no protocols/cycles/stacks, no human-use implications.
 * - Brand voice: "serious researcher / independent lab / transparent and modern."
 * - Placeholders: [BUSINESS_NAME], [SUPPORT_EMAIL], [BUSINESS_ADDRESS] will be swapped once the
 *   client provides them. See research/client-asset-needs.md P0 item 3.
 */

// -----------------------------------------------------------------------------
// Brand & business metadata (placeholders — client to provide)
// -----------------------------------------------------------------------------

export const brand = {
  legalName: "Phase One Labz LLC", // [BUSINESS_NAME] — pending client confirmation
  shortName: "Phase One Labz",
  tagline: "Research-grade peptides for scientific discovery",
  supportEmail: "support@phaseonelabz.com", // [SUPPORT_EMAIL] — pending client confirmation
  address: {
    street: "[BUSINESS_ADDRESS]", // pending client confirmation
    city: "",
    state: "",
    zip: "",
  },
  foundedYear: 2026,
  responseSLA: "24 hours",
  shippingClaim: "Free 2-day shipping. Same-day dispatch before 3 PM ET.",
  shippingCutoff: "3 PM ET",
  operationsFraming: "Independently operated" as const,
};

// -----------------------------------------------------------------------------
// Research pathway groups (replaces flat "categories")
// -----------------------------------------------------------------------------

export type ResearchGroupId =
  | "regenerative"
  | "gh-secretagogue"
  | "metabolic"
  | "melanocortin"
  | "proprietary-blends"
  | "research-supplies";

export const researchGroups: {
  id: ResearchGroupId;
  name: string;
  tagline: string;
  description: string;
}[] = [
  {
    id: "regenerative",
    name: "Regenerative & Tissue Repair Research",
    tagline: "Tissue repair pathway research",
    description:
      "Peptides researched for extracellular matrix, angiogenesis, and cytoprotection pathway studies.",
  },
  {
    id: "gh-secretagogue",
    name: "GH Secretagogue Research",
    tagline: "Pulsatile GH pathway research",
    description:
      "GHRH analogs and GHRP compounds researched for pulsatile growth-hormone-release pathway activity.",
  },
  {
    id: "metabolic",
    name: "Metabolic & Mitochondrial Research",
    tagline: "AMPK & incretin pathway research",
    description:
      "Compounds researched for AMPK, incretin-receptor, and mitochondrial-signaling pathway studies.",
  },
  {
    id: "melanocortin",
    name: "Melanocortin Pathway Research",
    tagline: "MC1R / MC4R receptor pathway research",
    description:
      "Synthetic α-MSH analogs researched for melanocortin-receptor pathway activity.",
  },
  {
    id: "proprietary-blends",
    name: "Proprietary Research Blends",
    tagline: "Multi-component research formulations",
    description:
      "Combination research blends formulated around regenerative and tissue-repair pathways.",
  },
  {
    id: "research-supplies",
    name: "Research Supplies",
    tagline: "Reconstitution & handling supplies",
    description:
      "Supporting supplies for peptide reconstitution and laboratory handling.",
  },
];

// -----------------------------------------------------------------------------
// Product catalog (16 SKUs)
// -----------------------------------------------------------------------------

export type ProductBadge = "Best Seller" | "Blend" | "New" | "Featured" | null;

export type Product = {
  sku: string; // internal SKU code
  slug: string; // URL slug for /shop/[slug]
  name: string; // display name
  size: string; // e.g., "10mg", "5/5mg", "30ml"
  price: number; // USD, placeholder
  priceDisplay: string; // formatted "$65"
  group: ResearchGroupId;
  description: string; // 1-line scientific-pathway description (PF formula)
  badge: ProductBadge;
  image: string; // path to product image
  disclaimer: string; // required per-product disclaimer
};

const RESEARCH_USE_DISCLAIMER =
  "All products currently listed on this site are for research purposes only.";

export const products: Product[] = [
  // Group 1 — Regenerative & Tissue Repair (5)
  {
    sku: "PHL-BPC157-10",
    slug: "bpc-157",
    name: "BPC-157",
    size: "10 mg",
    price: 65,
    priceDisplay: "$65",
    group: "regenerative",
    description:
      "Pentadecapeptide studied for tissue repair and GI pathway modulation.",
    badge: "Best Seller",
    image: "/products/samples/phl-bpc157-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-TB500-10",
    slug: "tb-500",
    name: "TB-500",
    size: "10 mg",
    price: 75,
    priceDisplay: "$75",
    group: "regenerative",
    description:
      "Synthetic Thymosin Beta-4 fragment researched for actin-binding and cell-migration pathway studies.",
    badge: null,
    image: "/products/phl-tb500-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-BPCTB-20",
    slug: "bpc-157-tb-500",
    name: "BPC-157 + TB-500",
    size: "10 mg / 10 mg",
    price: 120,
    priceDisplay: "$120",
    group: "regenerative",
    description:
      "Combined research peptides investigated for tissue regeneration pathway studies.",
    badge: "Blend",
    image: "/products/samples/phl-bpctb-20.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-GHKCU-50",
    slug: "ghk-cu",
    name: "GHK-Cu",
    size: "50 mg",
    price: 60,
    priceDisplay: "$60",
    group: "regenerative",
    description:
      "Copper tripeptide complex studied for extracellular-matrix and collagen pathway research.",
    badge: null,
    image: "/products/phl-ghkcu-50.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-KPV-10",
    slug: "kpv",
    name: "KPV",
    size: "10 mg",
    price: 60,
    priceDisplay: "$60",
    group: "regenerative",
    description:
      "α-MSH C-terminal tripeptide researched for NF-κB pathway modulation.",
    badge: null,
    image: "/products/phl-kpv-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },

  // Group 2 — GH Secretagogue (2)
  {
    sku: "PHL-CJCIPA-5",
    slug: "cjc-1295-ipamorelin",
    name: "CJC-1295 + Ipamorelin (No DAC)",
    size: "5 mg / 5 mg",
    price: 85,
    priceDisplay: "$85",
    group: "gh-secretagogue",
    description:
      "GHRH analog paired with a GHRP, researched for pulsatile GH-pathway activity.",
    badge: "Blend",
    image: "/products/phl-cjcipa-5.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-TESA-10",
    slug: "tesamorelin",
    name: "Tesamorelin",
    size: "10 mg",
    price: 110,
    priceDisplay: "$110",
    group: "gh-secretagogue",
    description:
      "Synthetic GHRH analog studied for lipogenesis pathway research.",
    badge: null,
    image: "/products/phl-tesa-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },

  // Group 3 — Metabolic & Mitochondrial (4)
  {
    sku: "PHL-MOTSC-10",
    slug: "mots-c",
    name: "MOTS-c",
    size: "10 mg",
    price: 125,
    priceDisplay: "$125",
    group: "metabolic",
    description:
      "Mitochondrial-derived peptide researched for AMPK-pathway activity.",
    badge: null,
    image: "/products/phl-motsc-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-LIPOC-10",
    slug: "lipo-c-b12",
    name: "LIPO-C + B12 (Methylated)",
    size: "10 mg",
    price: 50,
    priceDisplay: "$50",
    group: "metabolic",
    description:
      "Methionine / inositol / choline paired with methylcobalamin for research compound studies.",
    badge: "Blend",
    image: "/products/phl-lipoc-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-RETA-10",
    slug: "retatrutide-10",
    name: "Retatrutide (ION-3R)",
    size: "10 mg",
    price: 170,
    priceDisplay: "$170",
    group: "metabolic",
    description:
      "Triple-receptor agonist (GLP-1 / GIP / glucagon) researched for metabolic pathway studies.",
    badge: "Featured",
    image: "/products/phl-reta-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-RETA-20",
    slug: "retatrutide-20",
    name: "Retatrutide (ION-3R)",
    size: "20 mg",
    price: 320,
    priceDisplay: "$320",
    group: "metabolic",
    description:
      "Triple-receptor agonist (GLP-1 / GIP / glucagon) — larger research fill size.",
    badge: null,
    image: "/products/phl-reta-20.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },

  // Group 4 — Melanocortin (1)
  {
    sku: "PHL-MLT2-10",
    slug: "mlt-ii",
    name: "MLT II",
    size: "10 mg",
    price: 45,
    priceDisplay: "$45",
    group: "melanocortin",
    description:
      "Synthetic α-MSH analog studied for MC1R / MC4R receptor pathway research.",
    badge: null,
    image: "/products/phl-mlt2-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },

  // Group 5 — Proprietary Blends (2)
  {
    sku: "PHL-GLOW-70",
    slug: "glow",
    name: "GLOW",
    size: "70 mg",
    price: 135,
    priceDisplay: "$135",
    group: "proprietary-blends",
    description:
      "Regenerative research blend: GHK-Cu 50 mg + BPC-157 10 mg + TB-500 10 mg.",
    badge: "Blend",
    image: "/products/phl-glow-70.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-KLOW-80",
    slug: "klow",
    name: "KLOW",
    size: "80 mg",
    price: 155,
    priceDisplay: "$155",
    group: "proprietary-blends",
    description:
      "Regenerative research blend: GHK-Cu 50 mg + KPV 10 mg + BPC-157 10 mg + TB-500 10 mg.",
    badge: "Blend",
    image: "/products/phl-klow-80.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },

  // Group 6 — Research Supplies (2)
  {
    sku: "PHL-BACH-30",
    slug: "bacteriostatic-water-hospira-30ml",
    name: "Bacteriostatic Water (Hospira)",
    size: "30 ml",
    price: 20,
    priceDisplay: "$20",
    group: "research-supplies",
    description:
      "Hospira-brand bacteriostatic water with 0.9% benzyl alcohol preservative.",
    badge: null,
    image: "/products/samples/phl-bach-30.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
  {
    sku: "PHL-BAC-10",
    slug: "bacteriostatic-water-10ml",
    name: "Bacteriostatic Water",
    size: "10 ml",
    price: 10,
    priceDisplay: "$10",
    group: "research-supplies",
    description:
      "Bacteriostatic water with 0.9% benzyl alcohol preservative.",
    badge: null,
    image: "/products/phl-bac-10.png",
    disclaimer: RESEARCH_USE_DISCLAIMER,
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export function getProductsByGroup(groupId: ResearchGroupId): Product[] {
  return products.filter((p) => p.group === groupId);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.badge === "Best Seller" || p.badge === "Featured");
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

export const navLinks = [
  { href: "/shop", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "Research FAQ" },
  { href: "/contact", label: "Contact" },
];

// -----------------------------------------------------------------------------
// Stats (compliance-safe — no consumer language)
// -----------------------------------------------------------------------------

export const stats = [
  { value: "16", label: "Research Peptides" },
  { value: "3-Panel", label: "Independent Testing" },
  { value: "COAs", label: "Published Per Lot" },
  { value: "USA", label: "GMP Manufactured" },
];

// -----------------------------------------------------------------------------
// Trust strip — test toggles + copy
// -----------------------------------------------------------------------------

export const testPanels = [
  {
    key: "purity",
    label: "Purity Tested",
    fullName: "Purity (HPLC)",
    body: "High-performance liquid chromatography confirms peptide identity and purity levels. Each COA reports exact purity percentages so you know precisely what you're working with.",
  },
  {
    key: "heavy-metal",
    label: "Heavy Metal Tested",
    fullName: "Heavy Metals (MS)",
    body: "Mass spectrometry detects trace heavy metal contamination. This ensures your research materials are free from lead, mercury, arsenic, and cadmium.",
  },
  {
    key: "endotoxin",
    label: "Endotoxin Tested",
    fullName: "Endotoxins (LAL)",
    body: "Limulus Amebocyte Lysate testing screens for bacterial endotoxins that could compromise research results. We test every lot to ensure levels fall well within acceptable limits.",
  },
];

export const trustStripCopy = {
  h2: "Research-Grade Quality,",
  h2Accent: "Every Lot",
  para1:
    "Every peptide in our catalog is synthesized in a US GMP-certified facility and put through rigorous multi-panel testing before it's released. We partner with independent third-party laboratories so you never have to guess what's in the vial.",
  para2:
    "Full Certificates of Analysis are published for every product and every lot. Our manufacturer screens for heavy metal contamination, and we independently verify peptide purity and endotoxin levels on every batch. No shortcuts, no exceptions.",
  featureCard1: {
    title: "Free 2-Day Shipping.",
    body: "Same-day dispatch before 3 PM ET on every order. US nationwide.",
  },
  featureCard2: {
    title: "Manufactured, Tested & Shipped in the USA.",
    body: "GMP-certified facility. Every lot independently verified.",
  },
};

// -----------------------------------------------------------------------------
// About page
// -----------------------------------------------------------------------------

export const aboutCopy = {
  eyebrow: "OUR STORY",
  h1: "Built for Rigor, Priced for Discovery",
  paraLead:
    "Phase One Labz was founded on a simple frustration: that researchers working on some of the most important questions in biology shouldn't have to compromise between purity and cost. What started as a search for a better supplier became a commitment — to deliver research peptides with the quality a lab deserves and the transparency a scientist expects.",
  paraSecondary:
    "We hold ourselves to a higher standard than a distributor. Every product in our catalog is selected for its research value, rigorously tested by independent laboratories, and backed by full documentation. We believe researchers deserve materials they can trust — without the markup.",
  mission:
    "Our mission is simple: research-grade peptides with full transparency, rigorous third-party testing, and pricing that doesn't gatekeep discovery.",
  valueCards: [
    {
      title: "Scientific Rigor",
      body: "Every peptide undergoes multi-panel third-party testing. We publish Certificates of Analysis for every product and every lot. No exceptions.",
    },
    {
      title: "Independently Operated",
      body: "We're not a faceless distributor. Phase One Labz is independently owned, and every order is handled with the care and accountability that comes with it.",
    },
    {
      title: "Accessible Pricing",
      body: "Quality research materials shouldn't break the budget. We keep our margins fair so more labs and researchers can access what they need.",
    },
    {
      title: "US Manufactured",
      body: "Every peptide we carry is synthesized in a GMP-certified facility based in the United States, ensuring consistent quality and regulatory compliance.",
    },
  ],
  testingSection: {
    h2: "Testing",
    subhead:
      "Every lot is independently tested before it's made available. Here's exactly what we screen for.",
  },
  labzClubH2: "The Labz Club",
  labzClubBody: [
    "Think of it as a membership for serious researchers. Labz Club members unlock wholesale pricing on every peptide in our catalog, get priority order handling, and receive early access to new products as they're released.",
    "More than a discount, it's a community of curious minds who share a passion for discovery. Members connect to discuss their research, exchange insights, and stay at the forefront of peptide science.",
  ],
  labzClubCta: "Join the Labz Club Waitlist",
};

// -----------------------------------------------------------------------------
// Labz Club (waitlist)
// -----------------------------------------------------------------------------

export const labzClubCopy = {
  h3: "The Labz Club",
  subhead:
    "Wholesale pricing on every peptide in our catalog. Priority support, early access to new research compounds, and a private channel for serious researchers. Joining phase 1 as a waitlist — we'll notify founding members when enrollment opens.",
  cta: "Join the Waitlist",
  waitlistPlaceholder: "your@research-email.com",
};

// -----------------------------------------------------------------------------
// Contact
// -----------------------------------------------------------------------------

export const contactCopy = {
  h1: "Contact Us",
  subhead:
    "Have questions about our catalog, COAs, or process? Reach out to our support team — we'll respond within 24 hours.",
  emailSection: {
    h3: "Email Us",
    body: brand.supportEmail,
  },
  formSection: {
    h3: "Send Us a Message",
    body: "Fill out the form below and our team will get back to you shortly.",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      email: { label: "Email", placeholder: "your@email.com" },
      message: { label: "Message", placeholder: "Tell us how we can help..." },
    },
    submit: "Send Message",
    success: "Thanks — your message is in. We'll respond within 24 hours.",
  },
};

// -----------------------------------------------------------------------------
// FAQ (8 compliance-safe Q&As)
// -----------------------------------------------------------------------------

export const faqItems = [
  {
    question: "What does \"research use only\" actually mean?",
    answer:
      "All peptides in our catalog are sold strictly for laboratory, academic, and institutional research. They are not intended for human or animal consumption, therapeutic use, or any diagnostic purpose, and are not FDA-approved for medical use. By purchasing, you agree to use them only in a research setting.",
  },
  {
    question: "What is a Certificate of Analysis?",
    answer:
      "A Certificate of Analysis (COA) is a document produced by an independent laboratory that confirms a peptide's identity, purity, and screening results. Every product we carry ships with a COA covering HPLC purity, LAL endotoxin, and mass-spec heavy metal panels. You can download any COA from the product detail page before purchase.",
  },
  {
    question: "What testing methods do you use?",
    answer:
      "We use the three standard research-grade panels: HPLC for purity and identity, LAL for bacterial endotoxin, and mass spectrometry for heavy metals. Every lot is tested independently by third-party labs before it's released for sale.",
  },
  {
    question: "Where are your peptides manufactured?",
    answer:
      "Every peptide in our catalog is synthesized in a GMP-certified facility located in the United States. We do not source from overseas suppliers.",
  },
  {
    question: "How does shipping work?",
    answer:
      "Orders placed before 3 PM ET ship same-day. All US orders ship free via 2-day service. We currently ship only within the continental United States.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "No. We currently ship only within the United States.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Due to the nature of research chemicals, all sales are final once an order ships. If a product arrives damaged or mislabeled, contact support within 48 hours and we will replace it.",
  },
  {
    question: "What is the Labz Club?",
    answer:
      "The Labz Club is our membership program for serious researchers. Members get wholesale pricing on every product in our catalog, priority order handling, and early access to new research compounds. We are currently building the founding-member waitlist — join to be notified when enrollment opens.",
  },
];

// -----------------------------------------------------------------------------
// Footer — columns + legal disclaimers
// -----------------------------------------------------------------------------

export const footerColumns = [
  {
    heading: "Shop",
    links: [{ href: "/shop", label: "Research Catalog" }],
  },
  {
    heading: "Support",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/about", label: "About Us" },
      { href: "/faq", label: "Research FAQ" },
      { href: "/shipping-policy", label: "Shipping Info" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/sign-in", label: "Sign In" },
      { href: "/sign-up", label: "Create Account" },
      { href: "/dashboard/orders", label: "Order History" },
      { href: "/labz-club", label: "Labz Club" },
    ],
  },
];

export const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
];

/**
 * The full 4-paragraph compliance disclaimer, adapted verbatim from the
 * Peptide Foundry footer (name swapped to Phase One Labz). This is
 * legal-boilerplate copy and must be lawyer-reviewed before launch.
 */
export const footerLegalDisclaimer = [
  "All products sold by Phase One Labz are intended strictly for research, laboratory, and analytical purposes only. Products are not for human consumption of any kind and are not approved by the U.S. Food and Drug Administration (FDA) for human or medical use. Under no circumstances should any product be used for purposes other than research.",
  "The statements made on this website have not been evaluated by the FDA. The products offered by Phase One Labz are not intended to diagnose, treat, cure, or prevent any disease.",
  "Phase One Labz is not a compounding pharmacy or chemical compounding facility as defined under 503A of the Federal Food, Drug, and Cosmetic Act, nor an outsourcing facility as defined under 503B.",
  "By purchasing or using any product from Phase One Labz, you acknowledge and agree that you will use them solely in accordance with all applicable federal, state, and local laws and regulations, and that you accept full responsibility for their use.",
];

// Required per-page footer disclaimer (required by client compliance doc — exact text)
export const requiredFooterDisclaimer =
  "All products sold on this website are intended for research and identification purposes only. These products are not intended for human dosing, injection, or ingestion.";
