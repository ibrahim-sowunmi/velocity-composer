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

      // Create a temporary container in memory
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = content

      // Handle images - convert them to canvas elements to ensure they're copied
      const images = tempContainer.getElementsByTagName('img')
      await Promise.all(Array.from(images).map(async (img) => {
        try {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            console.warn('Canvas 2D context not available')
            return // Keep original image
          }
          const imgObj = new Image()
          
          // Function to try loading image with proxy if direct load fails
          const loadImage = async (src: string, useProxy = false): Promise<void> => {
            return new Promise((resolve, reject) => {
              imgObj.onload = () => resolve()
              imgObj.onerror = () => {
                if (!useProxy) {
                  // If direct load fails, try with proxy
                  const proxyUrl = `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=${encodeURIComponent(src)}`
                  loadImage(proxyUrl, true).then(resolve).catch(() => {
                    reject(new Error(`Failed to load image${useProxy ? ' with proxy' : ''}: ${src}`))
                  })
                } else {
                  reject(new Error(`Failed to load image with proxy: ${src}`))
                }
              }
              imgObj.crossOrigin = 'anonymous'
              imgObj.src = src
            })
          }

          // Try to load the image
          await loadImage(img.src)
            
          // Only proceed if we have valid dimensions
          if (imgObj.width > 0 && imgObj.height > 0) {
            canvas.width = imgObj.width
            canvas.height = imgObj.height
            ctx.drawImage(imgObj, 0, 0)
              
            try {
              // Try to export as PNG first
              const dataUrl = canvas.toDataURL('image/png')
              const newImg = document.createElement('img')
              // Preserve original image attributes
              newImg.src = dataUrl
              newImg.style.width = img.style.width || img.getAttribute('width') || `${imgObj.width}px`
              newImg.style.height = img.style.height || img.getAttribute('height') || `${imgObj.height}px`
              
              // Preserve alignment if it exists
              const alignment = img.style.float || img.getAttribute('align')
              if (alignment) {
                newImg.style.float = alignment === 'left' || alignment === 'right' ? alignment : 'none'
              }
              
              // Add display block and margin for center alignment
              if (img.style.margin === '0 auto' || img.style.display === 'block' || img.parentElement?.style.textAlign === 'center') {
                newImg.style.display = 'block'
                newImg.style.margin = '0 auto'
              }
              
              img.replaceWith(newImg)
            } catch {
              // Fallback to JPEG if PNG fails
              try {
                const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
                const newImg = document.createElement('img')
                // Preserve original image attributes
                newImg.src = dataUrl
                newImg.style.width = img.style.width || img.getAttribute('width') || `${imgObj.width}px`
                newImg.style.height = img.style.height || img.getAttribute('height') || `${imgObj.height}px`
                
                // Preserve alignment if it exists
                const alignment = img.style.float || img.getAttribute('align')
                if (alignment) {
                  newImg.style.float = alignment === 'left' || alignment === 'right' ? alignment : 'none'
                }
                
                // Add display block and margin for center alignment
                if (img.style.margin === '0 auto' || img.style.display === 'block' || img.parentElement?.style.textAlign === 'center') {
                  newImg.style.display = 'block'
                  newImg.style.margin = '0 auto'
                }
                
                img.replaceWith(newImg)
              } catch {
                console.warn('Failed to convert image to data URL:', img.src)
                // Keep original image
              }
            }
          } else {
            console.warn('Image has invalid dimensions:', img.src)
            // Keep original image
          }
        } catch (error) {
          // Log warning instead of error since the functionality still works
          console.warn('Image processing skipped:', {
            src: img.src,
            error: error instanceof Error ? error.message : 'Unknown error'
          })
          // Keep original image
        }
      }))

      // Try the modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        try {
          // Create a blob with HTML content type
          const htmlBlob = new Blob([tempContainer.innerHTML], { type: 'text/html' })
          // Also create a plain text version
          const plainTextBlob = new Blob([tempContainer.textContent || ''], { type: 'text/plain' })
          
          const clipboardItem = new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': plainTextBlob
          })
          await navigator.clipboard.write([clipboardItem])
        } catch (clipboardErr) {
          console.error('Failed to use clipboard API:', clipboardErr)
          // If modern approach fails, try the selection approach
          document.body.appendChild(tempContainer)
          tempContainer.style.position = 'fixed'
          tempContainer.style.pointerEvents = 'none'
          tempContainer.style.opacity = '0'
          
          const range = document.createRange()
          range.selectNodeContents(tempContainer)
          
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
              tempContainer.remove()
            }
          }
        }
      } else {
        // Fallback for older browsers
        document.body.appendChild(tempContainer)
        tempContainer.style.position = 'fixed'
        tempContainer.style.pointerEvents = 'none'
        tempContainer.style.opacity = '0'
        
        const range = document.createRange()
        range.selectNodeContents(tempContainer)
        
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
            tempContainer.remove()
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