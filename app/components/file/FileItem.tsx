'use client'

import { useState } from 'react'
import { File } from '@prisma/client'
import { FileIcon, PencilIcon, Trash2Icon } from 'lucide-react'

interface FileItemProps {
  file: File
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  onRename: (id: string, newName: string) => Promise<{ success: boolean; error?: string }>
}

export function FileItem({ file, onDelete, onRename }: FileItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(file.name)
  const [error, setError] = useState<string | null>(null)

  const handleRename = async () => {
    if (newName !== file.name) {
      const result = await onRename(file.id, newName)
      if (!result.success) {
        setError(result.error || 'Failed to rename')
        return
      }
    }
    setIsEditing(false)
    setError(null)
  }

  const handleDelete = async () => {
    const result = await onDelete(file.id)
    if (!result.success) {
      setError(result.error || 'Failed to delete')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename()
    } else if (e.key === 'Escape') {
      setNewName(file.name)
      setIsEditing(false)
      setError(null)
    }
  }

  return (
    <div className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
      <div className="flex items-center gap-2">
        <FileIcon className="h-4 w-4 text-gray-500" />
        <div className="flex flex-col">
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              className="border rounded px-2 py-1 text-sm"
              autoFocus
            />
          ) : (
            <span className="text-sm">
              {file.name}
            </span>
          )}
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </div>
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-200"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
} 