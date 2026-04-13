/**
 * Research Pathway Selector — compliance-safe rewrite of the original "peptide archetype quiz."
 *
 * Original design: 5 questions → archetype ("The Optimizer" etc.) → recommendations based on personal goals.
 * Problem: goal language (Recovery / Performance / Longevity / Weight Management / Anti-Aging / Wellness)
 * violates the client compliance rules (no outcome claims, no wellness framing, no lifestyle marketing).
 *
 * This rewrite keeps the same 5-question UX and the same result screen, but reframes the flow as:
 *   "Which research pathway are you investigating?" → research group → catalog matches
 *
 * Same conversion flow, zero compliance risk. No personal goals referenced anywhere.
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; points: Record<string, number> }[];
}

export interface ResearchPathway {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  products: string[]; // Product slugs from lib/constants.ts
  color: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following best describes your current research focus?",
    options: [
      {
        label: "Tissue repair and regeneration",
        value: "regenerative",
        points: { regenerative: 3 },
      },
      {
        label: "Metabolic pathway modulation",
        value: "metabolic",
        points: { metabolic: 3 },
      },
      {
        label: "GH secretagogue activity",
        value: "gh",
        points: { "gh-secretagogue": 3 },
      },
      {
        label: "Melanocortin receptor signaling",
        value: "melanocortin",
        points: { melanocortin: 3 },
      },
      {
        label: "Still exploring — show me the catalog",
        value: "exploring",
        points: { regenerative: 1, metabolic: 1, "gh-secretagogue": 1, melanocortin: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "Are you investigating single peptides or combination formulations?",
    options: [
      {
        label: "Single peptides only",
        value: "single",
        points: { regenerative: 1, metabolic: 1 },
      },
      {
        label: "Combination research blends",
        value: "blends",
        points: { "proprietary-blends": 3 },
      },
      {
        label: "Both — depends on the study",
        value: "both",
        points: { regenerative: 1, "proprietary-blends": 2 },
      },
    ],
  },
  {
    id: 3,
    question: "Which pathway class is most relevant to your current work?",
    options: [
      {
        label: "Cell migration and tissue repair (BPC / TB-500 class)",
        value: "cell-migration",
        points: { regenerative: 3 },
      },
      {
        label: "GLP-1 / GIP / glucagon receptor (metabolic)",
        value: "glp",
        points: { metabolic: 3 },
      },
      {
        label: "GHRH / GHRP (secretagogue)",
        value: "ghrh",
        points: { "gh-secretagogue": 3 },
      },
      {
        label: "Copper peptide / ECM (GHK-Cu class)",
        value: "ecm",
        points: { regenerative: 2, "proprietary-blends": 1 },
      },
      {
        label: "Melanocortin receptor (MC1R / MC4R)",
        value: "mc",
        points: { melanocortin: 3 },
      },
    ],
  },
  {
    id: 4,
    question: "What fill size fits your protocol?",
    options: [
      {
        label: "Research-scale (5–10 mg vials)",
        value: "small",
        points: { regenerative: 1, "gh-secretagogue": 1, melanocortin: 1 },
      },
      {
        label: "Lab-scale (20 mg+ vials)",
        value: "large",
        points: { metabolic: 2, "proprietary-blends": 1 },
      },
      {
        label: "Either — I'll evaluate per SKU",
        value: "either",
        points: { regenerative: 1, metabolic: 1 },
      },
    ],
  },
  {
    id: 5,
    question: "What's your timeline?",
    options: [
      {
        label: "Ready to order",
        value: "ready",
        points: { regenerative: 1, metabolic: 1 },
      },
      {
        label: "Comparing suppliers",
        value: "comparing",
        points: { regenerative: 1 },
      },
      {
        label: "Early-stage planning",
        value: "planning",
        points: { "research-supplies": 1 },
      },
    ],
  },
];

export const pathways: Record<string, ResearchPathway> = {
  regenerative: {
    id: "regenerative",
    name: "Regenerative & Tissue Repair",
    title: "Tissue repair pathway focus",
    description:
      "Your research falls within the regenerative and tissue-repair pathway. Our catalog includes pentadecapeptides, Thymosin Beta-4 fragments, copper tripeptide complexes, and α-MSH C-terminal tripeptides — all studied in extracellular matrix, cell migration, and cytoprotection pathway literature.",
    icon: "Leaf",
    products: ["bpc-157", "tb-500", "bpc-157-tb-500", "ghk-cu", "kpv"],
    color: "from-primary to-accent",
  },
  metabolic: {
    id: "metabolic",
    name: "Metabolic & Mitochondrial",
    title: "Metabolic pathway focus",
    description:
      "Your research falls within the metabolic and mitochondrial pathway. Our catalog includes mitochondrial-derived peptides, GLP-1/GIP/glucagon triple agonists, and methylated co-factor blends — all referenced in AMPK, incretin, and lipogenesis pathway studies.",
    icon: "Activity",
    products: ["mots-c", "lipo-c-b12", "retatrutide-10", "retatrutide-20"],
    color: "from-secondary to-primary",
  },
  "gh-secretagogue": {
    id: "gh-secretagogue",
    name: "GH Secretagogue",
    title: "Pulsatile GH pathway focus",
    description:
      "Your research falls within the GH secretagogue pathway. Our catalog includes GHRH analogs paired with GHRPs, studied for pulsatile growth-hormone-release pathway activity and lipogenesis pathway research.",
    icon: "TrendingUp",
    products: ["cjc-1295-ipamorelin", "tesamorelin"],
    color: "from-accent to-secondary",
  },
  melanocortin: {
    id: "melanocortin",
    name: "Melanocortin Pathway",
    title: "MC receptor focus",
    description:
      "Your research falls within the melanocortin receptor pathway. Our catalog includes synthetic α-MSH analogs studied for MC1R and MC4R receptor pathway research.",
    icon: "Target",
    products: ["mlt-ii"],
    color: "from-primary to-secondary",
  },
  "proprietary-blends": {
    id: "proprietary-blends",
    name: "Proprietary Research Blends",
    title: "Multi-component blend focus",
    description:
      "Your research benefits from multi-component research blends. Our catalog includes regenerative pathway formulations combining copper tripeptide complexes, pentadecapeptides, Thymosin fragments, and α-MSH tripeptides.",
    icon: "Layers",
    products: ["glow", "klow", "bpc-157-tb-500"],
    color: "from-primary to-accent",
  },
  "research-supplies": {
    id: "research-supplies",
    name: "Research Supplies",
    title: "Reconstitution supplies",
    description:
      "You'll want reconstitution supplies alongside any research peptide. Our catalog includes Hospira-brand and generic bacteriostatic water with 0.9% benzyl alcohol preservative, appropriate for peptide reconstitution and laboratory handling.",
    icon: "Droplet",
    products: ["bacteriostatic-water-hospira-30ml", "bacteriostatic-water-10ml"],
    color: "from-secondary to-accent",
  },
};

// Backwards-compat re-exports — existing quiz UI files import `archetypes` and type `Archetype`
export const archetypes = pathways;
export type Archetype = ResearchPathway;

export function calculatePathway(answers: Record<number, string>): ResearchPathway {
  const scores: Record<string, number> = {
    regenerative: 0,
    metabolic: 0,
    "gh-secretagogue": 0,
    melanocortin: 0,
    "proprietary-blends": 0,
    "research-supplies": 0,
  };

  for (const [questionId, answerValue] of Object.entries(answers)) {
    const question = quizQuestions.find((q) => q.id === Number(questionId));
    if (!question) continue;
    const option = question.options.find((o) => o.value === answerValue);
    if (!option) continue;
    for (const [pathwayKey, points] of Object.entries(option.points)) {
      scores[pathwayKey] = (scores[pathwayKey] || 0) + points;
    }
  }

  const topPathway = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return pathways[topPathway] ?? pathways.regenerative;
}

// Backwards-compat alias — existing UI file uses calculateArchetype
export const calculateArchetype = calculatePathway;
