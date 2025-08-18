
export interface MaterialProperties {
  // Mechanical Properties
  tensileStrength: number; // MPa
  yieldStrength: number; // MPa
  elongation: number; // %
  hardness: number; // HB/HRC/HV
  elasticModulus: number; // GPa
  poissonRatio: number;
  fatigueLimitMPa: number; // MPa
  impactEnergy: number; // J
  compressiveStrength: number; // MPa
  shearStrength: number; // MPa
  
  // Thermal Properties
  meltingPoint: number; // °C
  thermalConductivity: number; // W/m·K
  thermalExpansion: number; // µm/m·K
  specificHeat: number; // J/kg·K
  thermalDiffusivity: number; // mm²/s
  
  // Physical Properties
  density: number; // g/cm³
  electricalResistivity: number; // µΩ·cm
  magneticPermeability: number; // relative
  
  // Environmental Properties
  corrosionResistance: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  weldability: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  machinability: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  oxidationResistance: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  
  // Economic Properties
  costPerKg: number; // USD/kg
  recyclability: 'Poor' | 'Fair' | 'Good' | 'Excellent';
}

export interface ApplicationCategory {
  automotive: string[];
  aerospace: string[];
  marine: string[];
  construction: string[];
  electronics: string[];
  appliances: string[];
  machinery: string[];
  tools: string[];
  medical: string[];
  energy: string[];
}

export interface Material {
  id: string;
  name: string;
  designation: string;
  category: string;
  subcategory: string;
  properties: MaterialProperties;
  composition: Record<string, number>; // Element -> Percentage
  applications: ApplicationCategory;
  advantages: string[];
  disadvantages: string[];
  standards: string[];
  costIndex: number; // 1-10 scale
  availability: 'Common' | 'Limited' | 'Rare';
  temperatureRange: {
    min: number; // °C
    max: number; // °C
  };
  notes?: string;
}

export interface UserNote {
  id: string;
  materialId: string;
  content: string;
  timestamp: Date;
  tags: string[];
}

export interface AlloyFormulation {
  id: string;
  name: string;
  baseElement: string;
  additives: Record<string, number>;
  predictedProperties: Partial<MaterialProperties>;
  notes: string;
  createdAt: Date;
}
