import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from 'lucide-react';

const sentences = {
  english: [
    { sentence: 'The cake was baked by Mary', isPassive: true },
    { sentence: 'She writes beautiful letters', isPassive: false },
    { sentence: 'The report is being reviewed', isPassive: true },
    { sentence: 'They will paint the house', isPassive: false },
    { sentence: 'The song was sung by a famous artist', isPassive: true },
    { sentence: 'He runs every morning', isPassive: false },
    { sentence: 'These products are made in Germany', isPassive: true },
    { sentence: 'Someone stole my bicycle', isPassive: false }
  ],
  german: [
    { sentence: 'Der Kuchen wurde von Maria gebacken', isPassive: true },
    { sentence: 'Sie schreibt wunderbare Briefe', isPassive: false },
    { sentence: 'Der Bericht wird gerade überprüft', isPassive: true },
    { sentence: 'Sie werden das Haus streichen', isPassive: false },
    { sentence: 'Das Lied wurde von einem berühmten Künstler gesungen', isPassive: true },
    { sentence: 'Er läuft jeden Morgen', isPassive: false },
    { sentence: 'Diese Produkte werden in Deutschland hergestellt', isPassive: true },
    { sentence: 'Jemand hat mein Fahrrad gestohlen', isPassive: false }
  ]
};

export default function PassiveVoiceIdentifier({ language = 'english' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const qList = sentences[language] || sentences.english;
  const q = qList[currentQuestion];

  const handleAnswer = (isPassive) => {
    if (answered) return;
    
    setSelectedAnswer(isPassive);
    setAnswered(true);
    
    if (isPassive === q.isPassive) {
      setScore(score + 5 + (streak > 0 ? streak : 0));
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < qList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const isCorrect = selectedAnswer === q.isPassive;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{currentQuestion + 1} / {qList.length}</h2>
          <p className="text-muted-foreground">Is this sentence in passive voice?</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{score}</div>
          <p className="text-sm text-muted-foreground">Points</p>
        </div>
      </div>

      {streak > 0 && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-semibold text-center"
        >
          🔥 {streak} correct in a row!
        </motion.div>
      )}

      {/* Sentence Card */}
      <Card>
        <CardContent className="pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-lg font-medium text-foreground leading-relaxed">
                "{q.sentence}"
              </p>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={!answered ? { scale: 1.05 } : {}}
                whileTap={!answered ? { scale: 0.95 } : {}}
                onClick={() => handleAnswer(true)}
                disabled={answered}
                className={`p-6 rounded-lg border-2 font-bold text-lg transition-all ${
                  !answered
                    ? 'border-blue-500 hover:bg-blue-500/10 text-blue-600 cursor-pointer'
                    : selectedAnswer === true
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                      : 'border-red-500 bg-red-500/10 text-red-600'
                    : q.isPassive
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                    : 'border-border opacity-50'
                }`}
              >
                {selectedAnswer === true && answered && (isCorrect ? '✓' : '✗')}
                PASSIVE
              </motion.button>

              <motion.button
                whileHover={!answered ? { scale: 1.05 } : {}}
                whileTap={!answered ? { scale: 0.95 } : {}}
                onClick={() => handleAnswer(false)}
                disabled={answered}
                className={`p-6 rounded-lg border-2 font-bold text-lg transition-all ${
                  !answered
                    ? 'border-orange-500 hover:bg-orange-500/10 text-orange-600 cursor-pointer'
                    : selectedAnswer === false
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                      : 'border-red-500 bg-red-500/10 text-red-600'
                    : !q.isPassive
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                    : 'border-border opacity-50'
                }`}
              >
                {selectedAnswer === false && answered && (isCorrect ? '✓' : '✗')}
                ACTIVE
              </motion.button>
            </div>

            {/* Feedback */}
            {answered && (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  isCorrect
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600'
                    : 'bg-red-500/10 border border-red-500/30 text-red-600'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                    <p className="font-semibold">Correct! (+{5 + (streak > 0 ? streak : 0)} points)</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 flex-shrink-0" />
                    <p className="font-semibold">
                      This sentence is {q.isPassive ? 'PASSIVE' : 'ACTIVE'} voice.
                    </p>
                  </>
                )}
              </motion.div>
            )}

            {/* Next Button */}
            {answered && (
              <Button
                onClick={handleNext}
                className="w-full bg-primary"
              >
                {currentQuestion === qList.length - 1 ? 'Restart' : 'Next Question'} →
              </Button>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}