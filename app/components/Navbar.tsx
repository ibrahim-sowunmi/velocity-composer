'use client'

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export function Navbar() {
  const { data: session, status } = useSession()

  const handleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                className="h-8 w-auto"
                src="/vercel.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Platform
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            {status === 'loading' ? (
              <div className="text-gray-500">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    className="rounded-full"
                    width={32}
                    height={32}
                  />
                )}
                <span className="text-gray-800">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 