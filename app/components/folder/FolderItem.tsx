'use client'

import { useState } from 'react'
import { Folder } from '@prisma/client'
import { FolderIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface FolderItemProps {
  folder: Folder
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  onRename: (id: string, newName: string) => Promise<{ success: boolean; error?: string }>
}

export function FolderItem({ folder, onDelete, onRename }: FolderItemProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(folder.name)
  const [error, setError] = useState<string | null>(null)

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[d.getMonth()]
    const day = d.getDate()
    const year = d.getFullYear()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    const formattedMinute = minute.toString().padStart(2, '0')
    
    return `${month} ${day}, ${year}, ${formattedHour}:${formattedMinute} ${ampm}`
  }

  const handleClick = () => {
    if (!isEditing) {
      router.push(`/folder/${folder.id}`)
    }
  }

  const handleRename = async () => {
    if (newName !== folder.name) {
      const result = await onRename(folder.id, newName)
      if (!result.success) {
        setError(result.error || 'Failed to rename')
        return
      }
    }
    setIsEditing(false)
    setError(null)
  }

  const handleDelete = async () => {
    const result = await onDelete(folder.id)
    if (!result.success) {
      setError(result.error || 'Failed to delete')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename()
    } else if (e.key === 'Escape') {
      setNewName(folder.name)
      setIsEditing(false)
      setError(null)
    }
  }

  return (
    <div className="group relative hover:bg-stripe-light transition-colors duration-200">
      <div className="grid grid-cols-[minmax(300px,1fr)_minmax(200px,300px)_minmax(200px,300px)_120px] gap-4 items-center px-6 py-4">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1.5 text-sm border border-stripe-border rounded-lg shadow-stripe-sm focus:border-stripe-primary focus:ring-1 focus:ring-stripe-primary outline-none"
              autoFocus
            />
            {error && <span className="text-xs text-stripe-danger mt-1">{error}</span>}
          </div>
        ) : (
          <>
            <Link
              href={`/folder/${folder.id}`}
              className="flex items-center gap-4 min-w-0 group/link"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-stripe-border-light group-hover/link:bg-stripe-primary/10 transition-colors">
                <FolderIcon className="h-4 w-4 text-stripe-muted group-hover/link:text-stripe-primary transition-colors" />
              </div>
              <span className="text-[15px] text-stripe-text truncate font-medium group-hover/link:text-stripe-primary transition-colors">
                {folder.name}
              </span>
            </Link>
            <span className="text-sm text-stripe-muted text-right">
              {formatDate(folder.createdAt)}
            </span>
            <span className="text-sm text-stripe-muted text-right">
              {formatDate(folder.updatedAt)}
            </span>
            <div className="flex items-center gap-1 justify-end">
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
          </>
        )}
      </div>
    </div>
  )
} 