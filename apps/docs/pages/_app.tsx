import React from 'react';

import { AppProps } from 'next/app';

import { CustomThemeProvider } from 'ui';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <Component {...pageProps} />
    </CustomThemeProvider>
  );
}
