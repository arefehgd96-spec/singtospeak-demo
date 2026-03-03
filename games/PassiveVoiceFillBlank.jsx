import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Volume2 } from 'lucide-react';

const questions = {
  english: [
    { sentence: 'The cake ___ baked by Mary.', answer: 'was', hint: 'Use past tense be + past participle' },
    { sentence: 'Letters ___ delivered by the postman every morning.', answer: 'are', hint: 'Use present tense be + past participle' },
    { sentence: 'The house ___ built in 1990.', answer: 'was', hint: 'Use past tense be + past participle' },
    { sentence: 'The report ___ completed by the team yesterday.', answer: 'was', hint: 'Use past tense be + past participle' },
    { sentence: 'These books ___ published last year.', answer: 'were', hint: 'Use plural past tense be + past participle' },
    { sentence: 'The project ___ being finished right now.', answer: 'is', hint: 'Present continuous passive' },
    { sentence: 'Coffee ___ grown in many countries.', answer: 'is', hint: 'Use present tense be + past participle' },
    { sentence: 'The movie ___ watched by millions of people.', answer: 'was', hint: 'Use past tense be + past participle' }
  ],
  german: [
    { sentence: 'Der Kuchen ___ von Maria gebacken.', answer: 'wurde', hint: 'Imperfekt von "werden"' },
    { sentence: 'Briefe ___ jeden Morgen vom Postboten zugestellt.', answer: 'werden', hint: 'Präsens von "werden"' },
    { sentence: 'Das Haus ___ 1990 gebaut.', answer: 'wurde', hint: 'Imperfekt von "werden"' },
    { sentence: 'Der Bericht ___ gestern vom Team fertiggestellt.', answer: 'wurde', hint: 'Imperfekt von "werden"' },
    { sentence: 'Diese Bücher ___ letztes Jahr veröffentlicht.', answer: 'wurden', hint: 'Plural Imperfekt' },
    { sentence: 'Das Projekt ___ gerade beendet.', answer: 'wird', hint: 'Präsens Passiv' },
    { sentence: 'Kaffee ___ in vielen Ländern angebaut.', answer: 'wird', hint: 'Präsens von "werden"' },
    { sentence: 'Der Film ___ von Millionen Menschen angesehen.', answer: 'wurde', hint: 'Imperfekt von "werden"' }
  ]
};

export default function PassiveVoiceFillBlank({ language = 'english' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  const qList = questions[language] || questions.english;
  const q = qList[currentQuestion];

  const handleSubmit = () => {
    const correct = answer.toLowerCase().trim() === q.answer.toLowerCase().trim();
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      setScore(score + 10 + (streak > 0 ? streak : 0));
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < qList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer('');
      setAnswered(false);
      setShowHint(false);
      setIsCorrect(false);
    } else {
      setCurrentQuestion(0);
      setAnswer('');
      setAnswered(false);
      setShowHint(false);
      setIsCorrect(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{currentQuestion + 1} / {qList.length}</h2>
          <p className="text-muted-foreground">Fill in the correct verb form</p>
        </div>
        <div className="text-right space-y-1">
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

      {/* Question Card */}
      <Card>
        <CardContent className="pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Sentence */}
            <div className="p-6 bg-muted rounded-lg text-lg text-foreground">
              <p className="text-center leading-relaxed">
                {q.sentence.split('___').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && (
                      <span className="inline-block w-16 h-8 mx-2 border-b-2 border-primary rounded-sm" />
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Input */}
            <div className="space-y-3">
              <Input
                placeholder="Type the correct verb form..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => !answered && e.key === 'Enter' && handleSubmit()}
                disabled={answered}
                className="text-center text-lg h-12"
              />
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-600"
                >
                  💡 {q.hint}
                </motion.div>
              )}
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
                    <div>
                      <p className="font-semibold">Correct!</p>
                      <p className="text-sm">Great job! (+{10 + (streak > 0 ? streak : 0)} points)</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Incorrect</p>
                      <p className="text-sm">The correct answer is: <strong>{q.answer}</strong></p>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              {!answered ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowHint(true)}
                    disabled={showHint}
                    className="flex-1"
                  >
                    💡 Hint
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!answer}
                    className="flex-1 bg-primary"
                  >
                    Check Answer
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full bg-primary"
                >
                  {currentQuestion === qList.length - 1 ? 'Restart' : 'Next Question'} →
                </Button>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}