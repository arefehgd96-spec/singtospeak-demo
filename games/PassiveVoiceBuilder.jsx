import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from 'lucide-react';

const questions = {
  english: [
    { 
      instruction: 'Build the passive voice sentence:',
      words: ['the book', 'was', 'published', 'by the author'],
      correctOrder: [1, 3, 2, 0],
      meaning: 'The author published the book → The book was published by the author'
    },
    { 
      instruction: 'Arrange in passive voice:',
      words: ['breakfast', 'made', 'was', 'by Mom'],
      correctOrder: [0, 2, 1, 3],
      meaning: 'Mom made breakfast → Breakfast was made by Mom'
    },
    { 
      instruction: 'Build the sentence:',
      words: ['by the team', 'was', 'the project', 'completed'],
      correctOrder: [2, 1, 3, 0],
      meaning: 'The team completed the project → The project was completed by the team'
    },
    { 
      instruction: 'Create passive voice:',
      words: ['is', 'the painting', 'admired', 'by everyone'],
      correctOrder: [1, 0, 2, 3],
      meaning: 'Everyone admires the painting → The painting is admired by everyone'
    }
  ],
  german: [
    { 
      instruction: 'Bilde den Passivsatz:',
      words: ['das Buch', 'wurde', 'veröffentlicht', 'vom Autor'],
      correctOrder: [0, 1, 2, 3],
      meaning: 'Der Autor veröffentlichte das Buch → Das Buch wurde vom Autor veröffentlicht'
    },
    { 
      instruction: 'Ordne im Passiv:',
      words: ['Frühstück', 'gemacht', 'wurde', 'von Mama'],
      correctOrder: [0, 2, 1, 3],
      meaning: 'Mama machte Frühstück → Frühstück wurde von Mama gemacht'
    },
    { 
      instruction: 'Bilde den Satz:',
      words: ['vom Team', 'wurde', 'das Projekt', 'abgeschlossen'],
      correctOrder: [2, 1, 3, 0],
      meaning: 'Das Team schloss das Projekt ab → Das Projekt wurde vom Team abgeschlossen'
    },
    { 
      instruction: 'Schaffe Passiv:',
      words: ['ist', 'das Gemälde', 'bewundert', 'von allen'],
      correctOrder: [1, 0, 2, 3],
      meaning: 'Alle bewundern das Gemälde → Das Gemälde ist von allen bewundert'
    }
  ]
};

export default function PassiveVoiceBuilder({ language = 'english' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const qList = questions[language] || questions.english;
  const q = qList[currentQuestion];

  useEffect(() => {
    const shuffled = [...q.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled.map((word, idx) => ({ word, originalIdx: q.words.indexOf(word) })));
    setSelectedWords([]);
    setAnswered(false);
  }, [currentQuestion]);

  const handleSelectWord = (idx) => {
    const newAvailable = availableWords.filter((_, i) => i !== idx);
    setSelectedWords([...selectedWords, availableWords[idx]]);
    setAvailableWords(newAvailable);
  };

  const handleRemoveWord = (idx) => {
    const removed = selectedWords[idx];
    setSelectedWords(selectedWords.filter((_, i) => i !== idx));
    setAvailableWords([...availableWords, removed]);
  };

  const checkAnswer = () => {
    const userOrder = selectedWords.map(w => q.words.indexOf(w.word));
    const correct = JSON.stringify(userOrder) === JSON.stringify(q.correctOrder);
    
    setAnswered(true);
    if (correct) {
      setScore(score + 15 + (streak > 0 ? streak * 2 : 0));
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < qList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
    }
  };

  const isCorrect = answered && JSON.stringify(selectedWords.map(w => q.words.indexOf(w.word))) === JSON.stringify(q.correctOrder);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{currentQuestion + 1} / {qList.length}</h2>
          <p className="text-muted-foreground">Build the passive voice sentence</p>
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

      {/* Question Card */}
      <Card>
        <CardContent className="pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-center">{q.instruction}</h3>

            {/* Selected Words (Building Area) */}
            <div className="p-6 bg-primary/5 rounded-lg min-h-20 border-2 border-dashed border-primary/30">
              {selectedWords.length === 0 ? (
                <p className="text-center text-muted-foreground italic">Click words below to build the sentence</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {selectedWords.map((item, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={() => handleRemoveWord(idx)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/80 transition-all"
                    >
                      {item.word} ×
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Available Words */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Available words:</p>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectWord(idx)}
                    disabled={answered}
                    className="px-4 py-2 bg-muted hover:bg-primary/20 text-foreground rounded-full font-medium transition-all"
                  >
                    {item.word}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Meaning */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-600">
                <strong>Hint:</strong> {q.meaning}
              </p>
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
                    <p className="font-semibold">Perfect! (+{15 + (streak > 0 ? streak * 2 : 0)} points)</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Not quite right</p>
                      <p className="text-sm">Correct: {q.words.slice().sort((a, b) => q.correctOrder.indexOf(q.words.indexOf(a)) - q.correctOrder.indexOf(q.words.indexOf(b))).join(' ')}</p>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              {!answered ? (
                <Button
                  onClick={checkAnswer}
                  disabled={selectedWords.length !== q.words.length}
                  className="w-full bg-primary"
                >
                  Check Sentence ({selectedWords.length}/{q.words.length})
                </Button>
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