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
      }
    }),
    db.folder.findMany({
      where: {
        userId: user.id,  
        parentId: folder.id
      }
    })
  ])

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/library" className="text-blue-500 hover:text-blue-600">
          Library
        </Link>
        {folder.parent && (
          <>
            <ChevronRightIcon className="h-4 w-4" />
            <Link
              href={`/folder/${folder.parent.id}`}
              className="text-blue-500 hover:text-blue-600"
            >
              {folder.parent.name}
            </Link>
          </>
        )}
        <ChevronRightIcon className="h-4 w-4" />
        <span className="font-medium">{folder.name}</span>
      </div>

      <div className="flex items-center gap-4">
        <CreateFileDialog folderId={folder.id} />
        <CreateFolderDialog parentId={folder.id} />
      </div>

      <div className="flex flex-col gap-1">
        {folders.length === 0 && files.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            This folder is empty. Create a new file or folder to get started.
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
} 