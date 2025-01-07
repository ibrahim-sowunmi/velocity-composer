'use client'

import { useState } from 'react'
import { FileDown } from 'lucide-react'

interface ExportPDFButtonProps {
  buttonBaseStyles: string
  getContent: () => string | Promise<string>
}

export default function ExportPDFButton({ buttonBaseStyles, getContent }: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      setError(null)
      
      // Get the content
      const content = await Promise.resolve(getContent())
      if (!content) {
        throw new Error('No content to export')
      }

      // Create a temporary container with the content
      const container = document.createElement('div')
      container.innerHTML = content
      container.style.padding = '20px'
      
      // Add custom styles for better PDF formatting
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
          color: #4a5568;
        }
        pre, code {
          background-color: #f7f7f7;
          border-radius: 4px;
          padding: 0.2em 0.4em;
          font-family: 'Courier New', Courier, monospace;
        }
        pre {
          padding: 1em;
          overflow-x: auto;
          margin: 1em 0;
        }
        pre code {
          padding: 0;
          background: none;
        }
        blockquote {
          margin: 1em 0;
          padding-left: 1em;
          border-left: 4px solid #e2e8f0;
          color: #4a5568;
        }
        img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1em 0;
        }
        th, td {
          border: 1px solid #e2e8f0;
          padding: 0.5em;
          text-align: left;
        }
        th {
          background-color: #f7fafc;
        }
      `
      container.appendChild(styleSheet)
      document.body.appendChild(container)

      // Dynamically import html2pdf only on client side
      const html2pdf = (await import('html2pdf.js')).default

      const opt = {
        margin: [10, 10],
        filename: 'solution-template.pdf',
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
        // Clean up the temporary container
        container.remove()
      }
    } catch (err) {
      console.error('Failed to export PDF:', err)
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
      className={`${buttonBaseStyles} group relative flex items-center justify-center px-6 py-2 text-sm font-medium transition-all duration-300 ${
        error 
          ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
          : isExporting
          ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
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