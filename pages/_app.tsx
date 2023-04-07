import { ToastContainer } from 'react-toastify';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';

import apolloClient from '_/api/apollo';
import Layout from '_/components/layout';
import StyleWrapper from '_/components/style-wrapper';

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
  </>
);

export default App;
