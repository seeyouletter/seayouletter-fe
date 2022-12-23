import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Script from 'next/script';

import { CustomThemeProvider } from 'ui';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_WEB_KAKAO_APP_KEY);
  }

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
        onLoad={kakaoInit}
      />

      <CustomThemeProvider>
        {getLayout(<Component key={Component.prototype.constructor.name} {...pageProps} />)}
      </CustomThemeProvider>
    </>
  );
}

export default MyApp;
