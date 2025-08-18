import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  BeakerIcon, 
  AcademicCapIcon, 
  ShieldCheckIcon, 
  LightBulbIcon,
  UsersIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full border border-cyan-400/30 backdrop-blur-sm mb-6">
            <BeakerIcon className="h-5 w-5 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">About Metal Selector </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6">
            About Us
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Your premier destination for advanced metal and alloy selection expertise, 
            powered by cutting-edge AI technology and comprehensive materials science knowledge.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Mission Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 lg:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-4 flex items-center">
                  <LightBulbIcon className="h-8 w-8 mr-3" />
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  We're dedicated to revolutionizing how engineers and manufacturers select materials for their projects. 
                  By combining cutting-edge AI technology with comprehensive materials science knowledge, we provide 
                  precise, data-driven recommendations tailored to your specific application requirements.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <LightBulbIcon className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 lg:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <AcademicCapIcon className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                </div>
              </div>
              <div className="lg:col-span-2 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-4 flex items-center">
                  <AcademicCapIcon className="h-8 w-8 mr-3" />
                  Our Expertise
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-6">
                  Our team consists of materials scientists, metallurgists, and software engineers with decades of 
                  combined experience in the field. We've analyzed thousands of alloy compositions and their performance 
                  characteristics to build our proprietary database and selection algorithms.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-300">Advanced Materials Science</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-300">AI-Powered Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-300">Industry Standards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-300">Performance Testing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-8 text-center flex items-center justify-center">
              <ShieldCheckIcon className="h-8 w-8 mr-3" />
              Why Choose Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 text-center hover:border-cyan-400/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Precision</h3>
                <p className="text-sm text-slate-300">
                  Our recommendations are based on comprehensive material property analysis
                </p>
              </div>
              
              <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 text-center hover:border-cyan-400/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <LightBulbIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Efficiency</h3>
                <p className="text-sm text-slate-300">
                  Save weeks of research and testing with our instant recommendations
                </p>
              </div>
              
              <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 text-center hover:border-cyan-400/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GlobeAltIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
                <p className="text-sm text-slate-300">
                  We continuously update our database with the latest alloy developments
                </p>
              </div>
              
              <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 text-center hover:border-cyan-400/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
                <p className="text-sm text-slate-300">
                  Our experts are available to provide personalized consultation
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-8 text-center">
              Our Impact
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">1000+</div>
                <div className="text-sm sm:text-base text-slate-400">Alloy Compositions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-sm sm:text-base text-slate-400">Industry Standards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-sm sm:text-base text-slate-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-sm sm:text-base text-slate-400">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AboutUs;