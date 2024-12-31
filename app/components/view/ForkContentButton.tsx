'use client'

import { useRouter } from 'next/navigation'
import { forkFile } from '@/app/actions/file'
import { FaCodeFork } from 'react-icons/fa6'

interface ForkContentButtonProps {
  buttonBaseStyles: string
  fileId: string
}

export function ForkContentButton({ buttonBaseStyles, fileId }: ForkContentButtonProps) {
  const router = useRouter()

  const handleFork = async () => {
    try {
      const result = await forkFile(fileId)
      if (result.success) {
        router.push('/library')
      } else {
        console.error('Failed to fork:', result.error)
      }
    } catch (error) {
      console.error('Error forking content:', error)
    }
  }

  return (
    <button
      onClick={handleFork}
      className={`${buttonBaseStyles} bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 group`}
    >
      <FaCodeFork className="absolute left-4 h-4 w-4 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 text-gray-600" />
      <span className="transform transition-all duration-300 group-hover:translate-x-2">Fork Content</span>
    </button>
  )
} 