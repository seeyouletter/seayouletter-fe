import { NextPage } from 'next';
import { AppProps } from 'next/app';

import { CustomThemeProvider } from 'ui';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CustomThemeProvider>
      {getLayout(<Component key={Component.prototype.constructor.name} {...pageProps} />)}
    </CustomThemeProvider>
  );
}

export default MyApp;
