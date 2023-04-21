import '@/styles/globals.css'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <div className="container">
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </div>
  )
}
