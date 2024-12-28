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
        try {
          // Create a blob with HTML content type
          const htmlBlob = new Blob([content], { type: 'text/html' })
          // Also create a plain text version
          const plainTextBlob = new Blob([content.replace(/<[^>]+>/g, '')], { type: 'text/plain' })
          
          const clipboardItem = new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': plainTextBlob
          })
          await navigator.clipboard.write([clipboardItem])
        } catch (err) {
          // If modern approach fails, try the selection approach
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = content
          tempDiv.style.position = 'fixed'
          tempDiv.style.pointerEvents = 'none'
          tempDiv.style.opacity = '0'
          document.body.appendChild(tempDiv)
          
          const range = document.createRange()
          range.selectNodeContents(tempDiv)
          
          const selection = window.getSelection()
          if (selection) {
            selection.removeAllRanges()
            selection.addRange(range)
            
            try {
              document.execCommand('copy')
            } catch (execErr) {
              throw new Error('Copy failed')
            } finally {
              selection.removeAllRanges()
              tempDiv.remove()
            }
          }
        }
      } else {
        // Fallback for older browsers
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = content
        tempDiv.style.position = 'fixed'
        tempDiv.style.pointerEvents = 'none'
        tempDiv.style.opacity = '0'
        document.body.appendChild(tempDiv)
        
        const range = document.createRange()
        range.selectNodeContents(tempDiv)
        
        const selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          selection.addRange(range)
          
          try {
            document.execCommand('copy')
          } catch (err) {
            throw new Error('Copy failed')
          } finally {
            selection.removeAllRanges()
            tempDiv.remove()
          }
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