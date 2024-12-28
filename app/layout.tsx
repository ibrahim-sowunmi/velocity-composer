import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="min-h-screen bg-[#f6f9fc] font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
