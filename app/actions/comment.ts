'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createComment(fileId: string, content: string) {
  const session = await auth()
  if (!session?.user?.email) {
    return { success: false, error: 'Unauthorized' }
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  })

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  try {
    const comment = await db.comment.create({
      data: {
        content,
        fileId,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    revalidatePath(`/view/${fileId}`)
    return { success: true, comment }
  } catch (error) {
    console.error('Failed to create comment:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create comment' }
  }
}

export async function getComments(fileId: string) {
  const session = await auth()
  if (!session?.user?.email) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const comments = await db.comment.findMany({
      where: { fileId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, comments }
  } catch (error) {
    console.error('Failed to get comments:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to get comments' }
  }
}

export async function deleteComment(commentId: string) {
  const session = await auth()
  if (!session?.user?.email) {
    return { success: false, error: 'Unauthorized' }
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  })

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, fileId: true }
    })

    if (!comment) {
      return { success: false, error: 'Comment not found' }
    }

    if (comment.userId !== user.id) {
      return { success: false, error: 'Not authorized to delete this comment' }
    }

    await db.comment.delete({
      where: { id: commentId }
    })

    revalidatePath(`/view/${comment.fileId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to delete comment:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete comment' }
  }
} 