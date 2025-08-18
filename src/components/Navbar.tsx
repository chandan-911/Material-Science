import { useState, useEffect } from 'react';
import {
  HomeIcon,
  EyeIcon,
  UserPlusIcon,
  Bars3Icon,
  XMarkIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  ChartBarIcon,
  CogIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  // Add CSS keyframes for glow animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glow {
        0%, 100% { 
          filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.6));
        }
        50% { 
          filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.8));
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      path: '/',
      name: 'Home',
      icon: HomeIcon,
      description: 'Material Science Platform'
    },
    {
      path: '/steel-advisor',
      name: 'Steel Advisor',
      icon: WrenchScrewdriverIcon,
      description: 'AI-Powered Selection'
    },
    {
      path: '/car-parts-viewer',
      name: '3D Visualization',
      icon: EyeIcon,
      description: 'Interactive Material Models'
    },
    {
      path: '/about',
      name: 'About Us',
      icon: AcademicCapIcon,
      description: 'Expert Team & Mission'
    },
    {
      path: '/contact',
      name: 'Contact',
      icon: UserPlusIcon,
      description: 'Get Expert Support'
    }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-cyan-400/30 shadow-lg' 
        : 'bg-slate-900/80 backdrop-blur-sm border-b border-cyan-400/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
                      <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <BeakerIcon className="h-7 w-7 lg:h-8 lg:w-8 text-cyan-400 group-hover:scale-110 transition-all duration-300" style={{ 
                  filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))',
                  animation: 'glow 3s ease-in-out infinite'
                }} />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300">
                  Metal Selector
                </span>
                <span className="text-xs text-slate-400 hidden sm:block group-hover:text-slate-300 transition-colors duration-300">
                  Advanced Material Science Platform
            </span>
              </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
            <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative px-3 py-1.5 rounded-md transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 shadow-sm'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 hover:border hover:border-slate-600/30'
                  }`}
                  style={{ WebkitTouchCallout: 'none', WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="flex items-center space-x-1.5">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  
                  {/* Enhanced Tooltip Below Button */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-800/95 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl border border-slate-600/50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-3 h-3 text-cyan-400" />
                      <span className="font-medium">{item.description}</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800/95"></div>
                  </div>
            </Link>
              );
            })}
            
            {/* Professional CTA Button */}
            <Link
              to="/contact"
              className="ml-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium text-sm py-1.5 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow-cyan-400/30 transform hover:scale-105 border border-cyan-400/30"
            >
              Get Expert Support
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyan-400 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
              aria-label="Toggle mobile menu"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

             {/* Enhanced Mobile Navigation */}
       <div className={`lg:hidden transition-all duration-300 ease-in-out ${
         isOpen 
           ? 'max-h-[500px] opacity-100 touch-auto' 
           : 'max-h-0 opacity-0 overflow-hidden'
       }`}>
         <div className="px-4 pb-6 pt-2 space-y-2 bg-slate-900/95 border-t border-cyan-400/20 backdrop-blur-sm">
           {navItems.map((item) => {
             const Icon = item.icon;
             return (
          <Link
                 key={item.path}
                 to={item.path}
                 className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                   isActiveRoute(item.path)
                     ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 shadow-sm'
                     : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 hover:border hover:border-slate-600/30'
                 }`}
                 style={{ WebkitTouchCallout: 'none', WebkitTapHighlightColor: 'transparent' }}
               >
                 <div className={`p-1.5 rounded-md transition-all duration-200 ${
                   isActiveRoute(item.path)
                     ? 'bg-white/20'
                     : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                 }`}>
                   <Icon className="h-4 w-4" />
                 </div>
                 <div className="flex flex-col flex-1">
                   <span className="text-sm font-medium">{item.name}</span>
                   <span className="text-xs text-slate-400">{item.description}</span>
                 </div>
                 {isActiveRoute(item.path) && (
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                 )}
          </Link>
             );
           })}
           
           {/* Enhanced Mobile CTA */}
           <div className="pt-3 border-t border-slate-700/50">
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
               className="block w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium text-sm py-2.5 px-4 text-center rounded-md transition-all duration-300 shadow-sm hover:shadow-cyan-400/30 border border-cyan-400/30"
          >
               Get Expert Support
          </Link>
        </div>
         </div>
       </div>
    </nav>
  );
};
