
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CardCreator from '@/components/CardCreator';
import CustomizationPanel from '@/components/CustomizationPanel';
import PreviewPanel from '@/components/PreviewPanel';
import ExportPanel from '@/components/ExportPanel';
import { FlashcardData, CustomizationSettings } from '@/types/flashcard';

const Index = () => {
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [customization, setCustomization] = useState<CustomizationSettings>({
    colors: {
      primary: '#4f46e5',
      secondary: '#7c3aed',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      text: '#ffffff',
      cardBg: '#ffffff',
      cardText: '#1f2937'
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      termSize: '1.5rem',
      definitionSize: '1.2rem'
    },
    dimensions: {
      cardHeight: '300px',
      cardWidth: '100%',
      borderRadius: '12px'
    },
    features: {
      showProgress: true,
      showShuffle: true,
      showCounter: true,
      autoFlip: false
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Flashcard Creator & Export System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional flashcards and export them as self-contained HTML code 
            for your GoHighLevel course lessons
          </p>
        </div>

        <Card className="max-w-6xl mx-auto shadow-2xl">
          <CardContent className="p-0">
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-t-lg">
                <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Create Cards ({cards.length})
                </TabsTrigger>
                <TabsTrigger value="customize" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Customize Design
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Preview Study
                </TabsTrigger>
                <TabsTrigger value="export" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Export Code
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="create" className="mt-0">
                  <CardCreator cards={cards} setCards={setCards} />
                </TabsContent>

                <TabsContent value="customize" className="mt-0">
                  <CustomizationPanel 
                    customization={customization} 
                    setCustomization={setCustomization} 
                  />
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <PreviewPanel cards={cards} customization={customization} />
                </TabsContent>

                <TabsContent value="export" className="mt-0">
                  <ExportPanel cards={cards} customization={customization} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
