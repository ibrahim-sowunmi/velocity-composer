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
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">
        {session.user.name || 'My'} Library
      </h1>

      <div className="flex items-center gap-4">
        <CreateFileDialog />
        <CreateFolderDialog />
      </div>

      <div className="flex flex-col gap-1">
        {folders.length === 0 && files.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No items yet. Create a new file or folder to get started.
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
