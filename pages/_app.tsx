import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';

import apolloClient from '_/api/apollo';
import StyleWrapper from '_/components/style-wrapper';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>The Helper</title>
      <meta name="description" content="The Helper" />
      <link rel="icon" href="/fav.png" />
    </Head>
    <ApolloProvider client={apolloClient}>
      <StyleWrapper>
        <Component {...pageProps} />
      </StyleWrapper>
    </ApolloProvider>
  </>
);

export default App;
