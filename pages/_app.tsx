import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import StyleWrapper from '@/components/style-wrapper';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>The Helper</title>
      <meta name="description" content="The Helper" />
      <link rel="icon" href="/fav.png" />
    </Head>
    <StyleWrapper>
      <Component {...pageProps} />
    </StyleWrapper>
  </>
);

export default App;
