'use client'

import Link from 'next/link'
import { PenTool } from 'lucide-react'

interface EditContentButtonProps {
  buttonBaseStyles: string
  fileId: string
}

export function EditContentButton({ buttonBaseStyles, fileId }: EditContentButtonProps) {
  return (
    <Link
      href={`/editor/${fileId}`}
      className={`${buttonBaseStyles} group bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300`}
    >
      <PenTool className="absolute left-4 h-5 w-5 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 text-gray-600" />
      <span className="transform transition-all duration-300 group-hover:translate-x-2">Edit Email</span>
    </Link>
  )
} 