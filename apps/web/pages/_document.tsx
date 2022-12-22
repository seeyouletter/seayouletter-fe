import { Head, Html, Main, NextScript } from 'next/document';

import { ColorModeScript } from '@chakra-ui/react';

import { chakraTheme } from '@packages/ui/styles';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
