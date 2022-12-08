import type { AppProps } from 'next/app'

import DefaultLayout from "@/layouts/DefaultLayout";

import { requireSvg } from "@/app/utils/svg";

import 'swiper/css';
import '@/app/styles/index.scss'
import '@/app/styles/resources/variables/_colors-base.scss'

requireSvg()

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
  )
}

export default MyApp
