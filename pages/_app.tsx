import '../sass/main.scss';
import type { AppProps } from 'next/app';
import LocationProvider from '../context/location';
import Toast from '../components/Toast';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <LocationProvider>
      {getLayout(<Component {...pageProps} />)}
      <Toast />
    </LocationProvider>
  );
}

export default MyApp;
