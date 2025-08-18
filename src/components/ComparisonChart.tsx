import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Shield, Leaf, Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Material } from '@/types/Material';

interface ComparisonChartProps {
  materials: Material[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ materials }) => {
  const [selectedProperty, setSelectedProperty] = useState('tensileStrength');
  const [selectedCategory, setSelectedCategory] = useState('mechanical');

  const propertyCategories = {
    mechanical: [
      { key: 'tensileStrength', label: 'Tensile Strength', unit: 'MPa' },
      { key: 'yieldStrength', label: 'Yield Strength', unit: 'MPa' },
      { key: 'elongation', label: 'Elongation', unit: '%' },
      { key: 'hardness', label: 'Hardness', unit: 'HB' },
      { key: 'elasticModulus', label: 'Elastic Modulus', unit: 'GPa' },
      { key: 'compressiveStrength', label: 'Compressive Strength', unit: 'MPa' },
      { key: 'shearStrength', label: 'Shear Strength', unit: 'MPa' }
    ],
    thermal: [
      { key: 'meltingPoint', label: 'Melting Point', unit: '°C' },
      { key: 'thermalConductivity', label: 'Thermal Conductivity', unit: 'W/m·K' },
      { key: 'thermalExpansion', label: 'Thermal Expansion', unit: '10⁻⁶/K' },
      { key: 'specificHeat', label: 'Specific Heat', unit: 'J/kg·K' },
      { key: 'thermalDiffusivity', label: 'Thermal Diffusivity', unit: 'mm²/s' }
    ],
    electrical: [
      { key: 'electricalResistivity', label: 'Electrical Resistivity', unit: 'µΩ·cm' },
      { key: 'magneticPermeability', label: 'Magnetic Permeability', unit: 'relative' }
    ],
    physical: [
      { key: 'density', label: 'Density', unit: 'g/cm³' },
      { key: 'costPerKg', label: 'Cost per kg', unit: 'USD/kg' }
    ]
  };

  const currentProperties = propertyCategories[selectedCategory as keyof typeof propertyCategories];

  const barChartData = materials.map(material => ({
    name: material.designation,
    fullName: material.name,
    value: material.properties[selectedProperty as keyof typeof material.properties] as number,
    category: material.category
  }));

  const radarData = currentProperties.map(prop => {
    const dataPoint: any = { property: prop.label };
    materials.forEach(material => {
      const value = material.properties[prop.key as keyof typeof material.properties] as number;
      const normalizedValue = (value / getMaxValue(prop.key)) * 100;
      dataPoint[material.designation] = Math.round(normalizedValue);
    });
    return dataPoint;
  });

  // Compliance and sustainability analysis
  const complianceData = materials.map(material => ({
    name: material.designation,
    corrosionResistance: getComplianceScore(material.properties.corrosionResistance),
    weldability: getComplianceScore(material.properties.weldability),
    machinability: getComplianceScore(material.properties.machinability),
    recyclability: getComplianceScore(material.properties.recyclability),
    costIndex: material.costIndex,
    availability: material.availability
  }));

  function getComplianceScore(rating: string): number {
    const scores = { 'Poor': 1, 'Fair': 2, 'Good': 3, 'Excellent': 4 };
    return scores[rating as keyof typeof scores] || 0;
  }

  function getMaxValue(propertyKey: string): number {
    const maxValues: { [key: string]: number } = {
      tensileStrength: 2500, yieldStrength: 2000, elongation: 100, hardness: 500,
      meltingPoint: 1800, density: 10, elasticModulus: 250, thermalConductivity: 100,
      compressiveStrength: 3000, shearStrength: 1500, specificHeat: 1000,
      thermalDiffusivity: 50, electricalResistivity: 100, magneticPermeability: 1000,
      thermalExpansion: 25, costPerKg: 20
    };
    return maxValues[propertyKey] || 100;
  }

  // Environmental impact data
  const sustainabilityData = materials.map(material => ({
    name: material.designation,
    recyclability: getComplianceScore(material.properties.recyclability),
    costIndex: material.costIndex,
    corrosionResistance: getComplianceScore(material.properties.corrosionResistance)
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#87d068', '#ff6b6b'];

  return (
    <div className="w-full space-y-4">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg lg:text-xl text-cyan-400">Materials Intelligence Platform</CardTitle>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {materials.map((material, index) => (
              <Badge key={material.id} variant="outline" style={{ borderColor: colors[index % colors.length] }} className="text-xs">
                {material.designation}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="analysis" className="w-full">
        <div className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="grid grid-cols-6 bg-slate-800 min-w-[600px] lg:min-w-full">
              <TabsTrigger value="analysis" className="text-xs px-1 sm:px-2">Analysis</TabsTrigger>
              <TabsTrigger value="radar" className="text-xs px-1 sm:px-2">Multi-Prop</TabsTrigger>
              <TabsTrigger value="compliance" className="text-xs px-1 sm:px-2">Compliance</TabsTrigger>
              <TabsTrigger value="sustainability" className="text-xs px-1 sm:px-2">Eco-Audit</TabsTrigger>
              <TabsTrigger value="selection" className="text-xs px-1 sm:px-2">Selection</TabsTrigger>
              <TabsTrigger value="detailed" className="text-xs px-1 sm:px-2">Data Sheet</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="analysis" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col space-y-3">
                <CardTitle className="text-sm sm:text-base lg:text-lg">Property Analysis</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-xs sm:text-sm bg-slate-700 text-white border-slate-600"
                  >
                    {Object.entries(propertyCategories).map(([key, value]) => (
                      <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                    ))}
                  </select>
                  <select
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-xs sm:text-sm bg-slate-700 text-white border-slate-600"
                  >
                    {currentProperties.map(prop => (
                      <option key={prop.key} value={prop.key}>{prop.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <div className="h-[250px] sm:h-[300px] lg:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 10, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
                      stroke="#9CA3AF"
                      interval={0}
                    />
                    <YAxis stroke="#9CA3AF" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-base lg:text-lg">Multi-Property Comparison</CardTitle>
              <p className="text-xs sm:text-sm text-slate-400">Normalized values (0-100 scale)</p>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="property" tick={{ fontSize: 8, fill: '#9CA3AF' }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} />
                    {materials.map((material, index) => (
                      <Radar
                        key={material.id}
                        name={material.designation}
                        dataKey={material.designation}
                        stroke={colors[index % colors.length]}
                        fill={colors[index % colors.length]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    ))}
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                  Compliance & Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div className="h-[250px] sm:h-[300px] lg:h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={complianceData} margin={{ top: 10, right: 10, left: 10, bottom: 50 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        fontSize={10}
                        stroke="#9CA3AF"
                      />
                      <YAxis stroke="#9CA3AF" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="corrosionResistance" fill="#82ca9d" name="Corrosion Resistance" />
                      <Bar dataKey="weldability" fill="#8884d8" name="Weldability" />
                      <Bar dataKey="machinability" fill="#ffc658" name="Machinability" />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {materials.map((material, index) => (
                <Card key={material.id} className="bg-slate-800">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-xs sm:text-sm flex items-center">
                      <div 
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2" 
                        style={{ backgroundColor: colors[index % colors.length] }}
                      />
                      {material.designation}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <div className="grid grid-cols-1 gap-1">
                      <div className="flex items-center">
                        {material.properties.corrosionResistance === 'Excellent' ? 
                          <CheckCircle className="w-3 h-3 text-green-400 mr-1" /> : 
                          <XCircle className="w-3 h-3 text-red-400 mr-1" />
                        }
                        <span className="truncate">Corrosion: {material.properties.corrosionResistance}</span>
                      </div>
                      <div className="flex items-center">
                        {material.properties.weldability === 'Excellent' ? 
                          <CheckCircle className="w-3 h-3 text-green-400 mr-1" /> : 
                          <XCircle className="w-3 h-3 text-red-400 mr-1" />
                        }
                        <span className="truncate">Weldability: {material.properties.weldability}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {material.standards.slice(0, 2).map(standard => (
                        <Badge key={standard} variant="outline" className="text-xs">
                          {standard}
                        </Badge>
                      ))}
                      {material.standards.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{material.standards.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="mt-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
                  Environmental Impact Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div className="h-[250px] sm:h-[300px] lg:h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sustainabilityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} />
                      <YAxis stroke="#9CA3AF" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '12px'
                        }}
                      />
                      <Line type="monotone" dataKey="recyclability" stroke="#22c55e" name="Recyclability" strokeWidth={2} />
                      <Line type="monotone" dataKey="costIndex" stroke="#f59e0b" name="Cost Index" strokeWidth={2} />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {materials.map((material, index) => (
                <Card key={material.id} className="bg-slate-800">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-xs sm:text-sm">{material.designation}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">Recyclability</span>
                      <Badge variant={material.properties.recyclability === 'Excellent' ? 'default' : 'secondary'} className="text-xs">
                        {material.properties.recyclability}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">Cost Index</span>
                      <Badge variant={material.costIndex <= 3 ? 'default' : 'destructive'} className="text-xs">
                        {material.costIndex}/10
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">Availability</span>
                      <Badge variant={material.availability === 'Common' ? 'default' : 'secondary'} className="text-xs">
                        {material.availability}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="selection" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm sm:text-base lg:text-lg">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                Intelligent Material Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs sm:text-sm">
                  Material selection recommendations based on your requirements and constraints.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-xs sm:text-sm">Best Overall Performance</h4>
                  {materials
                    .sort((a, b) => (b.properties.tensileStrength / b.costIndex) - (a.properties.tensileStrength / a.costIndex))
                    .slice(0, 3)
                    .map((material, index) => (
                      <div key={material.id} className="flex items-center justify-between p-2 sm:p-3 bg-slate-700 rounded text-xs sm:text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{material.designation}</p>
                          <p className="text-slate-400 text-xs">Performance/Cost Ratio</p>
                        </div>
                        <Badge className={index === 0 ? 'bg-yellow-600' : index === 1 ? 'bg-gray-500' : 'bg-orange-600'}>
                          #{index + 1}
                        </Badge>
                      </div>
                    ))}
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-xs sm:text-sm">Most Cost-Effective</h4>
                  {materials
                    .sort((a, b) => a.costIndex - b.costIndex)
                    .slice(0, 3)
                    .map((material, index) => (
                      <div key={material.id} className="flex items-center justify-between p-2 sm:p-3 bg-slate-700 rounded text-xs sm:text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{material.designation}</p>
                          <p className="text-slate-400 text-xs">Cost Index: {material.costIndex}/10</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          ${material.properties.costPerKg}/kg
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-4">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base lg:text-lg text-white">Comprehensive Material Data</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left p-2 sm:p-3 font-medium sticky left-0 bg-slate-900 z-10 text-white border-r border-slate-600">Property</th>
                      {materials.map(material => (
                        <th key={material.id} className="text-left p-2 sm:p-3 font-medium min-w-[120px] text-white">
                          {material.designation}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(propertyCategories).map(([category, props]) => (
                      <React.Fragment key={category}>
                        <tr className="bg-slate-800">
                          <td colSpan={materials.length + 1} className="p-2 sm:p-3 font-semibold uppercase text-xs sticky left-0 bg-slate-800 z-10 text-cyan-400 border-r border-slate-600">
                            {category} Properties
                          </td>
                        </tr>
                        {props.map(prop => (
                          <tr key={prop.key} className="border-b border-slate-700 hover:bg-slate-800/50">
                            <td className="p-2 sm:p-3 font-medium sticky left-0 bg-slate-900 z-10 text-white border-r border-slate-600">{prop.label}</td>
                            {materials.map(material => (
                              <td key={material.id} className="p-2 sm:p-3 text-slate-200">
                                {material.properties[prop.key as keyof typeof material.properties]} {prop.unit}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                    <tr className="bg-slate-800">
                      <td colSpan={materials.length + 1} className="p-2 sm:p-3 font-semibold uppercase text-xs sticky left-0 bg-slate-800 z-10 text-cyan-400 border-r border-slate-600">
                        Processing & Quality
                      </td>
                    </tr>
                    <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                      <td className="p-2 sm:p-3 font-medium sticky left-0 bg-slate-900 z-10 text-white border-r border-slate-600">Corrosion Resistance</td>
                      {materials.map(material => (
                        <td key={material.id} className="p-2 sm:p-3">
                          <Badge variant="outline" className="text-xs text-white border-slate-500">{material.properties.corrosionResistance}</Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                      <td className="p-2 sm:p-3 font-medium sticky left-0 bg-slate-900 z-10 text-white border-r border-slate-600">Weldability</td>
                      {materials.map(material => (
                        <td key={material.id} className="p-2 sm:p-3">
                          <Badge variant="outline" className="text-xs text-white border-slate-500">{material.properties.weldability}</Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                      <td className="p-2 sm:p-3 font-medium sticky left-0 bg-slate-900 z-10 text-white border-r border-slate-600">Machinability</td>
                      {materials.map(material => (
                        <td key={material.id} className="p-2 sm:p-3">
                          <Badge variant="outline" className="text-xs text-white border-slate-500">{material.properties.machinability}</Badge>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComparisonChart;
