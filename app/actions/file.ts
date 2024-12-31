'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { puckConfig } from "@/app/config/puck"
import { Prisma } from "@prisma/client"

// Helper function to update parent folder timestamps
async function updateParentFolderTimestamps(folderId: string | null, userId: string) {
  if (!folderId) return;
  
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

export async function getFileData(id: string) {
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
    const file = await db.file.findFirst({
      where: {
        id,
        OR: [
          { userId: user.id },
          { isPublic: true }
        ]
      },
      select: {
        id: true,
        name: true,
        folderId: true,
        puckData: true,
        createdAt: true,
        updatedAt: true,
        isPublic: true,
        userId: true
      }
    })

    if (!file) {
      return { success: false, error: 'File not found or not accessible' }
    }

    return { 
      success: true, 
      file: {
        ...file,
        canEdit: file.userId === user.id
      },
      currentUserId: user.id
    }
  } catch (error) {
    console.error('Failed to get file data:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to get file data' }
  }
}

export async function saveFileData(id: string, puckData: any) {
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
      // Extract unique categories from the puckData content
      const productList = new Set<string>()
      
      // Analyze each component in the puckData content
      puckData.content?.forEach((item: any) => {
        // Find which category this component belongs to
        for (const [categoryKey, category] of Object.entries(puckConfig.categories)) {
          if ((category as any).components?.includes(item.type)) {
            productList.add(categoryKey)
            break
          }
        }
      })

      const file = await tx.file.update({
        where: {
          id,
          userId: user.id
        },
        data: {
          puckData,
          productList: Array.from(productList)
        }
      });

      if (file.folderId) {
        await updateParentFolderTimestamps(file.folderId, user.id);
      }

      return file;
    });

    revalidatePath('/library')
    revalidatePath(`/editor/${id}`)
    return { success: true, file: result }
  } catch (error) {
    console.error('Failed to save file data:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to save file data' }
  }
}

export async function createFile(formData: FormData) {
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
  const folderId = formData.get('folderId') as string | null

  if (!name) {
    return { success: false, error: 'Name is required' }
  }

  try {
    const result = await db.$transaction(async (tx) => {
      const file = await tx.file.create({
        data: {
          name,
          folderId: folderId || null,
          userId: user.id,
          puckData: {},
          productList: []
        }
      });

      if (folderId) {
        await updateParentFolderTimestamps(folderId, user.id);
      }

      return file;
    });

    revalidatePath('/library')
    if (folderId) revalidatePath(`/folder/${folderId}`)
    return { success: true, file: result }
  } catch (error) {
    console.error('Failed to create file:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create file' }
  }
}

export async function deleteFile(id: string) {
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
      const file = await tx.file.delete({
        where: { 
          id,
          userId: user.id
        }
      });

      if (file.folderId) {
        await updateParentFolderTimestamps(file.folderId, user.id);
      }

      return file;
    });

    revalidatePath('/library')
    if (result.folderId) revalidatePath(`/folder/${result.folderId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to delete file:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete file' }
  }
}

export async function renameFile(id: string, newName: string) {
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
    const file = await db.file.update({
      where: { 
        id,
        userId: user.id
      },
      data: { name: newName }
    })

    revalidatePath('/library')
    if (file.folderId) revalidatePath(`/folder/${file.folderId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to rename file:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to rename file' }
  }
}

export async function toggleFileVisibility(id: string) {
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
    const file = await db.file.findUnique({
      where: { 
        id,
        userId: user.id
      },
      select: {
        isPublic: true
      }
    })

    if (!file) {
      return { success: false, error: 'File not found' }
    }

    const updatedFile = await db.file.update({
      where: { 
        id,
        userId: user.id
      },
      data: { 
        isPublic: !file.isPublic 
      }
    })

    revalidatePath('/library')
    if (updatedFile.folderId) revalidatePath(`/folder/${updatedFile.folderId}`)
    return { success: true, isPublic: updatedFile.isPublic }
  } catch (error) {
    console.error('Failed to toggle file visibility:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to toggle file visibility' }
  }
}

export async function searchPublicFiles(query: string) {
  const session = await auth()
  if (!session || !session.user) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const files = await db.file.findMany({
      where: {
        isPublic: true,
        name: {
          contains: query,
          mode: 'insensitive'
        }
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 10
    })

    return { 
      success: true, 
      files: files.map(file => ({
        ...file,
        creatorEmail: file.user.email
      }))
    }
  } catch (error) {
    console.error('Failed to search files:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to search files' }
  }
}

export async function forkFile(fileId: string, currentFolderId?: string) {
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
    const originalFile = await db.file.findUnique({
      where: { 
        id: fileId,
        isPublic: true
      }
    })

    if (!originalFile) {
      return { success: false, error: 'File not found or not public' }
    }

    const forkedFile = await db.file.create({
      data: {
        name: `${originalFile.name} (forked)`,
        userId: user.id,
        folderId: currentFolderId || null,
        puckData: originalFile.puckData as Prisma.InputJsonValue,
        productList: originalFile.productList,
        isPublic: false,
        originalFileId: fileId
      }
    })

    revalidatePath('/library')
    if (currentFolderId) revalidatePath(`/folder/${currentFolderId}`)
    return { success: true, file: forkedFile }
  } catch (error) {
    console.error('Failed to fork file:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to fork file' }
  }
}

export async function copyFile(id: string, currentFolderId?: string) {
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
    // Get the original file
    const originalFile = await db.file.findUnique({
      where: { 
        id,
        userId: user.id
      }
    })

    if (!originalFile) {
      return { success: false, error: 'File not found' }
    }

    // Find existing copies to determine the suffix
    const existingCopies = await db.file.findMany({
      where: {
        userId: user.id,
        name: {
          startsWith: originalFile.name + ' (copy'
        }
      }
    })

    let newName = `${originalFile.name} (copy)`
    if (existingCopies.length > 0) {
      const copyNumbers = existingCopies
        .map(f => {
          const match = f.name.match(/\(copy( \d+)?\)$/)
          if (!match) return 1
          const num = match[1]
          return num ? parseInt(num.trim()) : 1
        })
        .filter(n => !isNaN(n))

      const maxNumber = Math.max(0, ...copyNumbers)
      newName = `${originalFile.name} (copy ${maxNumber + 1})`
    }

    // Create the copy
    const copiedFile = await db.file.create({
      data: {
        name: newName,
        folderId: currentFolderId || originalFile.folderId,
        userId: user.id,
        puckData: originalFile.puckData as Prisma.InputJsonValue,
        productList: originalFile.productList,
        isPublic: false
      }
    })

    revalidatePath('/library')
    if (copiedFile.folderId) revalidatePath(`/folder/${copiedFile.folderId}`)
    return { success: true, file: copiedFile }
  } catch (error) {
    console.error('Failed to copy file:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to copy file' }
  }
}

export async function moveFile(fileId: string, newFolderId: string | null) {
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
      // Get the current file to check ownership and get the old folderId
      const currentFile = await tx.file.findFirst({
        where: {
          id: fileId,
          userId: user.id
        }
      })

      if (!currentFile) {
        throw new Error('File not found or unauthorized')
      }

      // Update the file with the new folder
      const updatedFile = await tx.file.update({
        where: {
          id: fileId,
          userId: user.id
        },
        data: {
          folderId: newFolderId
        }
      })

      // Update timestamps for both old and new parent folders
      if (currentFile.folderId) {
        await updateParentFolderTimestamps(currentFile.folderId, user.id)
      }
      if (newFolderId) {
        await updateParentFolderTimestamps(newFolderId, user.id)
      }

      return updatedFile
    })

    // Revalidate all affected paths
    revalidatePath('/library')
    if (result.folderId) revalidatePath(`/folder/${result.folderId}`)
    return { success: true, file: result }
  } catch (error) {
    console.error('Failed to move file:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to move file' }
  }
} 