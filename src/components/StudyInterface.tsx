
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FlashcardData, CustomizationSettings } from '@/types/flashcard';

interface StudyInterfaceProps {
  cards: FlashcardData[];
  customization: CustomizationSettings;
  isPreview?: boolean;
}

const StudyInterface: React.FC<StudyInterfaceProps> = ({ 
  cards, 
  customization, 
  isPreview = false 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyCards, setStudyCards] = useState(cards);

  useEffect(() => {
    setStudyCards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % studyCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + studyCards.length) % studyCards.length);
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    const shuffled = [...studyCards].sort(() => Math.random() - 0.5);
    setStudyCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const restart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const progress = studyCards.length > 0 ? ((currentIndex + 1) / studyCards.length) * 100 : 0;
  const currentCard = studyCards[currentIndex];

  if (!currentCard) return null;

  return (
    <div 
      className="min-h-full p-6 flex flex-col"
      style={{ 
        fontFamily: customization.typography.fontFamily,
        background: customization.colors.background,
        color: customization.colors.text
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Flashcard Study</h1>
        {customization.features.showCounter && (
          <p className="text-sm opacity-80">
            Card {currentIndex + 1} of {studyCards.length}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      {customization.features.showProgress && (
        <div className="mb-6">
          <Progress 
            value={progress} 
            className="h-2 bg-white/20"
          />
        </div>
      )}

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <div
          className="flashcard-container cursor-pointer select-none"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            perspective: '1000px',
            width: '100%',
            maxWidth: '600px',
            height: customization.dimensions.cardHeight
          }}
        >
          <div
            className="flashcard-inner"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Front Side */}
            <div
              className="flashcard-front"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: customization.colors.cardBg,
                color: customization.colors.cardText,
                borderRadius: customization.dimensions.borderRadius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <div>
                <div 
                  className="font-semibold mb-4"
                  style={{ fontSize: customization.typography.termSize }}
                >
                  {currentCard.term}
                </div>
                <div 
                  className="text-sm opacity-60"
                  style={{ color: customization.colors.primary }}
                >
                  Click to reveal answer
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="flashcard-back"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: customization.colors.cardBg,
                color: customization.colors.cardText,
                borderRadius: customization.dimensions.borderRadius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                transform: 'rotateY(180deg)'
              }}
            >
              <div>
                <div 
                  className="mb-4"
                  style={{ fontSize: customization.typography.definitionSize }}
                >
                  {currentCard.definition}
                </div>
                <div 
                  className="text-sm opacity-60"
                  style={{ color: customization.colors.secondary }}
                >
                  Click to see question
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={prevCard}
          disabled={studyCards.length <= 1}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          Previous
        </Button>
        
        <Button
          onClick={nextCard}
          disabled={studyCards.length <= 1}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          Next
        </Button>

        {customization.features.showShuffle && (
          <Button
            onClick={shuffleCards}
            disabled={studyCards.length <= 1}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Shuffle
          </Button>
        )}

        <Button
          onClick={restart}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          Restart
        </Button>
      </div>

      {/* Keyboard Hints */}
      <div className="text-center mt-4 text-sm opacity-60">
        <p>Use ← → arrow keys to navigate • Space to flip cards</p>
      </div>
    </div>
  );
};

export default StudyInterface;
