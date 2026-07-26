// Ethereal Gear — Analytics & Telemetry Integration Engine
// Integrates GA4, Google Tag Manager (GTM), and Meta Pixel with graceful error handling

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-ETHEREAL2026';
const GTM_ID = import.meta.env.VITE_GTM_ID || '';
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  try {
    // 1. Google Analytics 4
    if (GA_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_ID, { send_page_view: true });
      console.log(`[Analytics] GA4 initialized: ${GA_ID}`);
    }

    // 2. Google Tag Manager (GTM)
    if (GTM_ID) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(gtmScript);
      console.log(`[Analytics] GTM initialized: ${GTM_ID}`);
    }

    // 3. Meta (Facebook) Pixel
    if (META_PIXEL_ID) {
      const n: any = (window as any).fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!(window as any)._fbq) (window as any)._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const pixelScript = document.createElement('script');
      pixelScript.async = true;
      pixelScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(pixelScript);
      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
      console.log(`[Analytics] Meta Pixel initialized: ${META_PIXEL_ID}`);
    }
  } catch (err) {
    console.warn('[Analytics] Failed to initialize analytics scripts cleanly:', err);
  }
}

// Track Custom Event in GA4 and Meta Pixel
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  try {
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
    if (window.fbq) {
      window.fbq('track', eventName, params);
    }
  } catch (err) {
    console.warn(`[Analytics] Error tracking event "${eventName}":`, err);
  }
}

// Track Lead Inquiries Submission
export function trackLeadSubmission(service: string, budget: string) {
  trackEvent('Lead', {
    content_name: service,
    value: budget,
    currency: 'USD',
  });
}
