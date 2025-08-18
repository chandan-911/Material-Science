import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Plane, Ship, Waves, Cog, ArrowRight, ChevronLeft, Atom, Target, Zap } from 'lucide-react';
import AlloyDesigner from './AlloyDesigner';
import { AlloyFormulation } from '@/types/Material';

interface ApplicationFirstWorkflowProps {
  onSaveFormulation: (formulation: AlloyFormulation) => void;
}

const ApplicationFirstWorkflow: React.FC<ApplicationFirstWorkflowProps> = ({ onSaveFormulation }) => {
  const [selectedApplication, setSelectedApplication] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'select' | 'design'>('select');

  const applications = [
    {
      key: 'automotive',
      icon: Car,
      name: 'Automotive Industry',
      description: 'Design alloys for vehicles, engines, and automotive components',
      requirements: ['High strength-to-weight ratio', 'Fatigue resistance', 'Cost effectiveness', 'Crash safety'],
      commonElements: ['Fe', 'Al', 'Mg', 'C', 'Mn', 'Si', 'Cr'],
      targetProperties: {
        tensileStrength: '400-1200 MPa',
        density: '2.7-7.8 g/cm³',
        costTarget: 'Low to Medium'
      },
      color: 'from-blue-600 to-cyan-600'
    },
    {
      key: 'aerospace',
      icon: Plane,
      name: 'Aerospace Industry',
      description: 'Create lightweight, high-performance alloys for aircraft',
      requirements: ['Ultra-high strength-to-weight', 'Temperature resistance', 'Reliability', 'Corrosion resistance'],
      commonElements: ['Al', 'Ti', 'Ni', 'Cr', 'Co', 'Mo', 'V'],
      targetProperties: {
        tensileStrength: '800-1600 MPa',
        density: '2.7-4.5 g/cm³',
        costTarget: 'High performance priority'
      },
      color: 'from-purple-600 to-blue-600'
    },
    {
      key: 'marine',
      icon: Ship,
      name: 'Marine Industry',
      description: 'Develop corrosion-resistant alloys for marine environments',
      requirements: ['Excellent corrosion resistance', 'Seawater compatibility', 'Durability', 'Weldability'],
      commonElements: ['Al', 'Cu', 'Ni', 'Cr', 'Mo', 'Zn', 'Mg'],
      targetProperties: {
        tensileStrength: '300-800 MPa',
        density: '2.7-8.9 g/cm³',
        costTarget: 'Medium'
      },
      color: 'from-teal-600 to-blue-600'
    },
    {
      key: 'submarine',
      icon: Waves,
      name: 'Submarine Systems',
      description: 'Engineer high-pressure resistant alloys for underwater applications',
      requirements: ['Extreme pressure resistance', 'Corrosion immunity', 'High strength', 'Non-magnetic properties'],
      commonElements: ['Ti', 'Ni', 'Cr', 'Mo', 'V', 'Al', 'Zr'],
      targetProperties: {
        tensileStrength: '1000-1800 MPa',
        density: '4.5-8.0 g/cm³',
        costTarget: 'Performance critical'
      },
      color: 'from-indigo-600 to-purple-600'
    },
    {
      key: 'machinery',
      icon: Cog,
      name: 'Industrial Machinery',
      description: 'Build robust alloys for industrial equipment and tools',
      requirements: ['Wear resistance', 'High hardness', 'Thermal stability', 'Precision manufacturing'],
      commonElements: ['Fe', 'Cr', 'V', 'W', 'Mo', 'Co', 'C'],
      targetProperties: {
        tensileStrength: '600-2000 MPa',
        density: '7.0-8.5 g/cm³',
        costTarget: 'Balanced'
      },
      color: 'from-orange-600 to-red-600'
    }
  ];

  const selectedApp = applications.find(app => app.key === selectedApplication);

  const handleApplicationSelect = (appKey: string) => {
    setSelectedApplication(appKey);
    setCurrentStep('design');
  };

  const handleBackToSelection = () => {
    setCurrentStep('select');
    setSelectedApplication('');
  };

  if (currentStep === 'design' && selectedApp) {
    return (
      <div className="space-y-6">
        {/* Header with selected application */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={handleBackToSelection}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back to Selection
                </Button>
                <div className="flex items-center space-x-3">
                  <selectedApp.icon className="w-8 h-8 text-cyan-400" />
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedApp.name}</h2>
                    <p className="text-slate-300">{selectedApp.description}</p>
                  </div>
                </div>
              </div>
              <Badge className={`bg-gradient-to-r ${selectedApp.color} text-white px-4 py-2`}>
                <Target className="w-4 h-4 mr-2" />
                Active Design
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-400 mb-2">Target Properties</h4>
                <div className="space-y-1 text-sm text-slate-300">
                  <div>Strength: {selectedApp.targetProperties.tensileStrength}</div>
                  <div>Density: {selectedApp.targetProperties.density}</div>
                  <div>Cost: {selectedApp.targetProperties.costTarget}</div>
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Key Requirements</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedApp.requirements.slice(0, 3).map((req, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs text-green-300 border-green-500/30">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-400 mb-2">Recommended Elements</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedApp.commonElements.slice(0, 6).map((element, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs text-purple-300 border-purple-500/30">
                      {element}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application-specific Alloy Designer */}
        <AlloyDesigner onSaveFormulation={onSaveFormulation} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="text-center space-y-4 py-12">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-3">
            <Atom className="w-12 h-12 text-cyan-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Professional Alloy Designer
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-lg mt-2">
          Select your target application to begin intelligent alloy formulation
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
          <Zap className="w-4 h-4" />
          <span>Industry-Specific • Property-Optimized • Performance-Driven</span>
        </div>
      </div>

      {/* Application Selection Cards */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-center text-2xl">
            Choose Your Target Application
          </CardTitle>
          <p className="text-slate-300 text-center">
            Select the industry and application to access specialized alloy design tools
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => {
              const Icon = app.icon;
              return (
                <Card
                  key={app.key}
                  className="bg-slate-800 border-slate-600 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onClick={() => handleApplicationSelect(app.key)}
                >
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${app.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-white text-lg mb-2">{app.name}</h3>
                        <p className="text-slate-300 text-sm mb-4">{app.description}</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-semibold text-cyan-400 mb-2">KEY REQUIREMENTS</h4>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {app.requirements.slice(0, 2).map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs text-slate-300 border-slate-500">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-purple-400 mb-2">TARGET ELEMENTS</h4>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {app.commonElements.slice(0, 4).map((element, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs text-purple-300 border-purple-500/30">
                                {element}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button className={`w-full bg-gradient-to-r ${app.color} hover:opacity-90 text-white group-hover:shadow-lg transition-all duration-300`}>
                        <span>Design Alloy</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Professional Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">Application-Specific</h3>
            <p className="text-slate-300 text-sm">Tailored alloy recommendations based on your specific industry requirements</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-green-500/20">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">Property Optimization</h3>
            <p className="text-slate-300 text-sm">Intelligent property prediction and optimization for maximum performance</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-purple-500/20">
          <CardContent className="p-6 text-center">
            <Atom className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">Professional Tools</h3>
            <p className="text-slate-300 text-sm">Industry-grade alloy design tools with real-time property calculations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationFirstWorkflow;
