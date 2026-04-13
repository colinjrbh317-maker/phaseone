"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion as QuizQuestionType } from "./quiz-data";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (value: string) => void;
  selectedValue?: string;
}

export function QuizQuestion({ question, onAnswer, selectedValue }: QuizQuestionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-center">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedValue === option.value
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card hover:border-primary/30 hover:bg-card/80 text-foreground"
              }`}
            >
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
