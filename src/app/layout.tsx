import {ReactNode} from "react";

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
