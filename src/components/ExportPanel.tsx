
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Download, Code, ExternalLink } from 'lucide-react';
import { FlashcardData, CustomizationSettings } from '@/types/flashcard';
import { generateExportCode } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';

interface ExportPanelProps {
  cards: FlashcardData[];
  customization: CustomizationSettings;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ cards, customization }) => {
  const [exportCode, setExportCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCode = async () => {
    if (cards.length === 0) {
      toast({
        title: "Error",
        description: "Please create some cards before exporting",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const code = generateExportCode(cards, customization);
      setExportCode(code);
      toast({
        title: "Success",
        description: "Export code generated successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate export code",
        variant: "destructive"
      });
    }
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    if (!exportCode) return;
    
    try {
      await navigator.clipboard.writeText(exportCode);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadCode = () => {
    if (!exportCode) return;
    
    const blob = new Blob([exportCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Code downloaded as flashcards.html"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Export Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">How to Use Your Export Code:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
              <li>Click "Generate Export Code" below</li>
              <li>Copy the generated HTML code</li>
              <li>Go to your GoHighLevel course lesson</li>
              <li>Add a "Custom Code" element</li>
              <li>Paste the code into the HTML section</li>
              <li>Save and publish your lesson</li>
            </ol>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Features Included:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
              <li>Self-contained HTML (no external dependencies)</li>
              <li>Responsive design for all devices</li>
              <li>Smooth card flip animations</li>
              <li>Keyboard navigation support</li>
              <li>Progress tracking and card shuffling</li>
              <li>Your custom colors and fonts applied</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generate Export Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={generateCode} 
              disabled={isGenerating || cards.length === 0}
              className="flex-1 min-w-[200px]"
            >
              <Code className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Export Code'}
            </Button>
          </div>

          {cards.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Create some cards first to generate export code</p>
            </div>
          )}

          {exportCode && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Generated HTML Code ({Math.round(exportCode.length / 1024)}KB)</Label>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button onClick={downloadCode} size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={exportCode}
                readOnly
                className="font-mono text-xs h-64 resize-none"
                placeholder="Generated code will appear here..."
              />
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Ready for GoHighLevel!
                </h4>
                <p className="text-sm text-amber-700">
                  This code is completely self-contained and ready to paste into your GoHighLevel lesson. 
                  It includes all styling, functionality, and your {cards.length} flashcards.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportPanel;
