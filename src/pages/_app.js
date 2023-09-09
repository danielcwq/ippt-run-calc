import "@/styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
import ReactGA from "react-ga4";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize("G-DZRB50TH1X");
    // To Report Page View
    ReactGA.send({ hitType: "pageview", page: "/" });
  }, []);
  return (
    <div className="container">
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </div>
  );
}
