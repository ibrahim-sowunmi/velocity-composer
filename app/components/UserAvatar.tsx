import { auth } from '@/auth'
import Image from 'next/image'

export default async function UserAvatar() {
  const session = await auth()
  
  if (!session?.user?.image) return null
  
  return (
    <div className="relative h-8 w-8 rounded-full overflow-hidden">
      <Image
        src={session.user.image}
        alt={session.user.name ?? 'User avatar'}
        className="object-cover"
        fill
        sizes="32px"
      />
    </div>
  )
}