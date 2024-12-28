'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

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
    const file = await db.file.update({
      where: {
        id,
        userId: user.id
      },
      data: {
        puckData
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