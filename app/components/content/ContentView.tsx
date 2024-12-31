'use client'

import { useState } from 'react'
import { FileItem } from "@/app/components/file/FileItem"
import { FolderItem } from "@/app/components/folder/FolderItem"
import { CreateFileDialog } from "@/app/components/file/CreateFileDialog"
import { CreateFolderDialog } from "@/app/components/folder/CreateFolderDialog"
import { deleteFile, renameFile, createFile } from "@/app/actions/file"
import { deleteFolder, renameFolder, createFolder } from "@/app/actions/folder"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"
import { SortHeader, type SortField, type SortDirection } from "@/app/components/library/SortHeader"

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

export function ContentView({ 
  viewType,
  initialFiles, 
  initialFolders,
  userName,
  folder
}: ContentViewProps) {
  const [sortField, setSortField] = useState<SortField>('updatedAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [files, setFiles] = useState(initialFiles)
  const [folders, setFolders] = useState(initialFolders)

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
        <div className="flex items-center gap-2 text-sm">
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
        <div className="flex items-center gap-3">
          <CreateFileDialog folderId={folder.id} onSubmit={handleCreateFile} />
          <CreateFolderDialog parentId={folder.id} onSubmit={handleCreateFolder} />
        </div>
      </div>
    )
  }

  const emptyStateMessage = viewType === 'library' 
    ? "No items yet. Create a new file or folder to get started."
    : "This folder is empty. Create a new file or folder to get started."

  return (
    <div className="space-y-8">
      {renderHeader()}

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
                />
              ))}
              {files.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  onDelete={handleDeleteFile}
                  onRename={handleRenameFile}
                  onCopy={handleCopyUpdate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 