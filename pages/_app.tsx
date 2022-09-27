import type { AppProps } from 'next/app'
import '@/styles/main.scss'
// Import Swiper styles
import 'swiper/css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
