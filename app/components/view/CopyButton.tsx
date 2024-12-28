'use client'

import { useState } from 'react'
import { Copy, Check, PenTool } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface CopyButtonProps {
  getContent: () => string | Promise<string>
}

export function CopyButton({ getContent }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const fileId = params?.id as string

  const buttonBaseStyles = "p-4 rounded-full shadow-lg transition-colors z-50 flex items-center gap-2 text-base font-medium w-[180px] justify-center"

  const handleCopy = async () => {
    try {
      const content = await Promise.resolve(getContent())
      
      if (!content) return

      // Try the modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = content
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        try {
          document.execCommand('copy')
          textArea.remove()
        } catch (err) {
          textArea.remove()
          throw new Error('Copy failed')
        }
      }

      setCopied(true)
      setError(null)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy')
      setTimeout(() => setError(null), 2000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3">
      <Link
        href={`/editor/${fileId}`}
        className={`${buttonBaseStyles} bg-gray-100 text-gray-900 hover:bg-gray-200`}
      >
        <PenTool className="h-6 w-6" />
        <span>Edit Content</span>
      </Link>
      <button
        onClick={handleCopy}
        className={`${buttonBaseStyles} ${
          error 
            ? 'bg-stripe-danger text-white hover:bg-stripe-danger-dark'
            : 'bg-stripe-primary text-white hover:bg-stripe-primary-dark'
        }`}
        title={error || "Copy to clipboard"}
      >
        {error ? (
          <span>Copy failed</span>
        ) : copied ? (
          <>
            <Check className="h-6 w-6" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-6 w-6" />
            <span>Copy Content</span>
          </>
        )}
      </button>
    </div>
  )
} 