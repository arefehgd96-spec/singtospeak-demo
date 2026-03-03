import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function FillInBlankExercise({ exercise, onComplete }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { sentence, blank_word } = exercise.content;
  const sentenceWithBlank = sentence.replace(blank_word, '_____');

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === blank_word.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct, userAnswer);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer.trim() && !showResult) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-white text-lg leading-relaxed">
          {sentenceWithBlank.split('_____').map((part, index, arr) => (
            <React.Fragment key={index}>
              {part}
              {index < arr.length - 1 && (
                <span className="inline-flex items-center mx-2">
                  {!showResult ? (
                    <Input
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-32 text-center bg-zinc-800 border-zinc-700 text-white inline-block"
                      placeholder="..."
                      disabled={showResult}
                      autoFocus
                    />
                  ) : (
                    <span className={cn(
                      "px-4 py-1 rounded-lg font-medium",
                      isCorrect 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/20 text-red-400"
                    )}>
                      {isCorrect ? userAnswer : blank_word}
                    </span>
                  )}
                </span>
              )}
            </React.Fragment>
          ))}
        </p>
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
                  <p className="text-emerald-400 font-medium">Correct! Well done! 🎉</p>
                  <p className="text-zinc-400 text-sm">+{exercise.points} points</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-400" />
                <div className="flex-1">
                  <p className="text-red-400 font-medium">Not quite right</p>
                  <p className="text-zinc-400 text-sm">The correct answer is: <span className="text-white font-medium">{blank_word}</span></p>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="text-zinc-400 hover:text-emerald-400"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHint ? 'Hide hint' : 'Show hint'}
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Check Answer
            </Button>
          </div>
        )}
      </AnimatePresence>

      {showHint && !showResult && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4"
        >
          <p className="text-amber-400 text-sm">
            💡 Hint: The word starts with "<span className="font-bold">{blank_word.charAt(0)}</span>" and has {blank_word.length} letters
          </p>
        </motion.div>
      )}
    </div>
  );
}