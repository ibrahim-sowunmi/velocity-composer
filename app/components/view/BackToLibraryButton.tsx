'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface BackToLibraryButtonProps {
  buttonBaseStyles: string
}

export function BackToLibraryButton({ buttonBaseStyles }: BackToLibraryButtonProps) {
  return (
    <Link
      href="/library"
      className={`${buttonBaseStyles} group bg-white hover:bg-gray-50 text-gray-700 border border-gray-200`}
    >
      <ChevronLeft className="absolute left-4 h-5 w-5 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 text-gray-600" />
      <span className="transform transition-all duration-300 group-hover:translate-x-2">Back to Library</span>
    </Link>
  )
} 