'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

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
    const folder = await db.folder.create({
      data: {
        name,
        parentId: parentId || null,
        userId: user.id
      }
    })

    revalidatePath('/library')
    if (parentId) revalidatePath(`/folder/${parentId}`)
    return { success: true, folder }
  } catch (error) {
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
    const folder = await db.folder.delete({
      where: { 
        id,
        userId: user.id
      }
    })

    revalidatePath('/library')
    if (folder.parentId) revalidatePath(`/folder/${folder.parentId}`)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete folder' }
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
    const folder = await db.folder.update({
      where: { 
        id,
        userId: user.id
      },
      data: { name: newName }
    })

    revalidatePath('/library')
    if (folder.parentId) revalidatePath(`/folder/${folder.parentId}`)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to rename folder' }
  }
} 