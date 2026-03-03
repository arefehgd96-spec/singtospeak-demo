import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, PenLine, MessageSquare, Shuffle } from 'lucide-react';
import { cn } from "@/lib/utils";
import FillInBlankExercise from './FillInBlankExercise';
import MultipleChoiceExercise from './MultipleChoiceExercise';
import UnscrambleExercise from './UnscrambleExercise';

const exerciseIcons = {
  fill_in_blank: PenLine,
  multiple_choice: MessageSquare,
  unscramble: Shuffle
};

const exerciseLabels = {
  fill_in_blank: 'Fill in the Blank',
  multiple_choice: 'Multiple Choice',
  unscramble: 'Unscramble'
};

const difficultyColors = {
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
};

export default function ExerciseCard({ 
  exercise, 
  index, 
  isCompleted, 
  onComplete 
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = exerciseIcons[exercise.type];

  const handleComplete = (isCorrect, userAnswer) => {
    onComplete(exercise, isCorrect, userAnswer);
    setTimeout(() => setExpanded(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={cn(
        "bg-zinc-900/50 border-zinc-800 overflow-hidden transition-all",
        expanded && "ring-2 ring-emerald-500/30"
      )}>
        <CardHeader 
          className="cursor-pointer hover:bg-zinc-800/30 transition-colors"
          onClick={() => !isCompleted && setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                isCompleted 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "bg-zinc-800 text-zinc-400"
              )}>
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">Exercise {index + 1}</h3>
                  <Badge variant="outline" className="text-xs text-zinc-500 border-zinc-700">
                    {exerciseLabels[exercise.type]}
                  </Badge>
                </div>
                <p className="text-zinc-400 text-sm mt-0.5">{exercise.question}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", difficultyColors[exercise.difficulty])}>
                {exercise.difficulty}
              </Badge>
              {isCompleted && (
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              )}
            </div>
          </div>
        </CardHeader>

        {expanded && !isCompleted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <CardContent className="pt-0 pb-6">
              <div className="border-t border-zinc-800 pt-6">
                {exercise.type === 'fill_in_blank' && (
                  <FillInBlankExercise exercise={exercise} onComplete={handleComplete} />
                )}
                {exercise.type === 'multiple_choice' && (
                  <MultipleChoiceExercise exercise={exercise} onComplete={handleComplete} />
                )}
                {exercise.type === 'unscramble' && (
                  <UnscrambleExercise exercise={exercise} onComplete={handleComplete} />
                )}
              </div>
            </CardContent>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}