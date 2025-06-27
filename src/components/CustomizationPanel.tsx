
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Palette, Type, Layout, Settings } from 'lucide-react';
import { CustomizationSettings } from '@/types/flashcard';

interface CustomizationPanelProps {
  customization: CustomizationSettings;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationSettings>>;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ 
  customization, 
  setCustomization 
}) => {
  const updateColors = (key: string, value: string) => {
    setCustomization(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: value }
    }));
  };

  const updateTypography = (key: string, value: string) => {
    setCustomization(prev => ({
      ...prev,
      typography: { ...prev.typography, [key]: value }
    }));
  };

  const updateDimensions = (key: string, value: string) => {
    setCustomization(prev => ({
      ...prev,
      dimensions: { ...prev.dimensions, [key]: value }
    }));
  };

  const updateFeatures = (key: string, value: boolean) => {
    setCustomization(prev => ({
      ...prev,
      features: { ...prev.features, [key]: value }
    }));
  };

  const presetThemes = [
    {
      name: 'Professional Blue',
      colors: {
        primary: '#2563eb',
        secondary: '#1d4ed8',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        text: '#ffffff',
        cardBg: '#ffffff',
        cardText: '#1f2937'
      }
    },
    {
      name: 'Purple Gradient',
      colors: {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        text: '#ffffff',
        cardBg: '#ffffff',
        cardText: '#1f2937'
      }
    },
    {
      name: 'Emerald Green',
      colors: {
        primary: '#059669',
        secondary: '#047857',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        text: '#ffffff',
        cardBg: '#ffffff',
        cardText: '#1f2937'
      }
    }
  ];

  const applyPreset = (preset: typeof presetThemes[0]) => {
    setCustomization(prev => ({
      ...prev,
      colors: preset.colors
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Color Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Scheme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary">Primary Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="primary"
                    type="color"
                    value={customization.colors.primary}
                    onChange={(e) => updateColors('primary', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    value={customization.colors.primary}
                    onChange={(e) => updateColors('primary', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondary">Secondary Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="secondary"
                    type="color"
                    value={customization.colors.secondary}
                    onChange={(e) => updateColors('secondary', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    value={customization.colors.secondary}
                    onChange={(e) => updateColors('secondary', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardBg">Card Background</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="cardBg"
                    type="color"
                    value={customization.colors.cardBg}
                    onChange={(e) => updateColors('cardBg', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    value={customization.colors.cardBg}
                    onChange={(e) => updateColors('cardBg', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardText">Card Text</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="cardText"
                    type="color"
                    value={customization.colors.cardText}
                    onChange={(e) => updateColors('cardText', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    value={customization.colors.cardText}
                    onChange={(e) => updateColors('cardText', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="background">Background Gradient</Label>
              <Input
                id="background"
                value={customization.colors.background}
                onChange={(e) => updateColors('background', e.target.value)}
                placeholder="CSS gradient or color"
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <Label>Quick Presets</Label>
              <div className="grid grid-cols-1 gap-2">
                {presetThemes.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="justify-start"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select
                value={customization.typography.fontFamily}
                onValueChange={(value) => updateTypography('fontFamily', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                  <SelectItem value="'Helvetica Neue', sans-serif">Helvetica</SelectItem>
                  <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                  <SelectItem value="'Trebuchet MS', sans-serif">Trebuchet MS</SelectItem>
                  <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="termSize">Term Size</Label>
                <Select
                  value={customization.typography.termSize}
                  onValueChange={(value) => updateTypography('termSize', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.2rem">Small</SelectItem>
                    <SelectItem value="1.5rem">Medium</SelectItem>
                    <SelectItem value="1.8rem">Large</SelectItem>
                    <SelectItem value="2.2rem">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="definitionSize">Definition Size</Label>
                <Select
                  value={customization.typography.definitionSize}
                  onValueChange={(value) => updateTypography('definitionSize', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1rem">Small</SelectItem>
                    <SelectItem value="1.2rem">Medium</SelectItem>
                    <SelectItem value="1.4rem">Large</SelectItem>
                    <SelectItem value="1.6rem">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Layout Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Card Layout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardHeight">Card Height</Label>
              <Select
                value={customization.dimensions.cardHeight}
                onValueChange={(value) => updateDimensions('cardHeight', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="250px">Small (250px)</SelectItem>
                  <SelectItem value="300px">Medium (300px)</SelectItem>
                  <SelectItem value="350px">Large (350px)</SelectItem>
                  <SelectItem value="400px">Extra Large (400px)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Select
                value={customization.dimensions.borderRadius}
                onValueChange={(value) => updateDimensions('borderRadius', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4px">Small</SelectItem>
                  <SelectItem value="8px">Medium</SelectItem>
                  <SelectItem value="12px">Large</SelectItem>
                  <SelectItem value="20px">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Feature Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Study Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showProgress">Progress Bar</Label>
                <p className="text-sm text-gray-500">Show study progress</p>
              </div>
              <Switch
                id="showProgress"
                checked={customization.features.showProgress}
                onCheckedChange={(checked) => updateFeatures('showProgress', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showShuffle">Shuffle Button</Label>
                <p className="text-sm text-gray-500">Allow card shuffling</p>
              </div>
              <Switch
                id="showShuffle"
                checked={customization.features.showShuffle}
                onCheckedChange={(checked) => updateFeatures('showShuffle', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showCounter">Card Counter</Label>
                <p className="text-sm text-gray-500">Show current card number</p>
              </div>
              <Switch
                id="showCounter"
                checked={customization.features.showCounter}
                onCheckedChange={(checked) => updateFeatures('showCounter', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomizationPanel;
