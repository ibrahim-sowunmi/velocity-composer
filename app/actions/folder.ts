'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

// Helper function to update parent folder timestamps
async function updateParentFolderTimestamps(folderId: string, userId: string) {
  try {
    let currentFolderId: string | null = folderId;
    
    while (currentFolderId) {
      const parent: { parentId: string | null } = await db.folder.update({
        where: { 
          id: currentFolderId,
          userId: userId
        },
        data: {
          updatedAt: new Date()
        },
        select: {
          parentId: true
        }
      });
      
      if (!parent) break;
      currentFolderId = parent.parentId;
    }
  } catch (error) {
    console.error('Failed to update parent folder timestamps:', error);
  }
}

export async function getFolderContents(folderId: string | null) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error("Unauthorized")
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

  const [files, folders] = await Promise.all([
    db.file.findMany({
      where: {
        userId: user.id,
        folderId: folderId
      }
    }),
    db.folder.findMany({
      where: {
        userId: user.id,
        parentId: folderId
      }
    })
  ])

  return { files, folders }
}

export async function getFolderPath(folderId: string) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error("Unauthorized")
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

  const path = []
  let currentFolder = await db.folder.findUnique({
    where: { id: folderId, userId: user.id }
  })

  while (currentFolder) {
    path.unshift(currentFolder)
    if (!currentFolder.parentId) break
    currentFolder = await db.folder.findUnique({
      where: { id: currentFolder.parentId, userId: user.id }
    })
  }

  return path
}

export async function createFolder(formData: FormData) {
  const session = await auth()
  if (!session || !session.user) {
    return { success: false, error: 'Unauthorized' }
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

  const name = formData.get('name') as string
  const parentId = formData.get('parentId') as string | null

  if (!name) {
    return { success: false, error: 'Name is required' }
  }

  try {
    // Use a transaction to ensure data consistency
    const result = await db.$transaction(async (tx) => {
      const folder = await tx.folder.create({
        data: {
          name,
          parentId: parentId || null,
          userId: user.id
        }
      });

      // Update parent folder timestamps
      if (parentId) {
        await updateParentFolderTimestamps(parentId, user.id);
      }

      return folder;
    });

    revalidatePath('/library')
    if (parentId) revalidatePath(`/folder/${parentId}`)
    return { success: true, folder: result }
  } catch (error: any) {
    console.error('Failed to create folder:', error);
    return { success: false, error: 'Failed to create folder' }
  }
}

export async function deleteFolder(id: string) {
  const session = await auth()
  if (!session || !session.user) {
    return { success: false, error: 'Unauthorized' }
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

  try {
    // Use a transaction to ensure data consistency
    const result = await db.$transaction(async (tx) => {
      // First, get the folder to check if it exists and get its parentId
      const folder = await tx.folder.findUnique({
        where: { 
          id,
          userId: user.id
        }
      })

      if (!folder) {
        throw new Error('Folder not found');
      }

      // Move all files to the parent folder (or root if no parent)
      await tx.file.updateMany({
        where: {
          folderId: id,
          userId: user.id
        },
        data: {
          folderId: folder.parentId // null if no parent folder
        }
      })

      // Delete the folder
      await tx.folder.delete({
        where: { 
          id,
          userId: user.id
        }
      })

      // Update parent folder timestamps
      if (folder.parentId) {
        await updateParentFolderTimestamps(folder.parentId, user.id);
      }

      return folder;
    });

    revalidatePath('/library')
    if (result.parentId) revalidatePath(`/folder/${result.parentId}`)
    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete folder' }
  }
}

export async function renameFolder(id: string, newName: string) {
  const session = await auth()
  if (!session || !session.user) {
    return { success: false, error: 'Unauthorized' }
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

  if (!newName.trim()) {
    return { success: false, error: 'Name is required' }
  }

  try {
    // Use a transaction to ensure data consistency
    const result = await db.$transaction(async (tx) => {
      const folder = await tx.folder.update({
        where: { 
          id,
          userId: user.id
        },
        data: { name: newName }
      });

      // Update parent folder timestamps
      if (folder.parentId) {
        await updateParentFolderTimestamps(folder.parentId, user.id);
      }

      return folder;
    });

    revalidatePath('/library')
    if (result.parentId) revalidatePath(`/folder/${result.parentId}`)
    return { success: true }
  } catch (error: any) {
    console.error('Failed to rename folder:', error);
    return { success: false, error: 'Failed to rename folder' }
  }
}

export async function moveFolder(folderId: string, newParentId: string | null) {
  const session = await auth()
  if (!session || !session.user) {
    return { success: false, error: 'Unauthorized' }
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

  try {
    const result = await db.$transaction(async (tx) => {
      // Get the current folder to check ownership and get the old parentId
      const currentFolder = await tx.folder.findFirst({
        where: {
          id: folderId,
          userId: user.id
        }
      })

      if (!currentFolder) {
        throw new Error('Folder not found or unauthorized')
      }

      // Only check for cycles if we're moving to a new parent
      if (newParentId) {
        // Prevent moving a folder into itself or its descendants
        let parent = await tx.folder.findUnique({
          where: { id: newParentId }
        })
        while (parent) {
          if (parent.id === folderId) {
            throw new Error('Cannot move a folder into itself or its descendants')
          }
          if (!parent.parentId) break
          parent = await tx.folder.findUnique({
            where: { id: parent.parentId }
          })
        }
      }

      // Update the folder with the new parent
      const updatedFolder = await tx.folder.update({
        where: {
          id: folderId,
          userId: user.id
        },
        data: {
          parentId: newParentId
        }
      })

      // Update timestamps for both old and new parent folders
      if (currentFolder.parentId) {
        await updateParentFolderTimestamps(currentFolder.parentId, user.id)
      }
      if (newParentId) {
        await updateParentFolderTimestamps(newParentId, user.id)
      }

      return updatedFolder
    })

    // Revalidate all affected paths
    revalidatePath('/library')
    if (result.parentId) revalidatePath(`/folder/${result.parentId}`)
    return { success: true, folder: result }
  } catch (error) {
    console.error('Failed to move folder:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to move folder' }
  }
} 