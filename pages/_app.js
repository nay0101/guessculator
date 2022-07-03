import { PlayerProvider } from "../contexts/PlayerContext";
import Head from "next/head";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/Guessculator-round.png" />
        <title>Guessculator</title>
      </Head>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
    </>
  );
}

export default MyApp;
