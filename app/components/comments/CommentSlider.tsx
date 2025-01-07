'use client'

import { useEffect, useState, useTransition, useCallback } from 'react'
import { createComment, deleteComment, getComments } from '@/app/actions/comment'
import { X, Loader2, Trash2, Send } from 'lucide-react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

// Function to convert URLs to clickable links
function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stripe-primary hover:text-stripe-primary-dark underline"
        >
          {part}
        </a>
      )
    }
    // Preserve line breaks
    return part.split('\n').map((line, j) => (
      <span key={`${i}-${j}`}>
        {line}
        {j !== part.split('\n').length - 1 && <br />}
      </span>
    ))
  })
}

interface Comment {
  id: string
  content: string
  createdAt: Date
  user: {
    name: string | null
    email: string
    image: string | null
  }
}

interface CommentSliderProps {
  fileId: string
  isOpen: boolean
  onClose: () => void
  currentUserEmail?: string | null
  onCommentCountChange?: (count: number) => void
}

export function CommentSlider({ fileId, isOpen, onClose, currentUserEmail, onCommentCountChange }: CommentSliderProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [initialLoading, setInitialLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  const loadComments = useCallback(async () => {
    if (!fileId) return
    setInitialLoading(true)
    const result = await getComments(fileId)
    if (result.success) {
      setComments(result.comments ?? [])
      onCommentCountChange?.(result.comments?.length ?? 0)
    }
    setInitialLoading(false)
  }, [fileId, onCommentCountChange])

  useEffect(() => {
    if (fileId && isOpen) {
      loadComments()
    }
  }, [fileId, isOpen, loadComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileId || !newComment.trim()) return

    startTransition(async () => {
      const result = await createComment(fileId, newComment.trim())
      if (result.success && result.comment) {
        setNewComment('')
        setComments(prevComments => [result.comment, ...prevComments])
        onCommentCountChange?.(comments.length + 1)
      }
    })
  }

  const handleDelete = async (commentId: string) => {
    startTransition(async () => {
      const result = await deleteComment(commentId)
      if (result.success) {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId))
        onCommentCountChange?.(comments.length - 1)
      }
    })
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 w-96 bg-white shadow-stripe transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-50`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-stripe-border flex justify-between items-center">
            <h2 className="text-lg font-medium text-stripe-text">Comments</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stripe-hover rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-stripe-muted hover:text-stripe-text" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {initialLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-stripe-muted" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center text-stripe-muted mt-8">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              <motion.div 
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <AnimatePresence mode="popLayout">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      layout
                      className="bg-stripe-light rounded-lg p-4 border border-stripe-border"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {comment.user.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={comment.user.image}
                              alt={comment.user.name || 'User'}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-stripe-primary/10 flex items-center justify-center text-stripe-primary font-medium">
                              {(comment.user.name || comment.user.email)[0].toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-stripe-text">
                              {comment.user.name || comment.user.email}
                            </div>
                            <div className="text-xs text-stripe-muted">
                              {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                            </div>
                          </div>
                        </div>
                        {currentUserEmail === comment.user.email && (
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="text-stripe-muted hover:text-stripe-danger transition-colors"
                            disabled={isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="mt-2 text-stripe-text whitespace-pre-wrap break-words">
                        {linkify(comment.content)}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Comment Form */}
          {currentUserEmail ? (
            <form onSubmit={handleSubmit} className="p-6 border-t border-stripe-border">
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-3 border border-stripe-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-stripe-primary focus:border-transparent placeholder-stripe-muted text-stripe-text"
                  rows={3}
                  style={{ whiteSpace: 'pre-wrap' }}
                />
                <button
                  type="submit"
                  disabled={isPending || !newComment.trim()}
                  className="absolute right-3 bottom-3 p-2 bg-stripe-primary text-white rounded-lg hover:bg-stripe-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 border-t border-stripe-border text-center text-stripe-muted">
              Please sign in to post comments
            </div>
          )}
        </div>
      </div>
    </>
  )
} 