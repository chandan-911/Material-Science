// src/pages/Home.tsx


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import PWAInstallButton from '../components/PWAInstallButton';
import { BeakerIcon, ChartBarIcon, CogIcon, AcademicCapIcon, ShieldCheckIcon, RocketLaunchIcon, ArrowRightIcon, StarIcon, CheckCircleIcon, EyeIcon } from '@heroicons/react/24/outline';

export const Home = () => {
  const [showTip, setShowTip] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tipTimer = setTimeout(() => setShowTip(true), 8000);
    return () => clearTimeout(tipTimer);
  }, []);

  const handleGetStarted = () => {
    navigate('/getstarted');
  };


  const stats = [
    { number: '500+', label: 'Steel Grades', icon: BeakerIcon },
    { number: '25+', label: 'Years Experience', icon: AcademicCapIcon },
    { number: '95%', label: 'Accuracy Rate', icon: CheckCircleIcon },
    { number: '24/7', label: 'AI Support', icon: StarIcon }
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Enhanced Navbar */}
      <Navbar />

      {/* Main Container with proper spacing for fixed navbar */}
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full border border-cyan-400/30 backdrop-blur-sm">
                <ShieldCheckIcon className="h-5 w-5 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-medium">Professional Grade Material Science Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-md leading-tight">
                Metal Selector
          </h1>
              
              <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Advanced alloy selection and material science platform for engineers, metallurgists, and researchers. 
                <span className="text-cyan-400 font-semibold"> AI-powered insights</span> meet 
                <span className="text-blue-400 font-semibold"> comprehensive databases</span> for 
                <span className="text-purple-400 font-semibold"> professional applications</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 transform hover:shadow-cyan-400/30"
              >
                <span className="flex items-center space-x-2">
                  <RocketLaunchIcon className="h-6 w-6 group-hover:animate-bounce" />
                  <span>Launch Alloy Designer</span>
                </span>
              </button>
              
              <button
                onClick={() => navigate('/steel-advisor')}
                className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 transform hover:shadow-purple-400/30"
              >
                <span className="flex items-center space-x-2">
                  <BeakerIcon className="h-6 w-6 group-hover:animate-pulse" />
                  <span>AI Steel Advisor</span>
                </span>
              </button>
              
              <button
                onClick={() => navigate('/car-parts-viewer')}
                className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 transform hover:shadow-green-400/30"
              >
                <span className="flex items-center space-x-2">
                  <EyeIcon className="h-6 w-6 group-hover:animate-bounce" />
                  <span>3D Visualization</span>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                      <Icon className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-slate-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Enhanced Call to Action */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-cyan-400">
                Ready to Transform Your Material Selection Process?
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Join thousands of engineers and material scientists who trust Metal Selector for their critical decisions
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={handleGetStarted}
                className="group bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:scale-105 transform hover:shadow-cyan-400/30"
          >
                <span className="flex items-center space-x-2">
                  <RocketLaunchIcon className="h-6 w-6 group-hover:animate-bounce" />
                  <span>Get Started Now</span>
                </span>
          </button>
              
          <button
            onClick={() => navigate('/steel-advisor')}
                className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:scale-105 transform hover:shadow-purple-400/30"
          >
                <span className="flex items-center space-x-2">
                  <BeakerIcon className="h-6 w-6 group-hover:animate-pulse" />
                  <span>Try Steel Advisor</span>
                </span>
          </button>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced PWA Install Button */}
      <PWAInstallButton />
    </div>
  );
};
