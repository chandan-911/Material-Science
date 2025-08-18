
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Zap, Thermometer, Weight, Wrench } from 'lucide-react';
import { Material } from '@/types/Material';

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onSelect: () => void;
  viewMode: 'grid' | 'list';
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, isSelected, onSelect, viewMode }) => {
  // Get all applications as a flat array
  const getAllApplications = () => {
    const allApps: string[] = [];
    Object.values(material.applications).forEach(categoryApps => {
      allApps.push(...categoryApps);
    });
    return allApps;
  };

  const applications = getAllApplications();

  if (viewMode === 'list') {
    return (
      <Card className={`bg-gradient-to-r from-slate-800 to-slate-700 border-l-4 transition-all duration-300 hover:shadow-xl ${
        isSelected ? 'border-l-cyan-400 shadow-cyan-400/20' : 'border-l-slate-600'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSelect}
                  className="p-0 h-auto hover:bg-transparent"
                >
                  {isSelected ? (
                    <CheckCircle className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-400" />
                  )}
                </Button>
                <div>
                  <h3 className="text-lg font-semibold text-white">{material.name}</h3>
                  <p className="text-sm text-slate-300">{material.designation} • {material.category}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-cyan-400 font-semibold">{material.properties.tensileStrength}</div>
                <div className="text-slate-400">MPa</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-semibold">{material.properties.yieldStrength}</div>
                <div className="text-slate-400">MPa</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-semibold">{material.properties.density}</div>
                <div className="text-slate-400">g/cm³</div>
              </div>
              <div className="text-center">
                <Badge variant="outline" className={`
                  ${material.costIndex <= 3 ? 'text-green-400 border-green-400' : 
                    material.costIndex <= 6 ? 'text-yellow-400 border-yellow-400' : 
                    'text-red-400 border-red-400'}
                `}>
                  Cost: {material.costIndex}/10
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gradient-to-br from-slate-800 to-slate-700 border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
      isSelected ? 'border-cyan-400 shadow-cyan-400/20' : 'border-slate-600'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-lg mb-1">{material.name}</CardTitle>
            <p className="text-slate-300 text-sm">{material.designation}</p>
            <Badge variant="outline" className="text-cyan-400 border-cyan-400 mt-2">
              {material.category}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelect}
            className="p-0 h-auto hover:bg-transparent"
          >
            {isSelected ? (
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            ) : (
              <Circle className="w-6 h-6 text-slate-400" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Properties */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-cyan-400">
              <Zap className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">TENSILE</span>
            </div>
            <div className="text-white font-semibold">{material.properties.tensileStrength} MPa</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-green-400">
              <Weight className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">DENSITY</span>
            </div>
            <div className="text-white font-semibold">{material.properties.density} g/cm³</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-orange-400">
              <Thermometer className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">MELTING PT</span>
            </div>
            <div className="text-white font-semibold">{material.properties.meltingPoint}°C</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-purple-400">
              <Wrench className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">HARDNESS</span>
            </div>
            <div className="text-white font-semibold">{material.properties.hardness} HB</div>
          </div>
        </div>

        {/* Cost and Availability */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-600">
          <Badge variant="outline" className={`
            ${material.costIndex <= 3 ? 'text-green-400 border-green-400' : 
              material.costIndex <= 6 ? 'text-yellow-400 border-yellow-400' : 
              'text-red-400 border-red-400'}
          `}>
            Cost: {material.costIndex}/10
          </Badge>
          <Badge variant="outline" className="text-slate-300 border-slate-500">
            {material.availability}
          </Badge>
        </div>

        {/* Applications Preview */}
        {applications.length > 0 && (
          <div className="pt-2 border-t border-slate-600">
            <div className="text-xs text-slate-400 mb-2">APPLICATIONS</div>
            <div className="flex flex-wrap gap-1">
              {applications.slice(0, 3).map((app, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                  {app}
                </Badge>
              ))}
              {applications.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                  +{applications.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
