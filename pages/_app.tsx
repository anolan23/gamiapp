import '../sass/main.scss';
import type { AppProps } from 'next/app';
import LocationProvider from '../context/location';
import Toast from '../components/Toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocationProvider>
      <Component {...pageProps} />
      <Toast />
    </LocationProvider>
  );
}

export default MyApp;
