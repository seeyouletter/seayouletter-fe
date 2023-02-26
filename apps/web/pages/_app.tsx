import { QueryClient, QueryClientProvider } from 'react-query';

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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        {getLayout(<Component key={Component.prototype.constructor.name} {...pageProps} />)}
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
