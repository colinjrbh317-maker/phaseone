"use client";

import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, calculateArchetype, type Archetype } from "./quiz-data";
import { QuizQuestion } from "./quiz-question";
import { QuizEmail } from "./quiz-email";
import { QuizResults } from "./quiz-results";
import { Sparkles, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PeptideQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PeptideQuiz({ open, onOpenChange }: PeptideQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [archetype, setArchetype] = useState<Archetype | null>(null);

  const totalSteps = quizQuestions.length + 3; // intro + questions + email + results
  const progress = (step / (totalSteps - 1)) * 100;

  const handleAnswer = useCallback(
    (value: string) => {
      const questionIndex = step - 1;
      const question = quizQuestions[questionIndex];
      setAnswers((prev) => ({ ...prev, [question.id]: value }));
      setTimeout(() => setStep((s) => s + 1), 300);
    },
    [step]
  );

  const handleEmailSubmit = useCallback(
    (_name: string, _email: string) => {
      const result = calculateArchetype(answers);
      setArchetype(result);
      setStep(totalSteps - 1);
    },
    [answers, totalSteps]
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(0);
      setAnswers({});
      setArchetype(null);
    }, 300);
  }, [onOpenChange]);

  const handleBack = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const isIntro = step === 0;
  const isEmail = step === totalSteps - 2;
  const isResults = step === totalSteps - 1;
  const isQuestion = !isIntro && !isEmail && !isResults;
  const questionIndex = step - 1;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border p-0">
        <DialogTitle className="sr-only">Peptide Profile Quiz</DialogTitle>

        {!isIntro && (
          <div className="px-6 pt-6">
            <Progress value={progress} className="h-1.5" />
            <div className="flex items-center justify-between mt-2">
              {step > 0 && !isResults && (
                <button onClick={handleBack} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <ArrowLeft size={12} /> Back
                </button>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {Math.min(step, totalSteps - 1)}/{totalSteps - 1}
              </span>
            </div>
          </div>
        )}

        <div className="px-6 pb-6 pt-4">
          <AnimatePresence mode="wait">
            {isIntro && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6 py-8"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="text-primary" size={40} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">What&apos;s Your Peptide Profile?</h3>
                  <p className="text-sm text-muted-foreground">
                    Answer 5 quick questions and discover your personalized peptide recommendations. Takes under 60
                    seconds.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                  onClick={() => setStep(1)}
                >
                  Start Quiz
                </Button>
              </motion.div>
            )}

            {isQuestion && quizQuestions[questionIndex] && (
              <QuizQuestion
                key={`q-${questionIndex}`}
                question={quizQuestions[questionIndex]}
                onAnswer={handleAnswer}
                selectedValue={answers[quizQuestions[questionIndex].id]}
              />
            )}

            {isEmail && <QuizEmail key="email" onSubmit={handleEmailSubmit} />}

            {isResults && archetype && <QuizResults key="results" archetype={archetype} onClose={handleClose} />}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
