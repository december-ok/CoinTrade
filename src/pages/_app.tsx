import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/styles.scss";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>CoinTrade</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
