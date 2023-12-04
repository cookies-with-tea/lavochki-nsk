import { ReactNode } from 'react'
import 'swiper/css'
import '@/styles/index.scss'
import { requireSvg } from '@/shared/lib/utils'
import { Header } from '@/components/widgets/header'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Footer } from '@/components/widgets/footer'

requireSvg()

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Lavochki Nsk',
  description: 'Сайт для просмотра лавочек на сайте',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang={'ru'} className={poppins.className}>
      <body>
        <Header />

        <main className={'main'}>{children}</main>

        <Footer />

        <script async src={'https://telegram.org/js/telegram-widget.js?27'} />
      </body>
    </html>
  )
}
