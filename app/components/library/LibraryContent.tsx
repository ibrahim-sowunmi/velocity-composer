'use client'

import { useState } from 'react'
import { FileItem } from "@/app/components/file/FileItem"
import { FolderItem } from "@/app/components/folder/FolderItem"
import { CreateFileDialog } from "@/app/components/file/CreateFileDialog"
import { CreateFolderDialog } from "@/app/components/folder/CreateFolderDialog"
import { deleteFile, renameFile, createFile } from "@/app/actions/file"
import { deleteFolder, renameFolder, createFolder } from "@/app/actions/folder"
import { SortHeader, type SortField, type SortDirection } from "@/app/components/library/SortHeader"

export function LibraryContent({ 
  initialFiles, 
  initialFolders, 
  userName 
}: { 
  initialFiles: any[], 
  initialFolders: any[],
  userName: string
}) {
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [files, setFiles] = useState(initialFiles)
  const [folders, setFolders] = useState(initialFolders)

  const handleSort = (field: SortField) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(newDirection)

    const sortItems = <T extends { name: string, createdAt: Date, updatedAt: Date }>(items: T[]) => {
      return [...items].sort((a, b) => {
        if (field === 'name') {
          return newDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        }
        const aDate = new Date(a[field])
        const bDate = new Date(b[field])
        return newDirection === 'asc' 
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime()
      })
    }

    setFolders(sortItems(folders))
    setFiles(sortItems(files))
  }

  const handleCreateFile = async (formData: FormData) => {
    const result = await createFile(formData)
    if (result.success && result.file) {
      setFiles(prevFiles => [...prevFiles, result.file])
    }
    return result
  }

  const handleCreateFolder = async (formData: FormData) => {
    const result = await createFolder(formData)
    if (result.success && result.folder) {
      setFolders(prevFolders => [...prevFolders, result.folder])
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
      setFiles(prevFiles => prevFiles.map(file => 
        file.id === id ? { ...file, name: newName } : file
      ))
    }
    return result
  }

  const handleRenameFolder = async (id: string, newName: string) => {
    const result = await renameFolder(id, newName)
    if (result.success) {
      setFolders(prevFolders => prevFolders.map(folder => 
        folder.id === id ? { ...folder, name: newName } : folder
      ))
    }
    return result
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-stripe-text">
          {(userName?.split(' ')[0] || 'My').charAt(0).toUpperCase() + (userName?.split(' ')[0] || 'My').slice(1)}'s Library
        </h1>
        <div className="flex items-center gap-3">
          <CreateFileDialog onSubmit={handleCreateFile} />
          <CreateFolderDialog onSubmit={handleCreateFolder} />
        </div>
      </div>

      <div className="rounded-lg border border-stripe-border bg-white shadow-stripe">
        {folders.length === 0 && files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-stripe-muted text-center mb-4">
              No items yet. Create a new file or folder to get started.
            </p>
            <div className="flex gap-3">
              <CreateFileDialog onSubmit={handleCreateFile} />
              <CreateFolderDialog onSubmit={handleCreateFolder} />
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
              {/* Show folders first */}
              {folders.map((folder) => (
                <FolderItem
                  key={folder.id}
                  folder={folder}
                  onDelete={handleDeleteFolder}
                  onRename={handleRenameFolder}
                />
              ))}
              {/* Then show files */}
              {files.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  onDelete={handleDeleteFile}
                  onRename={handleRenameFile}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 