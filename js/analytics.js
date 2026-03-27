/* ═══════════════════════════════════════════════════════════════
   Privacy-Focused Analytics
   Simple, cookieless analytics without tracking
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Simple privacy-focused analytics
  const Analytics = {
    // Track page view
    trackPageView: function() {
      const data = {
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`
      };

      // Only log to console in development
      // In production, send to your analytics endpoint
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Analytics: Page view', data);
      } else {
        // Send to your analytics endpoint (optional)
        // this.sendEvent('pageview', data);
      }
    },

    // Track custom events
    trackEvent: function(eventName, properties = {}) {
      const data = {
        event: eventName,
        properties,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      };

      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Analytics: Event', data);
      } else {
        // this.sendEvent('event', data);
      }
    },

    // Send event to analytics endpoint
    sendEvent: function(type, data) {
      // Example: Send to your own analytics API
      // fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, data })
      // }).catch(err => console.error('Analytics error:', err));

      // Or use Plausible Analytics (privacy-focused, GDPR compliant)
      // if (window.plausible) {
      //   window.plausible(type, { props: data });
      // }

      // Or use Simple Analytics (privacy-focused)
      // if (window.sa_event) {
      //   window.sa_event(type);
      // }
    },

    // Track outbound link clicks
    trackOutboundLinks: function() {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.href;
        if (!href || href.startsWith('#')) return;

        const isExternal = link.hostname !== window.location.hostname;
        const isDownload = link.download || href.match(/\.(pdf|zip|doc|docx|xls|xlsx)$/i);

        if (isExternal) {
          this.trackEvent('outbound_link', {
            url: href,
            text: link.textContent.trim()
          });
        } else if (isDownload) {
          this.trackEvent('download', {
            url: href,
            filename: href.split('/').pop()
          });
        }
      });
    },

    // Track form submissions
    trackFormSubmissions: function() {
      document.addEventListener('submit', (e) => {
        const form = e.target;
        const formName = form.id || form.name || 'unknown';

        this.trackEvent('form_submit', {
          form: formName,
          action: form.action
        });
      });
    },

    // Track scroll depth
    trackScrollDepth: function() {
      let maxScroll = 0;
      const thresholds = [25, 50, 75, 90, 100];
      const tracked = new Set();

      window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercent = Math.round((scrolled / scrollHeight) * 100);

        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;

          thresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !tracked.has(threshold)) {
              tracked.add(threshold);
              this.trackEvent('scroll_depth', { depth: threshold });
            }
          });
        }
      }, { passive: true });
    },

    // Track time on page
    trackTimeOnPage: function() {
      const startTime = Date.now();

      window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        this.trackEvent('time_on_page', {
          seconds: timeSpent,
          page: window.location.pathname
        });
      });
    },

    // Initialize analytics
    init: function() {
      // Track page view
      this.trackPageView();

      // Track user interactions
      this.trackOutboundLinks();
      this.trackFormSubmissions();
      this.trackScrollDepth();
      this.trackTimeOnPage();

      console.log('Privacy-focused analytics initialized');
    }
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Analytics.init());
  } else {
    Analytics.init();
  }

  // Expose to window for manual tracking
  window.Analytics = Analytics;

})();

/* ═══════════════════════════════════════════════════════════════
   Integration with Plausible Analytics (Optional)
   Privacy-friendly, GDPR-compliant, no cookies
   ═══════════════════════════════════════════════════════════════

   To use Plausible Analytics:

   1. Sign up at https://plausible.io
   2. Add this script to your HTML head:
      <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   3. Uncomment the Plausible integration code above

   Benefits:
   - No cookies or persistent identifiers
   - GDPR, CCPA, PECR compliant
   - Lightweight (< 1KB)
   - Open source
   - Privacy-focused

   Alternative: Simple Analytics (https://simpleanalytics.com)
   - Similar privacy-focused approach
   - No cookies, GDPR compliant
   - Clean, simple dashboard

   ═══════════════════════════════════════════════════════════════ */
