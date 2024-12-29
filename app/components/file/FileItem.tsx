'use client'

import { useState } from 'react'
import { File } from '@prisma/client'
import { FileIcon, PencilIcon, Trash2Icon, PenToolIcon, EyeIcon, EyeOffIcon, EyeClosedIcon } from 'lucide-react'
import Link from 'next/link'
import { puckConfig } from '@/app/config/puck'
import { toggleFileVisibility } from '@/app/actions/file'

interface FileItemProps {
  file: File & {
    productList: string[]
  }
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  onRename: (id: string, newName: string) => Promise<{ success: boolean; error?: string }>
}

export function FileItem({ file, onDelete, onRename }: FileItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(file.name)
  const [error, setError] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState(file.isPublic)
  const [isToggling, setIsToggling] = useState(false)

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

  const getCategoryTitle = (categoryKey: string) => {
    return (puckConfig.categories[categoryKey as keyof typeof puckConfig.categories]?.title || categoryKey)
      .replace(/\s*\([^)]*\)/g, '') // Remove anything in parentheses
      .split(' ')[0] // Take only the first word
  }

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
    <div className="group relative hover:bg-stripe-light transition-colors duration-200">
      <div className="grid grid-cols-[minmax(400px,2fr)_200px_200px_180px] gap-6 items-center px-6 py-4">
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
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-stripe-border-light group-hover:bg-stripe-primary/10 transition-colors">
                <FileIcon className="h-4 w-4 text-stripe-muted group-hover:text-stripe-primary transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span 
                    className="text-[15px] text-stripe-text font-medium truncate group-hover:text-stripe-primary transition-colors"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                </div>
                <div className="h-6 mt-1 flex gap-1.5 items-center overflow-hidden">
                  {file.productList.slice(0, 4).map((product) => (
                    <span
                      key={product}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-stripe-border-light text-stripe-muted whitespace-nowrap"
                    >
                      {getCategoryTitle(product)}
                    </span>
                  ))}
                  {file.productList.length > 4 && (
                    <span
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-stripe-border-light text-stripe-muted whitespace-nowrap"
                      title={file.productList.slice(4).map(product => getCategoryTitle(product)).join(', ')}
                    >
                      +{file.productList.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <span className="text-sm text-stripe-muted whitespace-nowrap">
              {formatDate(file.createdAt)}
            </span>
            <span className="text-sm text-stripe-muted whitespace-nowrap">
              {formatDate(file.updatedAt)}
            </span>
            <div className="flex items-center gap-2 justify-end">
              <Link
                href={`/editor/${file.id}`}
                className="p-2 text-stripe-primary hover:text-stripe-primary-dark rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
              >
                <PenToolIcon className="h-4 w-4" />
              </Link>
              <button
                onClick={async () => {
                  if (isToggling) return;
                  setIsToggling(true);
                  const result = await toggleFileVisibility(file.id);
                  if (result.success && typeof result.isPublic === 'boolean') {
                    setIsPublic(result.isPublic);
                  } else {
                    setError(result.error || 'Failed to toggle visibility');
                  }
                  setIsToggling(false);
                }}
                className="p-2 text-stripe-muted hover:text-stripe-text rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
                disabled={isToggling}
              >
                <div className="relative w-4 h-4">
                  <div className={`absolute inset-0 transform transition-all duration-300 ${isPublic ? 'opacity-100 scale-100' : 'opacity-0 scale-y-0'}`}>
                    <EyeIcon className="h-4 w-4" />
                  </div>
                  <div className={`absolute inset-0 transform transition-all duration-300 ${!isPublic ? 'opacity-100 scale-100' : 'opacity-0 scale-y-0'}`}>
                    <EyeClosedIcon className="h-4 w-4" />
                  </div>
                </div>
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
          </>
        )}
      </div>
    </div>
  )
} 