import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { signIn } from "@/auth"

// Styled sign-in button component for homepage
function HomeSignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/library" })
      }}
    >
      <button 
        type="submit" 
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md border border-stripe-border text-stripe-text hover:text-stripe-primary hover:border-stripe-primary shadow-stripe-sm hover:shadow-stripe transition-all"
      >
        Sign in
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  )
}

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/library")
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      {/* Stripe-style grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>

      <div className="relative">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center space-y-12">
          {/* Main heading with gradient */}
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 mb-6">
            Velocity Composer
          </h1>

          {/* Subheader with value proposition */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-2xl text-gray-600 leading-relaxed">
              Empowering you to craft perfect customer communications in minutes, not hours.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12">
              <div className="p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Time-Saving Templates</h3>
                <p className="text-gray-600">Pre-built templates for common scenarios, customizable in seconds</p>
              </div>
              <div className="p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Consistent Messaging</h3>
                <p className="text-gray-600">Maintain brand voice and technical accuracy across all communications</p>
              </div>
              <div className="p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Collaborative Library</h3>
                <p className="text-gray-600">Share and reuse successful templates across your team</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stripe-primary text-white text-sm font-medium rounded-md hover:bg-stripe-primary-dark shadow-stripe-sm hover:shadow-stripe transition-all"
            >
              Read the docs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <HomeSignIn />
          </div>
        </div>
      </div>
    </main>
  )
} 
