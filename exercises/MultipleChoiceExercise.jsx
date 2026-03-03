import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function MultipleChoiceExercise({ exercise, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const { options, correct_answer } = exercise.content;

  const handleSubmit = () => {
    const correct = selectedAnswer === correct_answer;
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct, selectedAnswer);
    }, 2000);
  };

  const isCorrect = selectedAnswer === correct_answer;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === correct_answer;
          const shouldHighlight = showResult && (isSelected || isCorrectAnswer);
          
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!showResult ? { scale: 1.02, x: 4 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              onClick={() => !showResult && setSelectedAnswer(option)}
              disabled={showResult}
              className={cn(
                "w-full p-4 rounded-xl text-left transition-all border-2",
                "disabled:cursor-not-allowed",
                !showResult && !isSelected && "bg-zinc-900 border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800",
                !showResult && isSelected && "bg-emerald-500/10 border-emerald-500/50",
                showResult && isSelected && !isCorrect && "bg-red-500/10 border-red-500/50",
                showResult && isCorrectAnswer && "bg-emerald-500/10 border-emerald-500/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                  !showResult && !isSelected && "border-zinc-700 bg-zinc-800",
                  !showResult && isSelected && "border-emerald-500 bg-emerald-500/20",
                  showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/20",
                  showResult && isCorrectAnswer && "border-emerald-500 bg-emerald-500/20"
                )}>
                  {showResult && isCorrectAnswer ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : showResult && isSelected && !isCorrect ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : (
                    <span className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-emerald-400" : "text-zinc-500"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </span>
                  )}
                </div>
                
                <span className={cn(
                  "text-base",
                  showResult && isCorrectAnswer && "text-emerald-400 font-medium",
                  showResult && isSelected && !isCorrect && "text-red-400",
                  !showResult && isSelected && "text-white",
                  !showResult && !isSelected && "text-zinc-300"
                )}>
                  {option}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              "p-4 rounded-xl flex items-center gap-3",
              isCorrect 
                ? "bg-emerald-500/10 border border-emerald-500/30" 
                : "bg-red-500/10 border border-red-500/30"
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <div className="flex-1">
                  <p className="text-emerald-400 font-medium">Perfect! 🎉</p>
                  <p className="text-zinc-400 text-sm">+{exercise.points} points</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-400" />
                <div className="flex-1">
                  <p className="text-red-400 font-medium">Try again next time!</p>
                  <p className="text-zinc-400 text-sm">The correct answer was: <span className="text-white font-medium">{correct_answer}</span></p>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
          >
            Submit Answer
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}