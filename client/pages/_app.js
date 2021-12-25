import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
