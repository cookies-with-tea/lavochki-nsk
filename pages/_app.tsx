import type { AppProps } from 'next/app'

import 'swiper/css';
import '../app/styles/index.scss'
import '@/app/styles/resources/variables/_colors-base.scss'

import DefaultLayout from "../layouts";

import { requireSvg } from "@/app/utils/svg";

requireSvg()

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
  )
}

export default MyApp
