import { ToastContainer } from 'react-toastify';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';

import apolloClient from '@api/apollo';

import Layout from '@components/layout';
import StyleWrapper from '@components/style-wrapper';

import { Analytics } from '@vercel/analytics/react';

import 'react-toastify/dist/ReactToastify.css';

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
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </StyleWrapper>
    </ApolloProvider>
    <Analytics />
  </>
);

export default App;
