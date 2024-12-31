import { auth } from "@/auth"
import { db } from "@/lib/db"
import { ContentView } from "@/app/components/content/ContentView"
import { FileSearch } from "@/app/components/search/FileSearch"
import { signOut } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"


// ts-expect-error
export default async function FolderPage({ params }: any) {
  const { id } = await params
  const session = await auth()
  
  if (!session || !session.user) {
    return null
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email ?? '',
    },
    select: {
      id: true
    }
  })

  if (!user) {
    await signOut({ redirectTo: '/' })
    redirect('/')
  }

  const folder = await db.folder.findUnique({
    where: {
      id: id,
      userId: user.id
    },
    include: {
      parent: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  if (!folder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-stripe-danger">Folder not found</div>
        <Link 
          href="/library" 
          className="text-stripe-primary hover:text-stripe-primary-dark transition-colors"
        >
          Return to Library
        </Link>
      </div>
    )
  }

  const [files, folders] = await Promise.all([
    db.file.findMany({
      where: {
        userId: user.id,
        folderId: folder.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    db.folder.findMany({
      where: {
        userId: user.id,
        parentId: folder.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  ])

  return (
    <div className="space-y-6">
      <FileSearch currentFolderId={id} />
      <ContentView
        viewType="folder"
        folder={folder}
        initialFiles={files}
        initialFolders={folders}
      />
    </div>
  )
} 