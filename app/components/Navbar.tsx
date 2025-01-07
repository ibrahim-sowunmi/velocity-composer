import Link from 'next/link'
import { auth } from '@/auth'
import SignIn from './sign-in'
import { SignOut } from './sign-out'
import UserAvatar from './UserAvatar'

export default async function Navbar() {
  const session = await auth()

  return (
    <header className="z-50 w-full border-b border-stripe-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-lg font-medium text-stripe-text hover:text-stripe-text-dark transition-colors"
        >
          <span className="bg-gradient-to-r from-stripe-primary to-stripe-primary-dark bg-clip-text text-transparent">
          Velocity
          </span>
          <span> Composer</span>
        </Link>

        <div className="flex items-center gap-6">
          {session ? (
            <div className="flex items-center gap-6">
              <UserAvatar />
              <div className="h-6 w-px bg-stripe-border" />
              <SignOut />
            </div>
          ) : (
            <SignIn />
          )}
        </div>
      </nav>
    </header>
  )
}
