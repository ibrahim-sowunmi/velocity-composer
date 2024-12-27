import Link from 'next/link'
import { auth } from '@/auth'
import SignIn from './sign-in'
import { SignOut } from './sign-out'
import UserAvatar from './UserAvatar'

export default async function Navbar() {
  const session = await auth()

  return (
    <header className="w-full border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          Platform
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                {session.user?.name}
              </span>
              <UserAvatar />
              <div className="rounded-md bg-red-500 hover:bg-red-600 transition-colors">
                <SignOut />
              </div>
            </div>
          ) : (
            <div className="rounded-md bg-blue-500 hover:bg-blue-600 transition-colors">
              <SignIn />
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
