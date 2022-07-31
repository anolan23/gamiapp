import '../sass/main.scss';
import type { AppProps } from 'next/app';
import LocationProvider from '../context/location';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocationProvider>
      <Component {...pageProps} />
    </LocationProvider>
  );
}

export default MyApp;
