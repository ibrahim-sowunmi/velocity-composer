import { auth } from "@/auth"
import { db } from "@/lib/db"
import { FileItem } from "@/app/components/file/FileItem"
import { FolderItem } from "@/app/components/folder/FolderItem"
import { CreateFileDialog } from "@/app/components/file/CreateFileDialog"
import { CreateFolderDialog } from "@/app/components/folder/CreateFolderDialog"
import { deleteFile, renameFile } from "@/app/actions/file"
import { deleteFolder, renameFolder } from "@/app/actions/folder"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

interface FolderPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function FolderPage({ params }: FolderPageProps) {
  const { id } = await params
  const session = await auth()
  if (!session || !session.user) return null

  const user = await db.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    select: {
      id: true
    }
  })

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  const folder = await db.folder.findUnique({
    where: {
      id,
      userId: user.id
    },
    include: {
      parent: true
    }
  })

  if (!folder) {
    return <div>Folder not found</div>
  }

  // Get items in this folder
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/library" className="text-stripe-muted hover:text-stripe-text transition-colors">
            Library
          </Link>
          {folder.parent && (
            <>
              <ChevronRightIcon className="h-4 w-4 text-stripe-muted" />
              <Link
                href={`/folder/${folder.parent.id}`}
                className="text-stripe-muted hover:text-stripe-text transition-colors"
              >
                {folder.parent.name}
              </Link>
            </>
          )}
          <ChevronRightIcon className="h-4 w-4 text-stripe-muted" />
          <span className="text-stripe-text font-medium">{folder.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <CreateFileDialog folderId={folder.id} />
          <CreateFolderDialog parentId={folder.id} />
        </div>
      </div>

      <div className="rounded-lg border border-stripe-border bg-white shadow-stripe">
        {folders.length === 0 && files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-stripe-muted text-center mb-4">
              This folder is empty. Create a new file or folder to get started.
            </p>
            <div className="flex gap-3">
              <CreateFileDialog folderId={folder.id} />
              <CreateFolderDialog parentId={folder.id} />
            </div>
          </div>
        ) : (
          <div className="divide-y divide-stripe-border">
            {/* Show folders first */}
            {folders.map((subfolder) => (
              <FolderItem
                key={subfolder.id}
                folder={subfolder}
                onDelete={deleteFolder}
                onRename={renameFolder}
              />
            ))}
            {/* Then show files */}
            {files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onDelete={deleteFile}
                onRename={renameFile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 