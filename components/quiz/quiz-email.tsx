"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface QuizEmailProps {
  onSubmit: (name: string, email: string) => void;
}

export function QuizEmail({ onSubmit }: QuizEmailProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="text-primary" size={32} />
        </div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold">Your Profile is Ready!</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your details to unlock your personalized peptide recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">First Name</Label>
          <Input
            id="name"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-background border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-border"
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12">
          See My Results
        </Button>
        <p className="text-xs text-muted-foreground/60 text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </form>
    </motion.div>
  );
}
