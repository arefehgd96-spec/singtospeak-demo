import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Check, Volume2, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from '@/components/TranslationProvider';

export default function VocabularyPanel({ 
  vocabulary = [], 
  learnedWords = [],
  onMarkLearned 
}) {
  const { t } = useTranslation();
  const [expandedWord, setExpandedWord] = useState(null);

  if (!vocabulary.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4 p-8">
        <Book className="h-12 w-12" />
        <p className="text-center">{t('noVocabularyYet')}</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">{t('keyVocabulary')}</h3>
        <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
          {learnedWords.length}/{vocabulary.length} {t('learned')}
        </Badge>
      </div>

      <div className="space-y-2">
        {vocabulary.map((item, index) => {
          const isLearned = learnedWords.includes(item.word);
          const isExpanded = expandedWord === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "rounded-xl overflow-hidden transition-all",
                isExpanded ? "bg-zinc-800" : "bg-zinc-900/50 hover:bg-zinc-800/50"
              )}
            >
              <button
                onClick={() => setExpandedWord(isExpanded ? null : index)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                  isLearned ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-700 text-zinc-400"
                )}>
                  {isLearned ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">{item.word}</p>
                  <p className="text-zinc-500 text-sm truncate">{item.translation}</p>
                </div>

                <ChevronRight className={cn(
                  "h-4 w-4 text-zinc-500 transition-transform",
                  isExpanded && "rotate-90"
                )} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <div className="pl-11 space-y-3">
                        {item.example && (
                          <div className="bg-zinc-900 rounded-lg p-3">
                            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">{t('example')}</p>
                            <p className="text-white text-sm italic">"{item.example}"</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-zinc-300 border-zinc-700"
                          >
                            <Volume2 className="h-3 w-3 mr-2" />
                            {t('listen')}
                          </Button>
                          
                          {!isLearned && (
                            <Button
                              size="sm"
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                onMarkLearned?.(item.word);
                              }}
                            >
                              <Check className="h-3 w-3 mr-2" />
                              {t('markLearned')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}