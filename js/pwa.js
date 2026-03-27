/* ═══════════════════════════════════════════════════════════════
   PWA Registration & Management
   Service worker registration and app install prompt
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  const PWA = {
    // Service worker registration
    registerServiceWorker: function() {
      if (!('serviceWorker' in navigator)) {
        console.log('Service workers not supported');
        return;
      }

      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration.scope);

            // Check for updates periodically
            setInterval(() => {
              registration.update();
            }, 60 * 60 * 1000); // Check every hour

            // Handle updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;

              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  this.showUpdateNotification();
                }
              });
            });
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });

        // Handle messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'CACHE_CLEARED') {
            console.log('Cache cleared successfully');
          }
        });
      });
    },

    // Show update notification
    showUpdateNotification: function() {
      const notification = document.createElement('div');
      notification.className = 'pwa-update-notification';
      notification.innerHTML = `
        <div class="pwa-notification-content">
          <p>A new version is available!</p>
          <button id="pwa-reload-btn" class="btn-primary">Reload</button>
          <button id="pwa-dismiss-btn" class="btn-secondary">Later</button>
        </div>
      `;

      notification.style.cssText = `
        position: fixed;
        bottom: var(--space-6);
        right: var(--space-6);
        background: var(--surface);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        box-shadow: var(--shadow-2xl);
        z-index: var(--z-modal);
        animation: slideInUp 0.3s ease-out;
      `;

      document.body.appendChild(notification);

      document.getElementById('pwa-reload-btn').addEventListener('click', () => {
        window.location.reload();
      });

      document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
        notification.remove();
      });
    },

    // Handle app install prompt
    handleInstallPrompt: function() {
      let deferredPrompt;

      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent default install prompt
        e.preventDefault();
        deferredPrompt = e;

        // Show custom install button
        this.showInstallButton(deferredPrompt);
      });

      window.addEventListener('appinstalled', () => {
        console.log('PWA installed successfully');
        deferredPrompt = null;

        // Track installation
        if (window.Analytics) {
          window.Analytics.trackEvent('pwa_installed');
        }
      });
    },

    // Show custom install button
    showInstallButton: function(deferredPrompt) {
      const installBtn = document.createElement('button');
      installBtn.id = 'pwa-install-btn';
      installBtn.className = 'btn-primary pwa-install-button';
      installBtn.innerHTML = '📱 Install App';

      installBtn.style.cssText = `
        position: fixed;
        bottom: var(--space-6);
        right: var(--space-6);
        z-index: var(--z-fixed);
        animation: slideInUp 0.3s ease-out;
      `;

      installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;

        // Show install prompt
        deferredPrompt.prompt();

        // Wait for user choice
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install prompt outcome:', outcome);

        if (outcome === 'accepted') {
          if (window.Analytics) {
            window.Analytics.trackEvent('pwa_install_accepted');
          }
        } else {
          if (window.Analytics) {
            window.Analytics.trackEvent('pwa_install_dismissed');
          }
        }

        // Remove button
        installBtn.remove();
        deferredPrompt = null;
      });

      // Add close button
      const closeBtn = document.createElement('span');
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        width: 24px;
        height: 24px;
        background: var(--surface);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 20px;
      `;

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        installBtn.remove();
      });

      installBtn.style.position = 'relative';
      installBtn.appendChild(closeBtn);

      document.body.appendChild(installBtn);
    },

    // Check if running as PWA
    isRunningAsPWA: function() {
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.navigator.standalone === true;
    },

    // Initialize PWA features
    init: function() {
      this.registerServiceWorker();
      this.handleInstallPrompt();

      if (this.isRunningAsPWA()) {
        console.log('Running as installed PWA');
        document.body.classList.add('pwa-installed');

        if (window.Analytics) {
          window.Analytics.trackEvent('pwa_launch');
        }
      }
    }
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PWA.init());
  } else {
    PWA.init();
  }

  // Expose to window
  window.PWA = PWA;

})();

/* ═══════════════════════════════════════════════════════════════
   PWA Installation Instructions
   ═══════════════════════════════════════════════════════════════

   Your portfolio is now a Progressive Web App!

   Features:
   - Offline support via service worker
   - Installable on desktop and mobile
   - App-like experience when installed
   - Automatic updates

   How users can install:

   Desktop (Chrome/Edge):
   1. Click the install icon in the address bar
   2. Or use the custom "Install App" button

   Mobile (Android):
   1. Tap the browser menu (3 dots)
   2. Select "Add to Home Screen"
   3. Or use the custom install prompt

   iOS (Safari):
   1. Tap the Share button
   2. Select "Add to Home Screen"
   3. Note: Service worker limited on iOS

   Testing PWA:
   - Chrome DevTools > Application > Service Workers
   - Chrome DevTools > Application > Manifest
   - Lighthouse audit for PWA score

   ═══════════════════════════════════════════════════════════════ */
