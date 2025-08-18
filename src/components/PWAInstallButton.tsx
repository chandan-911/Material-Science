import { useState, useEffect } from 'react';
import { Download, CheckCircle, Wifi, WifiOff, AlertCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install button
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      // Hide the install button when the app is installed
      setIsInstallable(false);
      setIsInstalled(true);
      setDeferredPrompt(null);
      console.log('Metal Selector Pro was installed successfully');
      
      // Show success message briefly
      setTimeout(() => {
        setIsInstalled(false);
      }, 3000);
    };

    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
      if (!navigator.onLine) {
        setShowOfflineMessage(true);
        setTimeout(() => setShowOfflineMessage(false), 5000);
      }
    };

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      setIsInstallable(false);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      // We no longer need the prompt regardless of outcome
      setDeferredPrompt(null);
      
      if (outcome === 'accepted') {
        setIsInstallable(false);
        setIsInstalled(true);
        console.log('User accepted the install prompt');
        
        // Show success message briefly
        setTimeout(() => {
          setIsInstalled(false);
        }, 3000);
      } else {
        console.log('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  // Don't show anything if already installed
  if (isInstalled) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Installed!</span>
      </div>
    );
  }

  // Show offline message if not online
  if (!isOnline && showOfflineMessage) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-amber-600 text-white p-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-xs">
        <WifiOff className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm">Working offline - some features may be limited</span>
      </div>
    );
  }

  // Don't show install button if not installable
  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main Install Button */}
      <button
        onClick={handleInstallClick}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group"
        aria-label="Install Metal Selector Pro as app"
        title="Install Metal Selector Pro for the best experience"
      >
        <Download className="h-5 w-5 group-hover:animate-bounce" />
        <span className="text-sm font-medium hidden sm:block">Install App</span>
      </button>
      
      {/* Tooltip for mobile */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Install for offline access
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
      </div>
    </div>
  );
};

export default PWAInstallButton;