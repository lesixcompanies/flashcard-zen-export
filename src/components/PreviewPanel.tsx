
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StudyInterface from '@/components/StudyInterface';
import { FlashcardData, CustomizationSettings } from '@/types/flashcard';

interface PreviewPanelProps {
  cards: FlashcardData[];
  customization: CustomizationSettings;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ cards, customization }) => {
  if (cards.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500 text-lg">No cards to preview</p>
          <p className="text-gray-400 text-sm mt-2">Create some cards first to see the preview</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Study Interface Preview</h3>
        <p className="text-gray-600">This is how your students will see the flashcards</p>
      </div>
      
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-4">
          <div 
            className="rounded-lg overflow-hidden"
            style={{ 
              background: customization.colors.background,
              minHeight: '500px'
            }}
          >
            <StudyInterface 
              cards={cards} 
              customization={customization} 
              isPreview={true}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500">
        <p>💡 Tip: This preview shows exactly how your exported code will look and function</p>
      </div>
    </div>
  );
};

export default PreviewPanel;
