import Link from 'next/link'
import { auth } from '@/auth'
import SignIn from './sign-in'
import { SignOut } from './sign-out'
import UserAvatar from './UserAvatar'

export default async function Navbar() {
  const session = await auth()

  return (
    <header className="w-full border-b border-stripe-border bg-white shadow-stripe-sm">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-stripe-text">
          Velocity Email Composer
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <UserAvatar />
              <div>
                <SignOut />
              </div>
            </div>
          ) : (
            <div>
              <SignIn />
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
