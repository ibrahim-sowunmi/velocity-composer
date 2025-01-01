'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyContentButtonProps {
  buttonBaseStyles: string
  getContent: () => string | Promise<string>
}

export function CopyContentButton({ buttonBaseStyles, getContent }: CopyContentButtonProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        } catch (clipboardErr) {
          console.error('Failed to use clipboard API:', clipboardErr)
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
            } catch (execError) {
              console.error('Failed to execute copy command:', execError)
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
          } catch (fallbackError) {
            console.error('Failed to copy with fallback:', fallbackError)
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
    } catch (copyError) {
      console.error('Failed to copy to clipboard:', copyError)
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <>
      <button
        onClick={handleCopy}
        className={`${buttonBaseStyles} group ${
          error 
            ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
            : copied
            ? 'bg-green-600 hover:bg-green-600 text-white border border-green-600'
            : 'bg-[#635BFF] hover:bg-[#635BFF]/90 text-white border border-[#635BFF]'
        }`}
        title={error || "Copy to clipboard"}
      >
        {error ? (
          <span className="transform transition-all duration-300">Copy failed</span>
        ) : copied ? (
          <div className="flex items-center gap-2 transform transition-all duration-300 scale-105">
            <Check className="h-5 w-5 text-white" />
            <span>Copied</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Copy className="absolute left-4 h-5 w-5 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 text-white" />
            <span className="transform transition-all duration-300 group-hover:translate-x-2">Copy Email</span>
          </div>
        )}
      </button>
      <style jsx global>{`
        @keyframes smoothBounce {
          0%, 100% {
            transform: translateY(0) scale(1.1);
          }
          50% {
            transform: translateY(-25%) scale(1.1);
          }
        }
      `}</style>
    </>
  )
} 