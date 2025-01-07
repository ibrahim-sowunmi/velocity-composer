'use client'

import { MessageCircle } from 'lucide-react'

interface CommentsButtonProps {
  onOpenComments: () => void
  buttonBaseStyles?: string
  commentCount: number
}

export function CommentsButton({ onOpenComments, buttonBaseStyles, commentCount }: CommentsButtonProps) {
  const defaultButtonStyles = "p-3 rounded-lg transition-all duration-300 z-50 flex items-center gap-2 text-sm font-medium justify-center relative"
  const styles = buttonBaseStyles || defaultButtonStyles

  return (
    <button
      onClick={onOpenComments}
      className={`${styles} bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 group w-[180px]`}
    >
      <MessageCircle className="absolute left-4 h-4 w-4 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100" />
      <span className="transform transition-all duration-300 group-hover:translate-x-2">
        Comments {<span className="ml-1">({commentCount})</span>}
      </span>
    </button>
  )
} 