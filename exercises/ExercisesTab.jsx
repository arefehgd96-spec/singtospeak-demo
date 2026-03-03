import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, CheckCircle2, Lock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import ExerciseCard from './ExerciseCard';
import { useTranslation } from '@/components/TranslationProvider';

export default function ExercisesTab({ songId, user }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: exercises = [], isLoading: exercisesLoading } = useQuery({
    queryKey: ['exercises', songId],
    queryFn: () => base44.entities.Exercise.filter({ song_id: songId }),
    enabled: !!songId
  });

  const { data: completions = [], isLoading: completionsLoading } = useQuery({
    queryKey: ['completions', songId, user?.email],
    queryFn: () => base44.entities.ExerciseCompletion.filter({ 
      song_id: songId,
      created_by: user?.email 
    }),
    enabled: !!songId && !!user
  });

  const createCompletionMutation = useMutation({
    mutationFn: (data) => base44.entities.ExerciseCompletion.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['completions']);
    }
  });

  const handleExerciseComplete = async (exercise, isCorrect, userAnswer) => {
    await createCompletionMutation.mutateAsync({
      exercise_id: exercise.id,
      song_id: songId,
      is_correct: isCorrect,
      user_answer: userAnswer,
      points_earned: isCorrect ? exercise.points : 0,
      completed_at: new Date().toISOString()
    });
  };

  const completedExerciseIds = completions.map(c => c.exercise_id);
  const totalPoints = completions
    .filter(c => c.is_correct)
    .reduce((acc, c) => acc + (c.points_earned || 0), 0);
  const maxPoints = exercises.reduce((acc, e) => acc + (e.points || 10), 0);
  const progressPercent = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;

  const isLoading = exercisesLoading || completionsLoading;

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl bg-zinc-800" />
        ))}
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
          <Target className="h-8 w-8 text-zinc-600" />
        </div>
        <h3 className="text-white text-lg font-medium mb-2">{t('noExercisesYet')}</h3>
        <p className="text-zinc-500 max-w-md">
          {t('exercisesSoon')}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 border-emerald-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-emerald-400 text-2xl font-bold">{totalPoints}</p>
                  <p className="text-zinc-400 text-xs">{t('totalPoints')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-violet-900/30 to-violet-800/10 border-violet-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-violet-400 text-2xl font-bold">
                    {completedExerciseIds.length}/{exercises.length}
                  </p>
                  <p className="text-zinc-400 text-xs">{t('completed')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/10 border-amber-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-400 text-2xl font-bold">
                    {Math.round(progressPercent)}%
                  </p>
                  <p className="text-zinc-400 text-xs">{t('progress')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-400">{t('overallProgress')}</span>
          <span className="text-emerald-400 font-medium">{totalPoints} / {maxPoints} {t('points')}</span>
        </div>
        <Progress value={progressPercent} className="h-2 bg-zinc-800" />
      </div>

      {/* Exercises List */}
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            isCompleted={completedExerciseIds.includes(exercise.id)}
            onComplete={handleExerciseComplete}
          />
        ))}
      </div>
    </div>
  );
}