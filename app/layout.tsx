import { Open_Sans } from 'next/font/google'
import './globals.css'
import './styles/puck-overrides.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  preload: true,
  weight: ['300', '400', '500', '600', '700', '800']
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
