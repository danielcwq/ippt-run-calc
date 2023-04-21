import '@/styles/globals.css'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <div className="container">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
    </div>
  )
}
