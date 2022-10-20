import type { AppProps } from 'next/app'
import '../app/styles/index.scss'
import DefaultLayout from "../layouts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
  )
}

export default MyApp
