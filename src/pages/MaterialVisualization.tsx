import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import CarPartsViewer from '../components/CarPartsViewer';
import { EyeIcon } from '@heroicons/react/24/outline';

export const MaterialVisualization = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 text-white pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
              3D Material Visualization
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Interactive 3D models and detailed analysis of advanced steel alloys and materials 
              for professional engineering applications
            </p>
          </div>
        </section>

        {/* 3D Car Parts Viewer */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">3D Car Parts Visualization</h3>
              <p className="text-slate-300">Interactive 3D models demonstrating automotive steel applications</p>
            </div>
            
            <div className="h-[600px] bg-slate-900/50 rounded-lg overflow-hidden border border-slate-600">
              <CarPartsViewer />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
