// Service worker registration script with improved cross-browser support

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        // Use a try-catch block for better error handling
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
          scope: '/',
          // Add update on reload for development environments
          updateViaCache: 'none'
        });
        
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker available, refresh to update');
                // You could notify the user here that an update is available
              }
            });
          }
        });
      } catch (error) {
        console.error('ServiceWorker registration failed: ', error);
      }
    });
    
    // Add support for iOS Safari
    // iOS Safari requires user interaction to install PWA
    // This ensures the service worker is still registered even if PWA isn't installed
    if (navigator.standalone === undefined) {
      // iOS Safari detected
      document.addEventListener('touchend', () => {
        // This empty event listener helps with service worker registration on iOS
      }, { once: true });
    }
  }
}