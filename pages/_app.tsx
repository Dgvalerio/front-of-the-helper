import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>The Helper</title>
      <meta name="description" content="The Helper" />
      <link rel="icon" href="/fav.png" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
