
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, Plane, Ship, Building, Cpu, Wrench, Zap, Heart, Cog } from 'lucide-react';
import { Material } from '@/types/Material';

interface ApplicationSelectorProps {
  materials: Material[];
  onApplicationSelect: (selectedMaterials: Material[]) => void;
}

const ApplicationSelector: React.FC<ApplicationSelectorProps> = ({ materials, onApplicationSelect }) => {
  const [selectedApplication, setSelectedApplication] = useState<string>('');

  const applications = [
    { 
      key: 'automotive', 
      icon: Car, 
      name: 'Automotive',
      description: 'Vehicle components, engines, chassis',
      requirements: ['High strength', 'Fatigue resistance', 'Cost effective']
    },
    { 
      key: 'aerospace', 
      icon: Plane, 
      name: 'Aerospace',
      description: 'Aircraft structures, engine components',
      requirements: ['High strength-to-weight', 'Temperature resistance', 'Reliability']
    },
    { 
      key: 'marine', 
      icon: Ship, 
      name: 'Marine',
      description: 'Ship hulls, propellers, offshore structures',
      requirements: ['Corrosion resistance', 'Seawater compatibility', 'Durability']
    },
    { 
      key: 'construction', 
      icon: Building, 
      name: 'Construction',
      description: 'Structural steel, reinforcement, facades',
      requirements: ['High strength', 'Weldability', 'Cost effective']
    },
    { 
      key: 'electronics', 
      icon: Cpu, 
      name: 'Electronics',
      description: 'Enclosures, heat sinks, connectors',
      requirements: ['Electrical properties', 'Thermal management', 'EMI shielding']
    },
    { 
      key: 'appliances', 
      icon: Wrench, 
      name: 'Appliances',
      description: 'Kitchen equipment, HVAC, white goods',
      requirements: ['Corrosion resistance', 'Food safety', 'Durability']
    },
    { 
      key: 'energy', 
      icon: Zap, 
      name: 'Energy',
      description: 'Power generation, transmission, storage',
      requirements: ['High temperature', 'Creep resistance', 'Long-term stability']
    },
    { 
      key: 'medical', 
      icon: Heart, 
      name: 'Medical',
      description: 'Implants, surgical instruments, equipment',
      requirements: ['Biocompatibility', 'Corrosion resistance', 'Sterility']
    },
    { 
      key: 'machinery', 
      icon: Cog, 
      name: 'Machinery',
      description: 'Industrial equipment, tools, precision parts',
      requirements: ['Wear resistance', 'Precision', 'Reliability']
    }
  ];

  const selectApplication = (appKey: string) => {
    setSelectedApplication(appKey);
    
    // Filter materials based on application
    const suitableMaterials = materials.filter(material => {
      const appMaterials = material.applications[appKey as keyof typeof material.applications];
      return appMaterials && appMaterials.length > 0;
    });

    // Sort by suitability score (simplified scoring)
    suitableMaterials.sort((a, b) => {
      const scoreA = calculateSuitabilityScore(a, appKey);
      const scoreB = calculateSuitabilityScore(b, appKey);
      return scoreB - scoreA;
    });

    onApplicationSelect(suitableMaterials);
  };

  const calculateSuitabilityScore = (material: Material, application: string): number => {
    let score = 0;
    
    // Base score from number of applications in this category
    const appCount = material.applications[application as keyof typeof material.applications]?.length || 0;
    score += appCount * 10;
    
    // Application-specific scoring
    switch (application) {
      case 'automotive':
        score += material.properties.tensileStrength * 0.01;
        score += material.properties.fatigueLimitMPa * 0.02;
        score -= material.costIndex * 5;
        break;
      case 'aerospace':
        score += (material.properties.tensileStrength / material.properties.density) * 0.1;
        score += material.properties.meltingPoint * 0.001;
        break;
      case 'marine':
        score += material.properties.corrosionResistance === 'Excellent' ? 50 : 
                 material.properties.corrosionResistance === 'Good' ? 30 : 0;
        break;
      case 'medical':
        score += material.properties.corrosionResistance === 'Excellent' ? 40 : 0;
        score += material.category === 'Stainless Steel' ? 30 : 0;
        score += material.category === 'Titanium Alloy' ? 50 : 0;
        break;
    }
    
    return score;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-400">Select Application</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => {
              const Icon = app.icon;
              return (
                <Card 
                  key={app.key}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedApplication === app.key 
                      ? 'bg-purple-900/50 border-purple-400' 
                      : 'bg-slate-800 border-slate-600 hover:border-purple-500/50'
                  }`}
                  onClick={() => selectApplication(app.key)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="w-6 h-6 text-purple-400" />
                      <h3 className="font-semibold text-white">{app.name}</h3>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{app.description}</p>
                    <div className="space-y-1">
                      {app.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs text-purple-300 border-purple-500/30">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationSelector;
