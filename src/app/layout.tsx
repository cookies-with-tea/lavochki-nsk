import { ReactNode } from 'react'

import '@/styles/index.scss'
import { requireSvg } from '@/shared/lib/utils'

requireSvg()

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang={'ru'}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
