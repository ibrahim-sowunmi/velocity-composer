'use client'

import { useState, useRef, useEffect } from 'react'
import { Folder } from '@prisma/client'
import { FolderIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { dropTargetForElements, draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import invariant from 'tiny-invariant'
import { moveFile } from '@/app/actions/file'
import { moveFolder } from '@/app/actions/folder'

interface FolderItemProps {
  folder: Folder
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  onRename: (id: string, newName: string) => Promise<{ success: boolean; error?: string }>
  onItemMove?: (itemId: string, itemType: 'file' | 'folder') => void
}

interface DragData {
  id: string
  type: 'file' | 'folder'
}

function isDragData(data: unknown): data is DragData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'type' in data &&
    typeof (data as any).id === 'string' &&
    ((data as any).type === 'file' || (data as any).type === 'folder')
  )
}

export function FolderItem({ folder, onDelete, onRename, onItemMove }: FolderItemProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(folder.name)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDropTarget, setIsDropTarget] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    invariant(element)

    return combine(
      draggable({
        element,
        getInitialData: () => ({ id: folder.id, type: 'folder' }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          if (!isDragData(source.data)) return false
          // Prevent dropping on itself
          if (source.data.type === 'folder' && source.data.id === folder.id) return false
          return true
        },
        onDragEnter: () => {
          setIsDropTarget(true)
          element.classList.add('bg-stripe-primary')
        },
        onDragLeave: () => {
          setIsDropTarget(false)
          element.classList.remove('bg-stripe-primary')
        },
        onDrop: async ({ source }) => {
          setIsDropTarget(false)
          element.classList.remove('bg-stripe-primary')
          
          if (!isDragData(source.data) || isMoving) return

          try {
            setIsMoving(true)
            setError(null)
            
            let result
            if (source.data.type === 'file') {
              result = await moveFile(source.data.id, folder.id)
            } else {
              result = await moveFolder(source.data.id, folder.id)
            }

            if (result.success) {
              // Only notify about the move if it was successful
              onItemMove?.(source.data.id, source.data.type)
            } else {
              setError(result.error || `Failed to move ${source.data.type}`)
            }
            router.refresh()
          } catch (err) {
            setError(`Failed to move ${source.data.type}`)
            console.error(`Error moving ${source.data.type}:`, err)
          } finally {
            setIsMoving(false)
          }
        },
      })
    )
  }, [folder.id, router, isMoving, onItemMove])

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
      ref={ref}
      className={`group relative transition-colors duration-200 cursor-pointer border border-transparent ${
        isDragging ? 'opacity-50' : ''
      } ${
        isDropTarget ? 'bg-stripe-primary' : 'hover:bg-stripe-light'
      }`}
      onClick={handleClick}
    >
      <div className="grid grid-cols-[minmax(400px,2fr)_200px_200px_180px] gap-6 items-center px-6 py-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-stripe-border-light group-hover:bg-stripe-primary/10 transition-colors">
            <FolderIcon className="h-4 w-4 text-stripe-muted group-hover:text-stripe-primary transition-colors" />
          </div>
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                <div className="relative w-full">
                  <div className="invisible h-[22px]" aria-hidden="true">
                    {newName}
                  </div>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleRename}
                    onKeyDown={handleKeyDown}
                    className="absolute inset-0 w-full text-[15px] text-stripe-text font-medium border-0 focus:ring-0 focus:outline-none bg-white"
                    autoFocus
                  />
                  <div className="absolute -inset-1.5 border border-stripe-primary rounded-lg shadow-stripe-sm pointer-events-none ring-1 ring-stripe-primary" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span 
                  className="text-[15px] text-stripe-text truncate font-medium group-hover:text-stripe-primary transition-colors"
                  title={folder.name}
                >
                  {folder.name}
                </span>
              </div>
            )}
            {error && (
              <div className="h-6 mt-1">
                <span className="text-xs text-stripe-danger">{error}</span>
              </div>
            )}
          </div>
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
              Are you sure you want to delete &quot;{folder.name}&quot;? Any emails inside will be <span className="font-medium">permanently deleted</span>.
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