'use client'

import { useState, useEffect, useCallback } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { CommentsButton } from './CommentsButton'
import { useParams } from 'next/navigation'
import { getVotes, upsertVote, deleteVote } from '@/app/actions/vote'

interface VoteState {
  upvotes: number
  downvotes: number
  userVote: boolean | null
}

interface FeedbackButtonsProps {
  onOpenComments: () => void
  commentCount: number
}

export function FeedbackButtons({ onOpenComments, commentCount }: FeedbackButtonsProps) {
  const params = useParams()
  const fileId = params?.id as string
  const [voteState, setVoteState] = useState<VoteState>({
    upvotes: 0,
    downvotes: 0,
    userVote: null
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchVotes = useCallback(async () => {
    try {
      const result = await getVotes(fileId)
      if (result.success && 'upvotes' in result) {
        setVoteState({
          upvotes: result.upvotes ?? 0,
          downvotes: result.downvotes ?? 0,
          userVote: result.userVote ?? null
        })
      } else {
        console.error('Error fetching votes:', result.error)
      }
    } catch (error) {
      console.error('Error fetching votes:', error)
    }
  }, [fileId])

  useEffect(() => {
    fetchVotes()
  }, [fetchVotes])

  const handleVote = async (isUpvote: boolean) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      // If clicking the same vote type again, remove the vote
      if (voteState.userVote === isUpvote) {
        // Optimistic update
        setVoteState(prev => ({
          upvotes: prev.upvotes - (isUpvote ? 1 : 0),
          downvotes: prev.downvotes - (isUpvote ? 0 : 1),
          userVote: null
        }))

        const result = await deleteVote(fileId)
        if (!result.success) {
          throw new Error(result.error)
        }
      } else {
        // Optimistic update
        setVoteState(prev => ({
          upvotes: prev.upvotes + (isUpvote ? 1 : 0) - (prev.userVote === false ? 0 : prev.userVote === true ? 1 : 0),
          downvotes: prev.downvotes + (isUpvote ? 0 : 1) - (prev.userVote === true ? 0 : prev.userVote === false ? 1 : 0),
          userVote: isUpvote
        }))

        const result = await upsertVote(fileId, isUpvote)
        if (!result.success) {
          throw new Error(result.error)
        }
      }
    } catch (error) {
      console.error('Error updating vote:', error)
      // Revert optimistic update on error
      await fetchVotes()
    } finally {
      setIsLoading(false)
    }
  }

  const buttonBaseStyles = "py-2.5 px-3 rounded-lg transition-all duration-300 z-50 flex items-center gap-2 text-sm font-medium justify-center relative shadow-sm"

  return (
    <div className="fixed bottom-6 left-6 flex items-center gap-3">
      <CommentsButton 
        buttonBaseStyles={buttonBaseStyles} 
        onOpenComments={onOpenComments} 
        commentCount={commentCount}
      />
      <button
        onClick={() => handleVote(false)}
        disabled={isLoading}
        className={`${buttonBaseStyles} ${
          voteState.userVote === false
            ? 'bg-red-500 text-white border border-red-500' 
            : 'bg-white text-red-500 border border-red-200 hover:bg-red-50 hover:border-red-300'
        } group w-[180px]`}
        title="Not Helpful"
      >
        <ThumbsDown className="absolute left-4 h-5 w-5 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100" />
        <span className="transform transition-all duration-300 group-hover:translate-x-2">
          Not Helpful
        </span>
      </button>
      <button
        onClick={() => handleVote(true)}
        disabled={isLoading}
        className={`${buttonBaseStyles} ${
          voteState.userVote === true
            ? 'bg-[#635BFF] text-white border border-[#635BFF]' 
            : 'bg-white text-[#635BFF] border border-[#635BFF] hover:bg-[#635BFF]/5 hover:border-[#635BFF]'
        } group w-[180px]`}
        title="Helpful"
      >
        <ThumbsUp className="absolute left-4 h-5 w-5 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100" />
        <span className="transform transition-all duration-300 group-hover:translate-x-2">
          Helpful
        </span>
      </button>
    </div>
  )
} 