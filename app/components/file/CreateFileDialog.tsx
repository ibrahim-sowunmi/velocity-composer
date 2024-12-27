'use client'

import { useState } from 'react'
import { createFile } from '@/app/actions/file'

interface CreateFileDialogProps {
  folderId?: string
}

export function CreateFileDialog({ folderId }: CreateFileDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    formData.append('folderId', folderId || '')
    const result = await createFile(formData)
    
    if (result.success) {
      setOpen(false)
      setName('')
      setError(null)
    } else {
      setError(result.error || 'Something went wrong')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        New File
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New File</h2>
            <form action={handleSubmit}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter file name"
              />
              {error && (
                <p className="text-sm text-red-500 mb-4">{error}</p>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setError(null)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
} 