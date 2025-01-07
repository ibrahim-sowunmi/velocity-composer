'use client'

import { useState } from 'react'
import { FileDown } from 'lucide-react'

interface ExportPDFButtonProps {
  buttonBaseStyles: string
  getContent: () => string | Promise<string>
}

export function ExportPDFButton({ buttonBaseStyles, getContent }: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      setError(null)
      
      // Dynamically import html2pdf only when needed
      const html2pdf = (await import('html2pdf.js')).default
      
      const content = await Promise.resolve(getContent())
      if (!content) return

      // Create a temporary container with the content
      const container = document.createElement('div')
      container.innerHTML = content
      container.style.padding = '20px'
      
      // Add custom styles for bullet points and list items
      const styleSheet = document.createElement('style')
      styleSheet.textContent = `
        ul, ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        li {
          margin: 0.5em 0;
          line-height: 1.5;
          position: relative;
        }
        ul > li {
          list-style: none;
        }
        ul > li::before {
          content: "•";
          position: absolute;
          font-size: 1.5em;
          line-height: 1;
          top: -0.15em;
          left: -0.7em;
        }
      `
      container.appendChild(styleSheet)
      document.body.appendChild(container)

      const opt = {
        margin: [10, 10],
        filename: 'email-template.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' as const 
        }
      }

      try {
        await html2pdf().set(opt).from(container).save()
      } finally {
        // Clean up
        container.remove()
      }
    } catch (err) {
      console.error('Error exporting PDF:', err)
      setError(err instanceof Error ? err.message : 'Failed to export PDF')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isExporting}
      className={`${buttonBaseStyles} group ${
        error 
          ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 shadow-sm rounded-md'
          : isExporting
          ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-sm rounded-md'
          : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 shadow-sm rounded-md hover:text-gray-900'
      }`}
      title={error || "Export to PDF"}
    >
      <FileDown className="absolute left-4 h-5 w-5 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 text-gray-600" />
      <span className="transform transition-all duration-300 group-hover:translate-x-2">
        {isExporting ? 'Exporting...' : 'Export PDF'}
      </span>
    </button>
  )
} 