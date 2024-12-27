'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createFile(formData: FormData) {
  const session = await auth()

  if (!session || !session.user) {
    return { success: false, error: 'Unauthorized' }
  }
  
  // Get userId by looking up the email
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

  try {
    const file = await db.file.delete({
      where: { 
        id,
        userId: session.user.id as string
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

  if (!newName.trim()) {
    return { success: false, error: 'Name is required' }
  }

  try {
    const file = await db.file.update({
      where: { 
        id,
        userId: session.user.id as string
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