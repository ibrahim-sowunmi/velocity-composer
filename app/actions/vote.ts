'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getVotes(fileId: string) {
  try {
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

    const file = await db.file.findFirst({
      where: {
        id: fileId,
        OR: [
          { userId: user.id },
          { isPublic: true }
        ]
      },
      select: {
        upvoteCount: true,
        downvoteCount: true
      }
    })

    if (!file) {
      return { success: false, error: 'File not found' }
    }

    // Get user's current vote if any
    const userVote = await db.vote.findUnique({
      where: {
        fileId_userId: {
          fileId,
          userId: user.id
        }
      },
      select: {
        isUpvote: true
      }
    })

    return {
      success: true,
      upvotes: file.upvoteCount,
      downvotes: file.downvoteCount,
      userVote: userVote?.isUpvote
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to get votes:', error.message)
    }
    return { success: false, error: 'Failed to get votes' }
  }
}

export async function upsertVote(fileId: string, isUpvote: boolean) {
  try {
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

    // Check if file exists and is public or owned by user
    const file = await db.file.findFirst({
      where: {
        id: fileId,
        OR: [
          { userId: user.id },
          { isPublic: true }
        ]
      }
    })

    if (!file) {
      return { success: false, error: 'File not found' }
    }

    // Upsert the vote
    const vote = await db.$transaction(async (tx) => {
      // Get existing vote if any
      const existingVote = await tx.vote.findUnique({
        where: {
          fileId_userId: {
            fileId,
            userId: user.id
          }
        }
      })

      // If vote exists and is same type, do nothing
      if (existingVote && existingVote.isUpvote === isUpvote) {
        return existingVote
      }

      // Update vote counts on file
      if (existingVote) {
        // Change vote type
        await tx.file.update({
          where: { id: fileId },
          data: {
            upvoteCount: {
              increment: isUpvote ? 1 : -1
            },
            downvoteCount: {
              increment: isUpvote ? -1 : 1
            }
          }
        })
      } else {
        // New vote
        await tx.file.update({
          where: { id: fileId },
          data: {
            upvoteCount: {
              increment: isUpvote ? 1 : 0
            },
            downvoteCount: {
              increment: isUpvote ? 0 : 1
            }
          }
        })
      }

      // Upsert the vote
      return await tx.vote.upsert({
        where: {
          fileId_userId: {
            fileId,
            userId: user.id
          }
        },
        update: {
          isUpvote
        },
        create: {
          fileId,
          userId: user.id,
          isUpvote
        }
      })
    })

    revalidatePath(`/view/${fileId}`)
    return { success: true, vote }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to update vote:', error.message)
    }
    return { success: false, error: 'Failed to update vote' }
  }
}

export async function deleteVote(fileId: string) {
  try {
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

    // Delete vote and update counts in a transaction
    await db.$transaction(async (tx) => {
      const vote = await tx.vote.findUnique({
        where: {
          fileId_userId: {
            fileId,
            userId: user.id
          }
        }
      })

      if (vote) {
        // Update file vote counts
        await tx.file.update({
          where: { id: fileId },
          data: {
            upvoteCount: {
              decrement: vote.isUpvote ? 1 : 0
            },
            downvoteCount: {
              decrement: vote.isUpvote ? 0 : 1
            }
          }
        })

        // Delete the vote
        await tx.vote.delete({
          where: {
            fileId_userId: {
              fileId,
              userId: user.id
            }
          }
        })
      }
    })

    revalidatePath(`/view/${fileId}`)
    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to delete vote:', error.message)
    }
    return { success: false, error: 'Failed to delete vote' }
  }
} 