'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { puckConfig } from "@/app/config/puck"
import { Prisma } from "@prisma/client"

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
    const file = await db.file.findUnique({
      where: {
        id,
        userId: user.id
      },
      select: {
        id: true,
        name: true,
        folderId: true,
        puckData: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!file) {
      return { success: false, error: 'File not found' }
    }

    return { success: true, file }
  } catch (error) {
    return { success: false, error: 'Failed to get file data' }
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

    const file = await db.file.update({
      where: {
        id,
        userId: user.id
      },
      data: {
        puckData,
        productList: Array.from(productList)
      }
    })

    revalidatePath('/library')
    revalidatePath(`/editor/${id}`)
    return { success: true, file }
  } catch (error) {
    return { success: false, error: 'Failed to save file data' }
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
    const file = await db.file.create({
      data: {
        name,
        folderId: folderId || null,
        userId: user.id,
        puckData: {},
        productList: []
      }
    })

    revalidatePath('/library')
    if (folderId) revalidatePath(`/folder/${folderId}`)
    return { success: true, file }
  } catch (error) {
    return { success: false, error: 'Failed to create file' }
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
    const file = await db.file.delete({
      where: { 
        id,
        userId: user.id
      }
    })

    revalidatePath('/library')
    if (file.folderId) revalidatePath(`/folder/${file.folderId}`)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete file' }
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
    return { success: false, error: 'Failed to rename file' }
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
    return { success: false, error: 'Failed to toggle file visibility' }
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
    return { success: false, error: 'Failed to search files' }
  }
}

export async function forkFile(fileId: string) {
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
        puckData: originalFile.puckData as Prisma.InputJsonValue,
        productList: originalFile.productList,
        isPublic: false,
        originalFileId: fileId
      }
    })

    revalidatePath('/library')
    return { success: true, file: forkedFile }
  } catch (error) {
    return { success: false, error: 'Failed to fork file' }
  }
} 