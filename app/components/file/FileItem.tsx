'use client'

import { useState } from 'react'
import { File } from '@prisma/client'
import { FileIcon, PencilIcon, Trash2Icon, PenToolIcon } from 'lucide-react'

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

  const handleCompose = () => {
    alert(`Composing: ${file.name}`)
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
    <div className="group relative flex items-center justify-between px-6 py-4 hover:bg-stripe-light transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-stripe-border-light">
          <FileIcon className="h-4 w-4 text-stripe-muted" />
        </div>
        <div className="flex flex-col min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              className="px-3 py-1.5 text-sm border border-stripe-border rounded-lg shadow-stripe-sm focus:border-stripe-primary focus:ring-1 focus:ring-stripe-primary outline-none"
              autoFocus
            />
          ) : (
            <span className="text-[15px] text-stripe-text truncate font-medium">
              {file.name}
            </span>
          )}
          {error && <span className="text-xs text-stripe-danger mt-1">{error}</span>}
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleCompose}
          className="p-2 text-stripe-primary hover:text-stripe-primary-dark rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
        >
          <PenToolIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-stripe-muted hover:text-stripe-text rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-stripe-danger hover:text-stripe-danger-dark rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
} 