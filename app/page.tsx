
import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  // If user is logged in, redirect to library
  if (session) {
    redirect("/library")
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center space-y-8 p-8">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your one-stop solution for everything you need. Join our community today and discover amazing features.
          </p>
          <Link
            href="/docs"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Go to Docs
          </Link>
        </div>
      </main>
    </>
  )
} 
