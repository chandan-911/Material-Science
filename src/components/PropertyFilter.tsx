
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterState {
  tensileStrength: { min: number; max: number };
  yieldStrength: { min: number; max: number };
  elongation: { min: number; max: number };
  hardness: { min: number; max: number };
  meltingPoint: { min: number; max: number };
  density: { min: number; max: number };
  category: string;
}

interface PropertyFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ filters, setFilters }) => {
  const updateFilter = (property: keyof FilterState, values: number[] | string) => {
    if (property === 'category') {
      setFilters(prev => ({ ...prev, [property]: values as string }));
    } else {
      const [min, max] = values as number[];
      setFilters(prev => ({ ...prev, [property]: { min, max } }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-white mb-3 block">Material Category</Label>
        <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
          <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Carbon Steel">Carbon Steel</SelectItem>
            <SelectItem value="Alloy Steel">Alloy Steel</SelectItem>
            <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
            <SelectItem value="Tool Steel">Tool Steel</SelectItem>
            <SelectItem value="Aluminum Alloy">Aluminum Alloy</SelectItem>
            <SelectItem value="Titanium Alloy">Titanium Alloy</SelectItem>
            <SelectItem value="Precipitation Hardening Stainless">PH Stainless</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-white mb-3 block">
          Tensile Strength (MPa): {filters.tensileStrength.min} - {filters.tensileStrength.max}
        </Label>
        <Slider
          value={[filters.tensileStrength.min, filters.tensileStrength.max]}
          onValueChange={(values) => updateFilter('tensileStrength', values)}
          max={2100}
          min={0}
          step={50}
          className="w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-white mb-3 block">
          Yield Strength (MPa): {filters.yieldStrength.min} - {filters.yieldStrength.max}
        </Label>
        <Slider
          value={[filters.yieldStrength.min, filters.yieldStrength.max]}
          onValueChange={(values) => updateFilter('yieldStrength', values)}
          max={1800}
          min={0}
          step={50}
          className="w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-white mb-3 block">
          Elongation (%): {filters.elongation.min} - {filters.elongation.max}
        </Label>
        <Slider
          value={[filters.elongation.min, filters.elongation.max]}
          onValueChange={(values) => updateFilter('elongation', values)}
          max={80}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-white mb-3 block">
          Hardness (HB): {filters.hardness.min} - {filters.hardness.max}
        </Label>
        <Slider
          value={[filters.hardness.min, filters.hardness.max]}
          onValueChange={(values) => updateFilter('hardness', values)}
          max={500}
          min={0}
          step={10}
          className="w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-white mb-3 block">
          Melting Point (°C): {filters.meltingPoint.min} - {filters.meltingPoint.max}
        </Label>
        <Slider
          value={[filters.meltingPoint.min, filters.meltingPoint.max]}
          onValueChange={(values) => updateFilter('meltingPoint', values)}
          max={1700}
          min={400}
          step={10}
          className="w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-white mb-3 block">
          Density (g/cm³): {filters.density.min} - {filters.density.max}
        </Label>
        <Slider
          value={[filters.density.min, filters.density.max]}
          onValueChange={(values) => updateFilter('density', values)}
          max={9}
          min={2}
          step={0.1}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PropertyFilter;
