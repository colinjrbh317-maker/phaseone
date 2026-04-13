"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/constants";
import type { ResearchPathway } from "./quiz-data";
import {
  TrendingUp,
  Leaf,
  Activity,
  Target,
  Layers,
  Droplet,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Leaf,
  Activity,
  Target,
  Layers,
  Droplet,
};

interface QuizResultsProps {
  // Keeping the prop name `archetype` for backwards compat with peptide-quiz.tsx
  // Type is now ResearchPathway (aliased as Archetype in quiz-data.ts)
  archetype: ResearchPathway;
  onClose: () => void;
}

export function QuizResults({ archetype, onClose }: QuizResultsProps) {
  const Icon = iconMap[archetype.icon] || Leaf;
  const recommendedProducts = products.filter((p) => archetype.products.includes(p.slug));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-center mx-auto mb-4">
          <Icon className="text-primary" size={36} />
        </div>
        <Badge variant="outline" className="mb-2 text-primary border-primary/30">
          Your Research Pathway
        </Badge>
        <h3
          className="font-heading font-black tracking-tighter uppercase text-2xl font-bold text-foreground"
          
        >
          {archetype.name}
        </h3>
        <p className="text-sm text-muted-foreground">{archetype.title}</p>
      </div>

      <p className="text-sm text-muted-foreground text-center leading-relaxed">
        {archetype.description}
      </p>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-foreground">Compatible Research Peptides</h4>
        {recommendedProducts.map((product) => (
          <Link
            key={product.sku}
            href={`/shop/${product.slug}`}
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-primary/5 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm text-foreground">{product.name}</div>
              <div className="text-xs text-muted-foreground truncate">{product.description}</div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-3">
              <span className="font-semibold text-sm text-foreground">
                {product.size} · {product.priceDisplay}
              </span>
              <ArrowRight size={14} className="text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground/70 italic text-center">
        All products currently listed are for research purposes only.
      </p>

      <div className="flex gap-3 pt-2">
        <Link
          href="/shop"
          onClick={onClose}
          className="flex-1 inline-flex items-center justify-center rounded-full gradient-button h-10 px-4 text-sm font-semibold"
        >
          Browse Full Catalog
        </Link>
        <Button variant="outline" className="border-border" onClick={onClose}>
          Close
        </Button>
      </div>
    </motion.div>
  );
}
