import { FC } from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';

const MyDocument: FC<Document> = () => (
  <Html lang="pt-br">
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
