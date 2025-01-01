'use client'

import { useState, useEffect, useRef } from 'react'
import { FileItem } from "@/app/components/file/FileItem"
import { FolderItem } from "@/app/components/folder/FolderItem"
import { CreateFileDialog } from "@/app/components/file/CreateFileDialog"
import { CreateFolderDialog } from "@/app/components/folder/CreateFolderDialog"
import { deleteFile, renameFile, createFile, moveFile } from "@/app/actions/file"
import { deleteFolder, renameFolder, createFolder, moveFolder } from "@/app/actions/folder"
import Link from "next/link"
import { ChevronRightIcon, UndoIcon } from "lucide-react"
import { SortHeader, type SortField, type SortDirection } from "@/app/components/library/SortHeader"
import { monitorForElements, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import invariant from 'tiny-invariant'
import { useRouter } from 'next/navigation'

interface FolderWithParent {
  id: string
  name: string
  parent: {
    id: string
    name: string
  } | null
  createdAt: Date
  updatedAt: Date
  parentId: string | null
  userId: string
}

type ViewType = 'library' | 'folder'

interface ContentViewProps {
  viewType: ViewType
  initialFiles: any[]
  initialFolders: any[]
  userName?: string
  folder?: FolderWithParent
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

export function ContentView({ 
  viewType,
  initialFiles, 
  initialFolders,
  userName,
  folder
}: ContentViewProps) {
  const router = useRouter()
  const [sortField, setSortField] = useState<SortField>('updatedAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [files, setFiles] = useState(initialFiles)
  const [folders, setFolders] = useState(initialFolders)
  const [isDragging, setIsDragging] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    // Only set up drop target in folder view
    if (viewType === 'library' || !headerRef.current) return

    const element = headerRef.current
    invariant(element)

    return combine(
      monitorForElements({
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          if (!isDragData(source.data)) return false
          return true
        },
        onDragEnter: () => {
          element.classList.add('bg-stripe-primary/10')
        },
        onDragLeave: () => {
          element.classList.remove('bg-stripe-primary/10')
        },
        onDrop: async ({ source }) => {
          element.classList.remove('bg-stripe-primary/10')
          
          if (!isDragData(source.data) || isMoving) return

          try {
            setIsMoving(true)
            setError(null)
            
            let result
            if (source.data.type === 'file') {
              result = await moveFile(source.data.id, null)
            } else {
              result = await moveFolder(source.data.id, null)
            }

            if (result.success) {
              // Only update state if the move was successful
              if (source.data.type === 'file') {
                setFiles(prevFiles => prevFiles.filter(file => file.id !== source.data.id))
              } else {
                setFolders(prevFolders => prevFolders.filter(folder => folder.id !== source.data.id))
              }
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
  }, [viewType, router, isMoving])

  const sortItems = <T extends { name: string, createdAt: Date, updatedAt: Date }>(items: T[]) => {
    return [...items].sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      const aDate = new Date(a[sortField])
      const bDate = new Date(b[sortField])
      return sortDirection === 'asc' 
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime()
    })
  }

  const handleSort = (field: SortField) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(newDirection)
    setFolders(prevFolders => sortItems(prevFolders))
    setFiles(prevFiles => sortItems(prevFiles))
  }

  const handleCreateFile = async (formData: FormData) => {
    const result = await createFile(formData)
    if (result.success && result.file) {
      setFiles(prevFiles => sortItems([...prevFiles, result.file]))
    }
    return result
  }

  const handleCreateFolder = async (formData: FormData) => {
    const result = await createFolder(formData)
    if (result.success && result.folder) {
      setFolders(prevFolders => sortItems([...prevFolders, result.folder]))
    }
    return result
  }

  const handleDeleteFile = async (id: string) => {
    const result = await deleteFile(id)
    if (result.success) {
      setFiles(prevFiles => prevFiles.filter(file => file.id !== id))
    }
    return result
  }

  const handleDeleteFolder = async (id: string) => {
    const result = await deleteFolder(id)
    if (result.success) {
      setFolders(prevFolders => prevFolders.filter(folder => folder.id !== id))
    }
    return result
  }

  const handleRenameFile = async (id: string, newName: string) => {
    const result = await renameFile(id, newName)
    if (result.success) {
      setFiles(prevFiles => {
        const updatedFiles = prevFiles.map(file => 
          file.id === id ? { ...file, name: newName } : file
        )
        return sortItems(updatedFiles)
      })
    }
    return result
  }

  const handleRenameFolder = async (id: string, newName: string) => {
    const result = await renameFolder(id, newName)
    if (result.success) {
      setFolders(prevFolders => {
        const updatedFolders = prevFolders.map(folder => 
          folder.id === id ? { ...folder, name: newName } : folder
        )
        return sortItems(updatedFolders)
      })
    }
    return result
  }

  const handleCopyUpdate = (newFiles: any[]) => {
    setFiles(sortItems(newFiles))
  }

  const handleItemMove = (itemId: string, itemType: 'file' | 'folder') => {
    if (itemType === 'file') {
      setFiles(prevFiles => prevFiles.filter(file => file.id !== itemId))
    } else {
      setFolders(prevFolders => prevFolders.filter(folder => folder.id !== itemId))
    }
  }

  const renderHeader = () => {
    if (viewType === 'library') {
      return (
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium text-stripe-text">
            {(userName?.split(' ')[0] || 'My').charAt(0).toUpperCase() + (userName?.split(' ')[0] || 'My').slice(1)}&apos;s Library
          </h1>
          <div className="flex items-center gap-3">
            <CreateFileDialog onSubmit={handleCreateFile} />
            <CreateFolderDialog onSubmit={handleCreateFolder} />
          </div>
        </div>
      )
    }

    if (!folder) return null

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            ref={headerRef}
            className={`inline-flex items-center gap-2 text-sm py-1 px-2 rounded-lg transition-all duration-300 ease-in-out transform ${
              isDragging && !isMoving ? 'bg-stripe-primary/5 scale-105' : 'scale-100'
            }`}
          >
            {isDragging ? (
              <UndoIcon className="h-8 w-8 text-stripe-primary animate-in fade-in duration-300 slide-in-from-left-2" />
            ) : null}
            <div className="flex items-center gap-2">
              <Link href="/library" className="text-stripe-muted hover:text-stripe-primary">
                Library
              </Link>
              {folder.parent && (
                <>
                  <ChevronRightIcon className="h-4 w-4 text-stripe-muted" />
                  <Link
                    href={`/folder/${folder.parent.id}`}
                    className="text-stripe-muted hover:text-stripe-primary"
                  >
                    {folder.parent.name}
                  </Link>
                </>
              )}
              <ChevronRightIcon className="h-4 w-4 text-stripe-muted" />
              <span className="text-stripe-text font-medium">{folder.name}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CreateFileDialog folderId={folder.id} onSubmit={handleCreateFile} />
          <CreateFolderDialog parentId={folder.id} onSubmit={handleCreateFolder} />
        </div>
      </div>
    )
  }

  const emptyStateMessage = viewType === 'library' 
    ? "No emails yet. Create a new email to get started."
    : "This folder is empty. Create a new email to get started."

  return (
    <div className="space-y-8">
      {renderHeader()}
      {error && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 px-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-stripe-border bg-white shadow-stripe">
        {folders.length === 0 && files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-stripe-muted text-center mb-4">
              {emptyStateMessage}
            </p>
            <div className="flex gap-3">
              <CreateFileDialog 
                folderId={folder?.id} 
                onSubmit={handleCreateFile} 
              />
              <CreateFolderDialog 
                parentId={folder?.id} 
                onSubmit={handleCreateFolder} 
              />
            </div>
          </div>
        ) : (
          <>
            <SortHeader
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <div className="divide-y divide-stripe-border">
              {folders.map((subfolder) => (
                <FolderItem
                  key={subfolder.id}
                  folder={subfolder}
                  onDelete={handleDeleteFolder}
                  onRename={handleRenameFolder}
                  onItemMove={handleItemMove}
                />
              ))}
              {files.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  onDelete={handleDeleteFile}
                  onRename={handleRenameFile}
                  onCopy={handleCopyUpdate}
                  onItemMove={handleItemMove}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 