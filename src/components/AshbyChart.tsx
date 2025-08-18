
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Material } from '@/types/Material';

interface AshbyChartProps {
  materials: Material[];
  xProperty: keyof Material['properties'];
  yProperty: keyof Material['properties'];
}

const AshbyChart: React.FC<AshbyChartProps> = ({ materials, xProperty, yProperty }) => {
  const data = materials.map(material => ({
    name: material.designation,
    fullName: material.name,
    x: Number(material.properties[xProperty]) || 0,
    y: Number(material.properties[yProperty]) || 0,
    category: material.category,
    material: material
  })).filter(item => item.x > 0 && item.y > 0); // Filter out invalid data points

  const getCategoryColor = (category: string) => {
    const colors = {
      'Carbon Steel': '#8884d8',
      'Alloy Steel': '#82ca9d',
      'Stainless Steel': '#ffc658',
      'Tool Steel': '#ff7300',
      'Aluminum Alloy': '#8dd1e1',
      'Titanium Alloy': '#d084d0',
      'Precipitation Hardening Stainless': '#87d068'
    };
    return colors[category as keyof typeof colors] || '#888888';
  };

  const getPropertyLabel = (property: string) => {
    const labels = {
      tensileStrength: 'Tensile Strength (MPa)',
      yieldStrength: 'Yield Strength (MPa)',
      density: 'Density (g/cm³)',
      thermalConductivity: 'Thermal Conductivity (W/m·K)',
      elasticModulus: 'Elastic Modulus (GPa)',
      elongation: 'Elongation (%)',
      hardness: 'Hardness (HB)',
      meltingPoint: 'Melting Point (°C)',
      costPerKg: 'Cost per kg (USD)',
      specificHeat: 'Specific Heat (J/kg·K)',
      compressiveStrength: 'Compressive Strength (MPa)',
      shearStrength: 'Shear Strength (MPa)',
      thermalExpansion: 'Thermal Expansion (10⁻⁶/K)',
      thermalDiffusivity: 'Thermal Diffusivity (mm²/s)',
      electricalResistivity: 'Electrical Resistivity (Ω·m)',
      magneticPermeability: 'Magnetic Permeability',
      weldability: 'Weldability',
      machinability: 'Machinability',
      corrosionResistance: 'Corrosion Resistance'
    };
    return labels[property as keyof typeof labels] || property;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg text-white">
          <p className="font-semibold text-cyan-400">{data.name}</p>
          <p className="text-sm text-slate-300">{data.fullName}</p>
          <p className="text-sm text-slate-300">{data.category}</p>
          <p className="text-sm text-white">
            {getPropertyLabel(xProperty)}: {data.x}
          </p>
          <p className="text-sm text-white">
            {getPropertyLabel(yProperty)}: {data.y}
          </p>
        </div>
      );
    }
    return null;
  };

  const uniqueCategories = [...new Set(materials.map(m => m.category))];

  // Calculate domains with padding
  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  
  const xPadding = (xMax - xMin) * 0.1;
  const yPadding = (yMax - yMin) * 0.1;

  return (
    <Card className="bg-slate-800 border-slate-600 w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Ashby Chart: {getPropertyLabel(yProperty)} vs {getPropertyLabel(xProperty)}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart 
              margin={{ 
                top: 20, 
                right: 20, 
                bottom: 60, 
                left: 60 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                type="number" 
                dataKey="x" 
                name={getPropertyLabel(xProperty)}
                domain={[xMin - xPadding, xMax + xPadding]}
                stroke="#9CA3AF"
                fontSize={12}
                label={{ 
                  value: getPropertyLabel(xProperty), 
                  position: 'insideBottom', 
                  offset: -10,
                  style: { textAnchor: 'middle', fill: '#9CA3AF', fontSize: '12px' }
                }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name={getPropertyLabel(yProperty)}
                domain={[yMin - yPadding, yMax + yPadding]}
                stroke="#9CA3AF"
                fontSize={12}
                label={{ 
                  value: getPropertyLabel(yProperty), 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#9CA3AF', fontSize: '12px' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  fontSize: '12px'
                }}
              />
              {uniqueCategories.map(category => (
                <Scatter
                  key={category}
                  name={category}
                  data={data.filter(d => d.category === category)}
                  fill={getCategoryColor(category)}
                  stroke={getCategoryColor(category)}
                  strokeWidth={1}
                  r={4}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        {data.length === 0 && (
          <div className="flex items-center justify-center h-[300px] text-slate-400">
            <div className="text-center">
              <p className="text-lg font-medium">No valid data points</p>
              <p className="text-sm">Check if materials have valid property values</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AshbyChart;
