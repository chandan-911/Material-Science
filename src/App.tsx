import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Home } from "./pages/Home";
import SteelAdvisor from "./components/SteelAdvisor";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
// import { MaterialVisualization } from "./pages/MaterialVisualization";
import CarPartsViewer from "./components/CarPartsViewer";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
          
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/getstarted" element={<Index />} />
                <Route path="/steel-advisor" element={<SteelAdvisor />} />
                <Route path="/car-parts-viewer" element={<CarPartsViewer />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
