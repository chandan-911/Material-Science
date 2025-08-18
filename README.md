# Metal Selector 🧪

**Advanced Material Science & Steel Selection Platform**

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Professional-grade steel and alloy selection platform for engineers, metallurgists, and material scientists. Advanced AI-powered recommendations with comprehensive material databases, 3D visualization, and predictive analysis.

## 🚀 Features

### Core Capabilities
- **🔬 AI-Powered Steel Advisor** - Expert metallurgical consultation with Dr. Sarah Chen AI
- **📊 Comprehensive Material Database** - 500+ steel grades with detailed properties
- **🎨 Advanced Alloy Designer** - Interactive material selection and comparison tools
- **📱 Progressive Web App (PWA)** - Installable, offline-capable, mobile-optimized
- **🌐 Industry Applications** - Aerospace, Automotive, Marine, Construction focus

### Technical Features
- **3D Material Visualization** - Interactive 3D models for automotive applications
- **Real-time Property Analysis** - Mechanical, thermal, and chemical properties
- **Standards Compliance** - ASTM, AISI, SAE, ISO, EN specifications
- **Cost-Performance Optimization** - Intelligent material selection algorithms
- **Export Capabilities** - PDF reports and data export functionality

## 🏗️ Architecture

```
metal-selector-pro/
├── src/
│   ├── components/          # React components
│   │   ├── SteelAdvisor.tsx # AI-powered steel selection
│   │   ├── AlloyDesigner.tsx # Material database interface
│   │   ├── CarPartsViewer.tsx # 3D visualization
│   │   └── ui/             # UI component library
│   ├── pages/              # Application routes
│   ├── data/               # Material databases
│   ├── types/              # TypeScript definitions
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
├── public/                 # Static assets
│   ├── models/             # 3D model files (.glb)
│   ├── pwa-icons/          # PWA icon set
│   └── steeldb.csv         # Steel database
└── service-worker.js       # PWA service worker
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### 3D & Visualization
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Professional animation library

### PWA & Performance
- **Vite PWA** - Progressive Web App support
- **Workbox** - Service worker management
- **Offline-first** - Comprehensive caching strategies

### AI & Data
- **Google Gemini AI** - Advanced language model integration
- **PapaParse** - CSV parsing and processing
- **React Query** - Data fetching and caching

## 📱 PWA Features

### Installation
- **App Store-like** installation experience
- **Home screen** shortcuts and icons
- **Offline functionality** with intelligent caching
- **Background sync** capabilities

### Performance
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Analysis**: Code splitting and optimization
- **Service Worker**: Advanced caching strategies

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Modern browser** with PWA support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/metal-selector/metal-selector-pro.git
   cd metal-selector-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# AI Service Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# PWA Configuration
VITE_PWA_NAME=Metal Selector Pro
VITE_PWA_SHORT_NAME=MetalSelect Pro
VITE_PWA_DESCRIPTION=Advanced material science platform
```

## 📊 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking
npm run format          # Format code with Prettier

# Testing
npm run test            # Run unit tests
npm run test:ui         # Run tests with UI
npm run test:coverage   # Generate coverage report

# Analysis
npm run analyze         # Bundle analysis
npm run pwa:analyze     # PWA analysis
npm run pwa:validate    # PWA validation

# Maintenance
npm run clean           # Clean build artifacts
```

## 🌐 Browser Support

| Browser | Version | PWA Support |
|---------|---------|-------------|
| Chrome  | 88+     | ✅ Full     |
| Firefox | 78+     | ✅ Full     |
| Safari  | 14+     | ✅ Full     |
| Edge    | 88+     | ✅ Full     |

## 📱 PWA Installation

### Desktop
1. Visit the website in Chrome/Edge
2. Click the install icon in the address bar
3. Follow the installation prompts

### Mobile
1. Open the website in Safari/Chrome
2. Tap "Add to Home Screen"
3. Confirm installation

### Offline Usage
- **Cached Resources**: Core app and materials database
- **3D Models**: All automotive component models
- **AI Responses**: Cached for offline reference
- **Smart Sync**: Background updates when online

## 🔧 Configuration

### PWA Settings
```typescript
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,glb,csv}'],
    runtimeCaching: [
      // AI API caching
      // Image and model caching
      // Static resource caching
    ]
  }
})
```

### Service Worker
```javascript
// public/service-worker.js
const CACHE_NAME = 'metal-selector-pro-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';
const API_CACHE = 'api-v3';
```

## 📈 Performance Metrics

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### PWA Metrics
- **Installability**: 100%
- **Offline Functionality**: 95%
- **App-like Experience**: 98%

## 🧪 Testing

### Unit Tests
```bash
npm run test              # Run all tests
npm run test:coverage     # Generate coverage report
npm run test:ui           # Interactive test interface
```

### PWA Testing
```bash
npm run pwa:validate      # Validate PWA configuration
npm run pwa:analyze       # Analyze PWA performance
```

### Browser Testing
- **Chrome DevTools** - PWA audit and Lighthouse
- **Firefox DevTools** - PWA debugging
- **Safari Web Inspector** - iOS PWA testing

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `dist/` folder to your web server
3. Ensure HTTPS is enabled for PWA functionality

## 📚 API Documentation

### Steel Advisor AI
```typescript
interface SteelAdvisorQuery {
  application: string;
  requirements: MaterialRequirements;
  industry: 'aerospace' | 'automotive' | 'marine' | 'construction';
  budget?: number;
  quantity?: number;
}

interface MaterialRecommendation {
  grade: string;
  properties: MaterialProperties;
  standards: string[];
  cost: number;
  availability: string;
  riskFactors: string[];
}
```

### Material Database
```typescript
interface Material {
  id: string;
  name: string;
  designation: string;
  category: string;
  properties: MaterialProperties;
  composition: Record<string, number>;
  applications: ApplicationCategory;
  standards: string[];
}
```

## 🤝 Contributing

We welcome contributions from the material science and engineering community!

### Contribution Guidelines
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Development Setup
```bash
git clone https://github.com/your-username/metal-selector-pro.git
cd metal-selector-pro
npm install
npm run dev
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material Science Community** - For expertise and feedback
- **Google Gemini AI** - For advanced language model capabilities
- **Three.js Community** - For 3D graphics technology
- **PWA Community** - For progressive web app standards

## 📞 Support

### Professional Support
- **Email**: ck7464877@gmail.com
- **Phone**: +91 9915126389

---

<div align="center">

**Built with ❤️ for the Material Science Community**

[![Website](https://img.shields.io/badge/Website-metal--selector.com-blue?style=for-the-badge)](https://metal-selector.com)
[![Documentation](https://img.shields.io/badge/Docs-docs.metal--selector.com-green?style=for-the-badge)](https://docs.metal-selector.com)
[![Support](https://img.shields.io/badge/Support-support@metal--selector.com-red?style=for-the-badge)](mailto:support@metal-selector.com)

</div>
