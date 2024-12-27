import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

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
        <Navbar />
        <main className="mx-auto max-w-7xl p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
