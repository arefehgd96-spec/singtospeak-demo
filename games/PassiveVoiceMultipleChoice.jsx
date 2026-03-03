import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from 'lucide-react';

const questions = {
  english: [
    { question: 'Which sentence is in passive voice?', options: ['She writes books', 'Books are written by her', 'He reads daily', 'They play games'], correct: 1 },
    { question: 'Rewrite: "The chef cooks the meal" in passive voice', options: ['The meal cooks the chef', 'The meal is cooked by the chef', 'The chef is cooking', 'Cooking is done by meal'], correct: 1 },
    { question: 'The letter was sent by...?', options: ['send', 'sent', 'sending', 'to send'], correct: 1 },
    { question: 'Complete: "The project ___"', options: ['was completed yesterday', 'completed yesterday', 'completes yesterday', 'will complete'], correct: 0 },
    { question: 'Which is NOT passive voice?', options: ['The cake was eaten', 'The song is sung', 'She dances', 'The work was done'], correct: 2 }
  ],
  german: [
    { question: 'Welcher Satz ist Passiv?', options: ['Er schreibt Bücher', 'Die Bücher werden von ihm geschrieben', 'Sie liest täglich', 'Sie spielen Spiele'], correct: 1 },
    { question: 'Schreibe um: "Der Chef kocht das Essen" ins Passiv', options: ['Das Essen kocht den Chef', 'Das Essen wird vom Chef gekocht', 'Der Chef wird kochen', 'Kochen wird vom Essen gemacht'], correct: 1 },
    { question: 'Der Brief wurde von...geschrieben?', options: ['schreiben', 'geschrieben', 'schreibend', 'zu schreiben'], correct: 1 },
    { question: 'Vervollständige: "Das Projekt ___"', options: ['wurde gestern abgeschlossen', 'schloss gestern ab', 'schließt ab', 'wird abschließen'], correct: 0 },
    { question: 'Welches ist KEIN Passiv?', options: ['Der Kuchen wurde gegessen', 'Das Lied wird gesungen', 'Sie tanzt', 'Die Arbeit wurde gemacht'], correct: 2 }
  ]
};

export default function PassiveVoiceMultipleChoice({ language = 'english' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const qList = questions[language] || questions.english;
  const q = qList[currentQuestion];

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    
    setSelectedAnswer(optionIndex);
    setAnswered(true);
    
    if (optionIndex === q.correct) {
      setScore(score + 10 + (streak > 0 ? streak : 0));
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

  const isCorrect = selectedAnswer === q.correct;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{currentQuestion + 1} / {qList.length}</h2>
          <p className="text-muted-foreground">Choose the correct answer</p>
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

      {/* Question */}
      <Card>
        <CardContent className="pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-center">{q.question}</h3>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={!answered ? { scale: 1.02 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all font-medium ${
                    !answered
                      ? 'border-border hover:border-primary cursor-pointer'
                      : selectedAnswer === idx
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                        : 'border-red-500 bg-red-500/10 text-red-600'
                      : idx === q.correct
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                      : 'border-border opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      !answered
                        ? 'border-muted'
                        : selectedAnswer === idx
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-red-500 bg-red-500'
                        : idx === q.correct
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-muted'
                    } text-white`}>
                      {selectedAnswer === idx && answered ? (
                        isCorrect ? '✓' : '✗'
                      ) : idx === q.correct && answered ? (
                        '✓'
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
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
                    <p className="font-semibold">Correct! (+{10 + (streak > 0 ? streak : 0)} points)</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 flex-shrink-0" />
                    <p className="font-semibold">Incorrect. The correct answer is: <strong>{q.options[q.correct]}</strong></p>
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