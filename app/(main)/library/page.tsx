import { auth } from "@/auth"
import { db } from "@/lib/db"
import { ContentView } from "@/app/components/content/ContentView"

export default async function Library() {
  const session = await auth()
  if (!session || !session.user) {
    return null
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    select: {
      id: true
    }
  })

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-stripe-danger">User not found</div>
      </div>
    )
  }

  // Get root level items (no parent)
  const [files, folders] = await Promise.all([
    db.file.findMany({
      where: {
        userId: user.id,
        folderId: null // No parent folder
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    db.folder.findMany({
      where: {
        userId: user.id,
        parentId: null // No parent folder
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  ])

  return (
    <ContentView
      viewType="library"
      initialFiles={files}
      initialFolders={folders}
      userName={session.user.name || ''}
    />
  )
}
