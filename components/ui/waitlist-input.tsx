"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Hexagon } from "lucide-react";

interface WaitlistInputProps {
  className?: string;
}

export function WaitlistInput({ className = "" }: WaitlistInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubmitted(true);
    // You can wire up your actual API exactly here.
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full gradient-button px-8 h-12 text-sm sm:text-base font-semibold glow-primary-hover transition-shadow"
          >
            <Hexagon size={16} />
            Join the Waitlist
          </motion.button>
        ) : submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary/20 border border-primary text-primary px-8 h-12 text-sm sm:text-base font-semibold"
          >
            <Check size={18} />
            You're on the list.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, width: "auto" }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: "auto" }}
            onSubmit={handleSubmit}
            className="relative flex items-center w-full max-w-sm mx-auto sm:mx-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              autoFocus
              required
              className="w-full h-12 rounded-full bg-background border border-primary/50 pl-6 pr-14 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-[0_0_20px_rgba(0,191,255,0.15)]"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:brightness-110 transition-all font-bold group"
            >
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
