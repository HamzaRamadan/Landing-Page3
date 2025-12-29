import { useEffect } from 'react';

type AnalyticsProps = {
  gtmId?: string;
  fbPixelId?: string;
  clarityId?: string;
};

export function Analytics({ gtmId, fbPixelId, clarityId }: AnalyticsProps) {
  useEffect(() => {
    // ===================== Google Tag Manager =====================
    if (gtmId && !document.getElementById('gtm-script')) {
      (window as any).dataLayer = (window as any).dataLayer || [];

      const gtm = document.createElement('script');
      gtm.id = 'gtm-script';
      gtm.async = true;
      gtm.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(gtm);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.appendChild(noscript);

      console.log('✅ GTM loaded:', gtmId);
    }

 // ===================== Facebook Pixel =====================
if (fbPixelId && !document.getElementById('fb-pixel-script')) {
  const fbScript = document.createElement('script');
  fbScript.id = 'fb-pixel-script';
  fbScript.async = true;
  fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(fbScript);

  fbScript.onload = () => {
    const w = window as any;

    if (!w.fbq) {
      w.fbq = function () {
        w.fbq.callMethod
          ? w.fbq.callMethod.apply(w.fbq, arguments)
          : w.fbq.queue.push(arguments);
      };
      w.fbq.push = w.fbq;
      w.fbq.loaded = true;
      w.fbq.version = '2.0';
      w.fbq.queue = [];
    }

    w.fbq('init', fbPixelId);
    w.fbq('track', 'PageView');

    console.log('✅ Facebook Pixel loaded:', fbPixelId);
  };
}

    // ===================== Microsoft Clarity =====================
    if (clarityId && !(window as any).clarity) {
      (function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = true;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', clarityId);

      console.log('✅ Clarity loaded:', clarityId);
    }
  }, [gtmId, fbPixelId, clarityId]);

  return null;
}
