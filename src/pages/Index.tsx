import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, BarChart3, Grid, List, Zap, Atom, Lightbulb, FileText, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MaterialCard from '@/components/MaterialCard';
import PropertyFilter from '@/components/PropertyFilter';
import ComparisonChart from '@/components/ComparisonChart';
import AshbyChart from '@/components/AshbyChart';
import ApplicationFirstWorkflow from '@/components/ApplicationFirstWorkflow';
import ApplicationSelector from '@/components/ApplicationSelector';
import { expandedMaterialsDatabase } from '@/data/expandedMaterialsDatabase';
import { exportMaterialsAsPDF, exportChartAsPDF } from '@/utils/pdfExport';
import { Material, UserNote, AlloyFormulation } from '@/types/Material';
const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [userNotes, setUserNotes] = useState<UserNote[]>([]);
  const [alloyFormulations, setAlloyFormulations] = useState<AlloyFormulation[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [filters, setFilters] = useState({
    tensileStrength: {
      min: 0,
      max: 2000
    },
    yieldStrength: {
      min: 0,
      max: 1800
    },
    elongation: {
      min: 0,
      max: 80
    },
    hardness: {
      min: 0,
      max: 500
    },
    meltingPoint: {
      min: 400,
      max: 1700
    },
    density: {
      min: 2,
      max: 9
    },
    category: 'all'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [ashbyChart, setAshbyChart] = useState({
    xProperty: 'density' as keyof Material['properties'],
    yProperty: 'tensileStrength' as keyof Material['properties']
  });
  const filteredMaterials = useMemo(() => {
    return expandedMaterialsDatabase.filter(material => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) || material.designation.toLowerCase().includes(searchTerm.toLowerCase()) || material.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = material.properties.tensileStrength >= filters.tensileStrength.min && material.properties.tensileStrength <= filters.tensileStrength.max && material.properties.yieldStrength >= filters.yieldStrength.min && material.properties.yieldStrength <= filters.yieldStrength.max && material.properties.elongation >= filters.elongation.min && material.properties.elongation <= filters.elongation.max && material.properties.hardness >= filters.hardness.min && material.properties.hardness <= filters.hardness.max && material.properties.meltingPoint >= filters.meltingPoint.min && material.properties.meltingPoint <= filters.meltingPoint.max && material.properties.density >= filters.density.min && material.properties.density <= filters.density.max && (filters.category === 'all' || material.category === filters.category);
      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters]);
  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterials(prev => {
      const exists = prev.find(m => m.id === material.id);
      if (exists) {
        return prev.filter(m => m.id !== material.id);
      }
      return [...prev, material];
    });
  };
  const exportData = async () => {
    await exportMaterialsAsPDF(selectedMaterials, 'Material Selection Report');
  };
  const saveNote = () => {
    if (currentNote.trim() && selectedMaterials.length > 0) {
      const newNote: UserNote = {
        id: Date.now().toString(),
        materialId: selectedMaterials[0].id,
        content: currentNote,
        timestamp: new Date(),
        tags: []
      };
      setUserNotes(prev => [...prev, newNote]);
      setCurrentNote('');
    }
  };
  const handleApplicationSelect = (materials: Material[]) => {
    console.log('Application-specific materials:', materials);
  };
  const handleAlloyFormulation = (formulation: AlloyFormulation) => {
    setAlloyFormulations(prev => [...prev, formulation]);
  };

  // Filters sidebar component for mobile
  const FiltersSidebar = () => <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20">
      <CardHeader>
        <CardTitle className="flex items-center text-cyan-400">
          <Filter className="w-5 h-5 mr-2" />
          Smart Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Search Materials</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input placeholder="Search materials, properties..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400" />
          </div>
        </div>
        <PropertyFilter filters={filters} setFilters={setFilters} />
      </CardContent>
    </Card>;
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Responsive Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4 min-w-0 flex-1">
              <div className="flex items-center space-x-2 min-w-0">
                <Atom className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400 animate-pulse flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    MatSelect AI
                  </h1>
                  <p className="text-slate-400 text-xs lg:text-sm hidden sm:block">Advanced Material Intelligence Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
              <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-1 sm:px-2 lg:px-4 py-1 lg:py-2 text-xs">
                <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                <span className="hidden sm:inline">{filteredMaterials.length}</span>
                <span className="sm:hidden">{filteredMaterials.length}</span>
              </Badge>
              <Button onClick={exportData} disabled={selectedMaterials.length === 0} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-2 sm:px-3 lg:px-4" size="sm">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-0 sm:mr-1 lg:mr-2" />
                <span className="hidden sm:inline text-xs lg:text-sm">Export ({selectedMaterials.length})</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
              <FiltersSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="designer" className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 space-y-3 sm:space-y-0">
                <div className="w-full">
                  <div className="overflow-x-auto pb-2">
                    <TabsList className="bg-slate-800 border-slate-600 flex gap-1 h-auto p-2 min-w-[600px] lg:min-w-0 ml-0 px-[4px] py-[4px] my-0 mx-[10px] rounded">
                      <TabsTrigger value="designer" className="data-[state=active]:bg-cyan-600 text-xs px-3 py-2 flex-shrink-0">
                        <Atom className="w-3 h-3 mr-1" />
                        Alloy Designer
                      </TabsTrigger>
                      <TabsTrigger value="materials" className="data-[state=active]:bg-cyan-600 text-xs px-3 py-2 flex-shrink-0">
                        <Grid className="w-3 h-3 mr-1" />
                        Materials
                      </TabsTrigger>
                      <TabsTrigger value="comparison" disabled={selectedMaterials.length < 2} className="data-[state=active]:bg-cyan-600 text-xs px-3 py-2 flex-shrink-0">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Compare
                      </TabsTrigger>
                      <TabsTrigger value="ashby" className="data-[state=active]:bg-cyan-600 text-xs px-3 py-2 flex-shrink-0">
                        <Zap className="w-3 h-3 mr-1" />
                        Charts
                      </TabsTrigger>
                      <TabsTrigger value="applications" className="data-[state=active]:bg-cyan-600 text-xs px-3 py-2 flex-shrink-0">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Apps
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="data-[state=active]:bg-cyan-600 text-xs px-3 py-2 flex-shrink-0">
                        <FileText className="w-3 h-3 mr-1" />
                        Notes
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                  {/* Mobile Filter Button */}
                  <div className="lg:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 text-xs px-2 py-1">
                          <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 bg-slate-900 border-slate-700">
                        <FiltersSidebar />
                      </SheetContent>
                    </Sheet>
                  </div>
                  
                  {/* View Mode Buttons */}
                  <div className="flex space-x-1">
                    <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')} className="bg-slate-700 border-slate-600 px-2 py-1">
                      <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')} className="bg-slate-700 border-slate-600 px-2 py-1">
                      <List className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tab Contents */}
              <TabsContent value="designer">
                <ApplicationFirstWorkflow onSaveFormulation={handleAlloyFormulation} />
                
                {alloyFormulations.length > 0 && <Card className="bg-slate-800 border-slate-600 mt-4 sm:mt-6">
                    <CardHeader>
                      <CardTitle className="text-cyan-400 text-sm sm:text-base">Saved Formulations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {alloyFormulations.map(formulation => <div key={formulation.id} className="p-3 sm:p-4 bg-slate-700 rounded">
                            <h3 className="font-semibold text-white text-sm sm:text-base">{formulation.name}</h3>
                            <p className="text-xs sm:text-sm text-slate-300">Base: {formulation.baseElement}</p>
                            <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                              {Object.entries(formulation.additives).map(([element, percentage]) => <Badge key={element} variant="outline" className="text-cyan-400 text-xs">
                                  {element}: {percentage}%
                                </Badge>)}
                            </div>
                          </div>)}
                      </div>
                    </CardContent>
                  </Card>}
              </TabsContent>

              <TabsContent value="materials">
                {filteredMaterials.length === 0 ? <Card className="bg-slate-800 border-slate-600">
                    <CardContent className="text-center py-6 sm:py-8 lg:py-12">
                      <div className="text-slate-400">
                        <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm sm:text-base lg:text-lg font-medium">No materials found</p>
                        <p className="text-xs sm:text-sm">Try adjusting your search criteria or filters</p>
                      </div>
                    </CardContent>
                  </Card> : <div className={`grid gap-3 sm:gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredMaterials.map(material => <MaterialCard key={material.id} material={material} isSelected={selectedMaterials.some(m => m.id === material.id)} onSelect={() => handleMaterialSelect(material)} viewMode={viewMode} />)}
                  </div>}
              </TabsContent>

              <TabsContent value="comparison">
                {selectedMaterials.length >= 2 ? <div className="space-y-4 sm:space-y-6">
                    <div className="flex justify-end">
                      <Button onClick={() => exportChartAsPDF('comparison-charts', 'Material Comparison')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs px-3 py-2" size="sm">
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Export Charts</span>
                      </Button>
                    </div>
                    <div id="comparison-charts">
                      <ComparisonChart materials={selectedMaterials} />
                    </div>
                  </div> : <Card className="bg-slate-800 border-slate-600">
                    <CardContent className="text-center py-6 sm:py-8 lg:py-12">
                      <div className="text-slate-400">
                        <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm sm:text-base lg:text-lg font-medium">Select at least 2 materials to compare</p>
                        <p className="text-xs sm:text-sm">Choose materials from the materials tab to see detailed comparisons</p>
                      </div>
                    </CardContent>
                  </Card>}
              </TabsContent>

              <TabsContent value="ashby">
                <div className="space-y-4 sm:space-y-6">
                  <Card className="bg-slate-800 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-cyan-400 text-sm sm:text-base">Ashby Chart Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-xs sm:text-sm font-medium text-slate-300 mb-2 block">X-Axis Property</label>
                          <select value={ashbyChart.xProperty} onChange={e => setAshbyChart(prev => ({
                          ...prev,
                          xProperty: e.target.value as keyof Material['properties']
                        }))} className="w-full p-2 bg-slate-700 border-slate-600 rounded text-white text-xs sm:text-sm">
                            <option value="density">Density</option>
                            <option value="tensileStrength">Tensile Strength</option>
                            <option value="elasticModulus">Elastic Modulus</option>
                            <option value="thermalConductivity">Thermal Conductivity</option>
                            <option value="costPerKg">Cost per kg</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs sm:text-sm font-medium text-slate-300 mb-2 block">Y-Axis Property</label>
                          <select value={ashbyChart.yProperty} onChange={e => setAshbyChart(prev => ({
                          ...prev,
                          yProperty: e.target.value as keyof Material['properties']
                        }))} className="w-full p-2 bg-slate-700 border-slate-600 rounded text-white text-xs sm:text-sm">
                            <option value="tensileStrength">Tensile Strength</option>
                            <option value="yieldStrength">Yield Strength</option>
                            <option value="elasticModulus">Elastic Modulus</option>
                            <option value="thermalConductivity">Thermal Conductivity</option>
                            <option value="elongation">Elongation</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div id="ashby-chart" className="w-full">
                    <AshbyChart materials={filteredMaterials} xProperty={ashbyChart.xProperty} yProperty={ashbyChart.yProperty} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="applications">
                <ApplicationSelector materials={filteredMaterials} onApplicationSelect={handleApplicationSelect} />
              </TabsContent>

              <TabsContent value="notes">
                <div className="space-y-4 sm:space-y-6">
                  <Card className="bg-slate-800 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-cyan-400 text-sm sm:text-base">Add Research Note</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedMaterials.length > 0 && <div>
                          <p className="text-xs sm:text-sm text-slate-300 mb-2">Selected Material:</p>
                          <Badge className="bg-cyan-600 text-xs">{selectedMaterials[0].name}</Badge>
                        </div>}
                      <Textarea value={currentNote} onChange={e => setCurrentNote(e.target.value)} placeholder="Add your research notes, observations, or analysis..." className="bg-slate-700 border-slate-600 text-white text-xs sm:text-sm" rows={4} />
                      <Button onClick={saveNote} disabled={!currentNote.trim() || selectedMaterials.length === 0} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-xs sm:text-sm" size="sm">
                        Save Note
                      </Button>
                    </CardContent>
                  </Card>

                  {userNotes.length > 0 && <Card className="bg-slate-800 border-slate-600">
                      <CardHeader>
                        <CardTitle className="text-cyan-400 text-sm sm:text-base">Research Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                          {userNotes.map(note => <div key={note.id} className="p-3 sm:p-4 bg-slate-700 rounded">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                                <Badge variant="outline" className="text-cyan-400 text-xs w-fit">
                                  Material ID: {note.materialId}
                                </Badge>
                                <span className="text-xs text-slate-400">
                                  {note.timestamp.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-slate-200 text-xs sm:text-sm">{note.content}</p>
                            </div>)}
                        </div>
                      </CardContent>
                    </Card>}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;