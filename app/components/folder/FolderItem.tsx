'use client'

import { useState } from 'react'
import { Folder } from '@prisma/client'
import { FolderIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const formatDate = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on action buttons or if editing
    if (isEditing || (e.target as HTMLElement).closest('button')) {
      return
    }
    router.push(`/folder/${folder.id}`)
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

  const handleDelete = async (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const result = await onDelete(folder.id);
    if (!result.success) {
      setError(result.error || 'Failed to delete');
    }
    setShowDeleteConfirm(false);
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
    <div 
      className="group relative hover:bg-stripe-light transition-colors duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="grid grid-cols-[minmax(400px,2fr)_200px_200px_180px] gap-6 items-center px-6 py-4">
        {isEditing ? (
          <div onClick={e => e.stopPropagation()}>
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
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-stripe-border-light group-hover:bg-stripe-primary/10 transition-colors">
                <FolderIcon className="h-4 w-4 text-stripe-muted group-hover:text-stripe-primary transition-colors" />
              </div>
              <span 
                className="text-[15px] text-stripe-text truncate font-medium group-hover:text-stripe-primary transition-colors"
                title={folder.name}
              >
                {folder.name}
              </span>
            </div>
            <span className="text-sm text-stripe-muted whitespace-nowrap">
              {formatDate(folder.createdAt)}
            </span>
            <span className="text-sm text-stripe-muted whitespace-nowrap">
              {formatDate(folder.updatedAt)}
            </span>
            <div className="flex items-center gap-2 justify-end" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-stripe-muted hover:text-stripe-text rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-stripe-danger hover:text-stripe-danger-dark rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-stripe-text/10 flex items-center justify-center backdrop-blur-sm z-50"
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteConfirm(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowDeleteConfirm(false);
            }
          }}
        >
          <div 
            className="bg-white p-6 rounded-lg w-[28rem] shadow-stripe relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-stripe-text mb-4">Delete Folder</h2>
            <p className="text-sm text-stripe-muted mb-6">
              Are you sure you want to delete &quot;{folder.name}&quot;? Any files inside will be moved to the parent folder.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm text-stripe-muted hover:text-stripe-text transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleDelete(e);
                  }
                }}
                className="px-4 py-2 bg-stripe-danger text-white text-sm font-medium rounded-md hover:bg-stripe-danger-dark shadow-stripe-sm hover:shadow-stripe transition-all"
                autoFocus
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 