import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Beaker, Calculator, Lightbulb } from 'lucide-react';
import { AlloyFormulation, MaterialProperties } from '@/types/Material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface AlloyDesignerProps {
  onSaveFormulation: (formulation: AlloyFormulation) => void;
}

const AlloyDesigner: React.FC<AlloyDesignerProps> = ({ onSaveFormulation }) => {
  const [formulation, setFormulation] = useState<Partial<AlloyFormulation>>({
    name: '',
    baseElement: 'Fe',
    additives: {},
    notes: ''
  });

  const [newAdditive, setNewAdditive] = useState({ element: '', percentage: 0 });

  const baseElements = [
    { symbol: 'Fe', name: 'Iron' },
    { symbol: 'Al', name: 'Aluminum' },
    { symbol: 'Ti', name: 'Titanium' },
    { symbol: 'Cu', name: 'Copper' },
    { symbol: 'Ni', name: 'Nickel' }
  ];

  const commonAdditives = [
    'C', 'Mn', 'Si', 'Cr', 'Ni', 'Mo', 'V', 'W', 'Co', 'Cu', 'Al', 'Ti', 'Nb', 'Ta'
  ];

  const steelAlloySuggestions = [
    {
      name: 'High Strength Low Alloy (HSLA)',
      composition: { C: 0.15, Mn: 1.5, Si: 0.5, Cr: 0.5, V: 0.1 },
      description: 'Excellent strength-to-weight ratio for automotive'
    },
    {
      name: 'Tool Steel (H13)',
      composition: { C: 0.4, Cr: 5.0, Mo: 1.3, V: 1.0, Si: 1.0 },
      description: 'Hot work tool steel with excellent toughness'
    },
    {
      name: 'Maraging Steel',
      composition: { C: 0.03, Ni: 18, Co: 9, Mo: 5, Ti: 0.4 },
      description: 'Ultra-high strength aerospace applications'
    },
    {
      name: 'Dual Phase Steel',
      composition: { C: 0.1, Mn: 2.0, Si: 0.3, Cr: 0.3, Mo: 0.2 },
      description: 'Automotive crash components'
    },
    {
      name: 'Super Duplex Stainless',
      composition: { C: 0.03, Cr: 25, Ni: 7, Mo: 4, N: 0.27 },
      description: 'Offshore and chemical processing'
    },
    {
      name: 'Electrical Steel',
      composition: { C: 0.005, Si: 3.2, Al: 0.3, Mn: 0.3 },
      description: 'Transformer cores and motors'
    }
  ];

  const addAdditive = () => {
    if (newAdditive.element && newAdditive.percentage > 0) {
      setFormulation(prev => ({
        ...prev,
        additives: {
          ...prev.additives,
          [newAdditive.element]: newAdditive.percentage
        }
      }));
      setNewAdditive({ element: '', percentage: 0 });
    }
  };

  const removeAdditive = (element: string) => {
    setFormulation(prev => {
      const newAdditives = { ...prev.additives };
      delete newAdditives[element];
      return { ...prev, additives: newAdditives };
    });
  };

  const applySuggestion = (suggestion: typeof steelAlloySuggestions[0]) => {
    setFormulation(prev => ({
      ...prev,
      name: suggestion.name,
      additives: suggestion.composition,
      notes: suggestion.description
    }));
  };

  const calculatePredictedProperties = (): Partial<MaterialProperties> => {
    const baseProps: Partial<MaterialProperties> = {
      tensileStrength: 400,
      yieldStrength: 250,
      density: 7.85,
      meltingPoint: 1538
    };

    Object.entries(formulation.additives || {}).forEach(([element, percentage]) => {
      switch (element) {
        case 'C':
          baseProps.tensileStrength = (baseProps.tensileStrength || 0) + percentage * 100;
          baseProps.yieldStrength = (baseProps.yieldStrength || 0) + percentage * 80;
          break;
        case 'Cr':
          baseProps.tensileStrength = (baseProps.tensileStrength || 0) + percentage * 20;
          baseProps.meltingPoint = (baseProps.meltingPoint || 0) + percentage * 5;
          break;
        case 'Ni':
          baseProps.yieldStrength = (baseProps.yieldStrength || 0) + percentage * 15;
          baseProps.density = (baseProps.density || 0) + percentage * 0.05;
          break;
        case 'Mo':
          baseProps.tensileStrength = (baseProps.tensileStrength || 0) + percentage * 40;
          break;
      }
    });

    return baseProps;
  };

  const saveFormulation = () => {
    const newFormulation: AlloyFormulation = {
      id: Date.now().toString(),
      name: formulation.name || 'Custom Alloy',
      baseElement: formulation.baseElement || 'Fe',
      additives: formulation.additives || {},
      predictedProperties: calculatePredictedProperties(),
      notes: formulation.notes || '',
      createdAt: new Date()
    };

    onSaveFormulation(newFormulation);
    
    setFormulation({
      name: '',
      baseElement: 'Fe',
      additives: {},
      notes: ''
    });
  };

  const totalPercentage = Object.values(formulation.additives || {}).reduce((sum, val) => sum + val, 0);
  const basePercentage = 100 - totalPercentage;

  // Prepare chart data
  const predictedProps = calculatePredictedProperties();
  const chartData = [{
    density: predictedProps.density || 7.85,
    strength: predictedProps.tensileStrength || 400,
    name: formulation.name || 'Current Design'
  }];

  // Reference materials for comparison
  const referenceData = [
    { density: 7.85, strength: 440, name: 'Mild Steel' },
    { density: 7.85, strength: 1280, name: 'AISI 4340' },
    { density: 8.0, strength: 580, name: 'SS 316' },
    { density: 2.7, strength: 276, name: 'Al 6061' },
    { density: 4.5, strength: 900, name: 'Ti-6Al-4V' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <Beaker className="w-6 h-6 mr-2" />
            Alloy Designer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Alloy Name</Label>
              <Input 
                value={formulation.name}
                onChange={(e) => setFormulation(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Custom Steel Alloy"
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Base Element</Label>
              <Select 
                value={formulation.baseElement} 
                onValueChange={(value) => setFormulation(prev => ({ ...prev, baseElement: value }))}
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {baseElements.map(element => (
                    <SelectItem key={element.symbol} value={element.symbol}>
                      {element.symbol} - {element.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyan-400">Composition</h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Select value={newAdditive.element} onValueChange={(value) => setNewAdditive(prev => ({ ...prev, element: value }))}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white w-full sm:w-32">
                  <SelectValue placeholder="Element" />
                </SelectTrigger>
                <SelectContent>
                  {commonAdditives.map(element => (
                    <SelectItem key={element} value={element}>{element}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                type="number"
                value={newAdditive.percentage}
                onChange={(e) => setNewAdditive(prev => ({ ...prev, percentage: parseFloat(e.target.value) || 0 }))}
                placeholder="% wt"
                className="bg-slate-800 border-slate-600 text-white w-full sm:w-24"
                step="0.1"
                min="0"
                max="50"
              />
              <Button 
                onClick={addAdditive}
                size="sm"
                className="bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-300">{formulation.baseElement} (Base)</span>
                <Badge variant="outline" className="text-cyan-400">
                  {basePercentage.toFixed(1)}%
                </Badge>
              </div>
              {Object.entries(formulation.additives || {}).map(([element, percentage]) => (
                <div key={element} className="flex items-center justify-between p-2 bg-slate-800 rounded">
                  <span className="text-slate-300">{element}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-cyan-400">
                      {percentage}%
                    </Badge>
                    <Button 
                      onClick={() => removeAdditive(element)}
                      size="sm"
                      variant="destructive"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {totalPercentage > 100 && (
              <div className="text-red-400 text-sm">
                Warning: Total percentage exceeds 100%
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Predicted Properties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-800 rounded">
              {Object.entries(calculatePredictedProperties()).map(([property, value]) => (
                <div key={property} className="text-sm">
                  <span className="text-slate-400 capitalize">{property.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                  <span className="text-white ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-slate-300">Notes</Label>
            <Textarea 
              value={formulation.notes}
              onChange={(e) => setFormulation(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add notes about this alloy formulation..."
              className="bg-slate-800 border-slate-600 text-white"
              rows={3}
            />
          </div>

          <Button 
            onClick={saveFormulation}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            disabled={!formulation.name || totalPercentage > 100}
          >
            <Beaker className="w-4 h-4 mr-2" />
            Save Alloy Formulation
          </Button>
        </CardContent>
      </Card>

      {/* Ashby-style Chart */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Material Property Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  dataKey="density" 
                  name="Density"
                  unit=" g/cm³"
                  stroke="#9CA3AF"
                  domain={[2, 9]}
                />
                <YAxis 
                  type="number" 
                  dataKey="strength" 
                  name="Tensile Strength"
                  unit=" MPa"
                  stroke="#9CA3AF"
                  domain={[200, 1400]}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Scatter 
                  name="Reference Materials" 
                  data={referenceData} 
                  fill="#6B7280"
                />
                <Scatter 
                  name="Your Design" 
                  data={chartData} 
                  fill="#06B6D4"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Steel Alloy Suggestions */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <Lightbulb className="w-6 h-6 mr-2" />
            Steel Alloy Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steelAlloySuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-white mb-2">{suggestion.name}</h4>
                <p className="text-sm text-slate-300 mb-3">{suggestion.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {Object.entries(suggestion.composition).map(([element, percentage]) => (
                    <Badge key={element} variant="outline" className="text-xs">
                      {element}: {percentage}%
                    </Badge>
                  ))}
                </div>
                <Button 
                  onClick={() => applySuggestion(suggestion)}
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Apply This Formula
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlloyDesigner;
