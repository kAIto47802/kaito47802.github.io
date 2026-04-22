'use client';

import { GA_TAG_ID, IS_GATAG, pageview } from '@/libs/gtag';
import Script from 'next/script';
import { useEffect } from 'react';

const GoogleAnalytics = () => {
  useEffect(() => {
    if (!IS_GATAG) {
      return;
    }
    pageview(`${window.location.pathname}${window.location.search}`);
  }, []);

  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`}
      />
      <Script id='gtag-init' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TAG_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};
export default GoogleAnalytics;
