import { auth } from "@/auth"
import { db } from "@/lib/db"
import { FileItem } from "@/app/components/file/FileItem"
import { FolderItem } from "@/app/components/folder/FolderItem"
import { CreateFileDialog } from "@/app/components/file/CreateFileDialog"
import { CreateFolderDialog } from "@/app/components/folder/CreateFolderDialog"
import { deleteFile, renameFile } from "@/app/actions/file"
import { deleteFolder, renameFolder } from "@/app/actions/folder"

export default async function Library() {
  const session = await auth()
  if (!session || !session.user) {
    console.log("No session or user")
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
    return { success: false, error: 'User not found' }
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className=" font-bold text-stripe-text">
          {(session.user.name?.split(' ')[0] || 'Undefined')}'s Library
        </h1>
        <div className="flex items-center gap-3">
          <CreateFileDialog />
          <CreateFolderDialog />
        </div>
      </div>

      <div className="rounded-lg border border-stripe-border bg-white shadow-stripe">
        {folders.length === 0 && files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-stripe-muted text-center mb-4">
              No items yet. Create a new file or folder to get started.
            </p>
            <div className="flex gap-3">
              <CreateFileDialog />
              <CreateFolderDialog />
            </div>
          </div>
        ) : (
          <div className="divide-y divide-stripe-border">
            {/* Show folders first */}
            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
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
