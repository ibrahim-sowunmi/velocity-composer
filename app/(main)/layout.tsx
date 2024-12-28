import Navbar from '@/app/components/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl p-6">
        {children}
      </main>
    </>
  )
} 