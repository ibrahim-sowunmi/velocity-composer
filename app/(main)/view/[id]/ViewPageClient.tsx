'use client'

import { Render } from "@measured/puck"
import "@measured/puck/puck.css"
import { useState, useRef, useCallback } from "react"
import { puckConfig } from "@/app/config/puck"
import { ViewButtonMenu } from "@/app/components/view/ViewButtonMenu"
import { FeedbackButtons } from "@/app/components/view/FeedbackButtons"
import { CommentSlider } from "@/app/components/comments/CommentSlider"
import { useParams } from "next/navigation"
import { Config } from "@measured/puck"

interface ViewPageClientProps {
  initialData: {
    content: any[]
    root: Record<string, any>
  }
  fileData: {
    id: string
    userId: string
    [key: string]: any
  }
  currentUserId: string
  currentUserEmail: string | null
}

export default function ViewPageClient({ 
  initialData,
  fileData,
  currentUserId,
  currentUserEmail
}: ViewPageClientProps) {
  const params = useParams()
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const getTextContent = useCallback((): Promise<string> => {
    if (!contentRef.current) return Promise.resolve('')
    
    return new Promise<string>(resolve => {
      setTimeout(() => {
        const html = contentRef.current?.innerHTML || ''
        resolve(html)
      }, 100)
    })
  }, [])

  const handleOpenComments = useCallback(() => {
    setIsCommentsOpen(true)
  }, [])

  const handleCloseComments = useCallback(() => {
    setIsCommentsOpen(false)
  }, [])

  const handleCommentCountChange = useCallback((count: number) => {
    setCommentCount(count)
  }, [])

  const isOwner = Boolean(currentUserId && fileData?.userId === currentUserId)

  return (
    <>
      <div className="relative" ref={contentRef}>
        <Render config={puckConfig as Config} data={initialData} />
      </div>
      <ViewButtonMenu 
        getContent={getTextContent} 
        canEdit={isOwner} 
      />
      <FeedbackButtons 
        onOpenComments={handleOpenComments} 
        commentCount={commentCount}
      />
      <CommentSlider 
        fileId={params.id as string}
        isOpen={isCommentsOpen}
        onClose={handleCloseComments}
        currentUserEmail={currentUserEmail}
        onCommentCountChange={handleCommentCountChange}
      />
    </>
  )
} 