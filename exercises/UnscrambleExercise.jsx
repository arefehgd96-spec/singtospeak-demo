import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { cn } from "@/lib/utils";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function UnscrambleExercise({ exercise, onComplete }) {
  const { words, correct_order } = exercise.content;
  const [currentOrder, setCurrentOrder] = useState([...words]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(currentOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCurrentOrder(items);
  };

  const handleSubmit = () => {
    const correct = JSON.stringify(currentOrder) === JSON.stringify(correct_order);
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct, currentOrder.join(' '));
    }, 2500);
  };

  const handleReset = () => {
    setCurrentOrder([...words]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
        <p className="text-zinc-400 text-sm mb-4 text-center">
          Drag and drop the words to form the correct sentence
        </p>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="words" direction="horizontal">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  "flex flex-wrap gap-2 min-h-[60px] p-3 rounded-lg transition-colors",
                  snapshot.isDraggingOver ? "bg-emerald-500/5 border-2 border-dashed border-emerald-500/30" : "bg-zinc-800/50"
                )}
              >
                {currentOrder.map((word, index) => (
                  <Draggable 
                    key={`${word}-${index}`} 
                    draggableId={`${word}-${index}`} 
                    index={index}
                    isDragDisabled={showResult}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          "px-4 py-2 rounded-lg font-medium transition-all select-none",
                          snapshot.isDragging 
                            ? "bg-emerald-600 text-white shadow-lg scale-105" 
                            : "bg-zinc-700 text-white hover:bg-zinc-600",
                          showResult && "cursor-not-allowed"
                        )}
                      >
                        {word}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              "p-4 rounded-xl flex items-start gap-3",
              isCorrect 
                ? "bg-emerald-500/10 border border-emerald-500/30" 
                : "bg-red-500/10 border border-red-500/30"
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-emerald-400 font-medium">Excellent! 🎉</p>
                  <p className="text-zinc-400 text-sm">+{exercise.points} points</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-400 font-medium">Not quite right</p>
                  <p className="text-zinc-400 text-sm mt-1">
                    Correct order: <span className="text-white font-medium">{correct_order.join(' ')}</span>
                  </p>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-zinc-700 text-zinc-400"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={currentOrder.length === 0}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              Check Answer
            </Button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}