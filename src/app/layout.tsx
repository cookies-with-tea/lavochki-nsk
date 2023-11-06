import { ReactNode } from 'react'

import '@/styles/index.scss'
import { requireSvg } from '@/shared/lib/utils'
import { Header } from '@/components/widgets/header'

requireSvg()

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang={'ru'}>
      <body>
        <Header />
        <main>{children}</main>
        <script async src={'https://telegram.org/js/telegram-widget.js?27'} />
      </body>
    </html>
  )
}
