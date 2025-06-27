
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Upload, Download } from 'lucide-react';
import { FlashcardData } from '@/types/flashcard';
import { toast } from '@/hooks/use-toast';

interface CardCreatorProps {
  cards: FlashcardData[];
  setCards: React.Dispatch<React.SetStateAction<FlashcardData[]>>;
}

const CardCreator: React.FC<CardCreatorProps> = ({ cards, setCards }) => {
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const [bulkText, setBulkText] = useState('');

  const addCard = () => {
    if (!newTerm.trim() || !newDefinition.trim()) {
      toast({
        title: "Error",
        description: "Both term and definition are required",
        variant: "destructive"
      });
      return;
    }

    const newCard: FlashcardData = {
      id: Date.now().toString(),
      term: newTerm.trim(),
      definition: newDefinition.trim()
    };

    setCards(prev => [...prev, newCard]);
    setNewTerm('');
    setNewDefinition('');
    toast({
      title: "Success",
      description: "Card added successfully"
    });
  };

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(card => card.id !== id));
    toast({
      title: "Deleted",
      description: "Card removed successfully"
    });
  };

  const updateCard = (id: string, field: 'term' | 'definition', value: string) => {
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const processBulkImport = () => {
    if (!bulkText.trim()) return;

    const lines = bulkText.split('\n').filter(line => line.trim());
    const newCards: FlashcardData[] = [];

    lines.forEach(line => {
      // Support both tab and comma separation
      const parts = line.includes('\t') ? line.split('\t') : line.split(',');
      if (parts.length >= 2) {
        newCards.push({
          id: Date.now().toString() + Math.random(),
          term: parts[0].trim(),
          definition: parts[1].trim()
        });
      }
    });

    if (newCards.length > 0) {
      setCards(prev => [...prev, ...newCards]);
      setBulkText('');
      toast({
        title: "Success",
        description: `Imported ${newCards.length} cards successfully`
      });
    } else {
      toast({
        title: "Error",
        description: "No valid cards found. Use format: Term\tDefinition or Term,Definition",
        variant: "destructive"
      });
    }
  };

  const clearAllCards = () => {
    setCards([]);
    toast({
      title: "Cleared",
      description: "All cards have been removed"
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Single Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Single Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="term">Term / Question</Label>
              <Input
                id="term"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                placeholder="Enter the front of the card..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="definition">Definition / Answer</Label>
              <Textarea
                id="definition"
                value={newDefinition}
                onChange={(e) => setNewDefinition(e.target.value)}
                placeholder="Enter the back of the card..."
                className="mt-1 min-h-[100px]"
              />
            </div>
            <Button onClick={addCard} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </CardContent>
        </Card>

        {/* Bulk Import */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Bulk Import Cards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bulk">Paste Cards (Tab or Comma Separated)</Label>
              <Textarea
                id="bulk"
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="Term1&#9;Definition1&#10;Term2&#9;Definition2&#10;or&#10;Term1,Definition1&#10;Term2,Definition2"
                className="mt-1 min-h-[120px] font-mono text-sm"
              />
            </div>
            <Button onClick={processBulkImport} variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Import Cards
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Card Management */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Cards ({cards.length})</h3>
        {cards.length > 0 && (
          <Button onClick={clearAllCards} variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {cards.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg">No cards created yet</p>
            <p className="text-gray-400 text-sm mt-2">Add your first card using the form above</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {cards.map((card, index) => (
            <Card key={card.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`term-${card.id}`} className="text-sm font-medium text-blue-600">
                      Term #{index + 1}
                    </Label>
                    <Input
                      id={`term-${card.id}`}
                      value={card.term}
                      onChange={(e) => updateCard(card.id, 'term', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`def-${card.id}`} className="text-sm font-medium text-purple-600">
                      Definition
                    </Label>
                    <Textarea
                      id={`def-${card.id}`}
                      value={card.definition}
                      onChange={(e) => updateCard(card.id, 'definition', e.target.value)}
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <Button
                    onClick={() => deleteCard(card.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCreator;
