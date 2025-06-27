
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Download, Code, Settings } from 'lucide-react';
import { generateCreatorExportCode } from '@/utils/creatorExportUtils';
import { toast } from '@/hooks/use-toast';

const CreatorExport: React.FC = () => {
  const [exportCode, setExportCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCode = async () => {
    setIsGenerating(true);
    try {
      const code = generateCreatorExportCode();
      setExportCode(code);
      toast({
        title: "Success",
        description: "Creator system export code generated successfully!"
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
    a.download = 'flashcard-creator-system.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Code downloaded as flashcard-creator-system.html"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Creator System Export
          </h1>
          <p className="text-lg text-gray-600">
            Export the complete Flashcard Creator & Export System for GoHighLevel
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Export Creator System for GoHighLevel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">What This Exports:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                <li>Complete Flashcard Creator interface</li>
                <li>Single card creation form</li>
                <li>Bulk import functionality</li>
                <li>Card management with editing and deletion</li>
                <li>Export system that generates study interfaces</li>
                <li>1500px height frame with scrollable card list</li>
                <li>Self-contained HTML ready for GoHighLevel</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">How to Use:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-green-700">
                <li>Click "Generate Creator System Code" below</li>
                <li>Copy the generated HTML code</li>
                <li>Go to your GoHighLevel lesson</li>
                <li>Add a "Custom Code" element</li>
                <li>Paste the code into the HTML section</li>
                <li>Save and publish - students can now create their own flashcards!</li>
              </ol>
            </div>

            <Button 
              onClick={generateCode} 
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              <Code className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Creator System Code'}
            </Button>

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
                  <h4 className="font-semibold text-amber-800 mb-2">Ready for GoHighLevel!</h4>
                  <p className="text-sm text-amber-700">
                    This code contains the complete Creator & Export System in a 1500px frame. 
                    Students will be able to create flashcards and export them for study.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorExport;
