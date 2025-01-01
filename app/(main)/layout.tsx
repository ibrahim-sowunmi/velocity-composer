import Navbar from '@/app/components/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <footer className="border-t border-stripe-border mt-auto">
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <a href="https://docs.velocitycomposer.com" target="_blank" rel="noopener noreferrer" className="text-sm text-stripe-muted hover:text-stripe-text transition-colors">
                Docs
              </a>
              <a href="https://github.com/velocity-composer/velocity-composer/issues/new?labels=feedback" target="_blank" rel="noopener noreferrer" className="text-sm text-stripe-muted hover:text-stripe-text transition-colors">
                Feedback
              </a>
            </div>
            <div className="text-sm text-stripe-muted">
              Created with ❤️ by SAs
            </div>
          </div>
        </div>
      </footer>
    </>
  )
} 