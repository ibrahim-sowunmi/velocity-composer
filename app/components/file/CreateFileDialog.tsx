'use client'

import { useState } from 'react'
import { createFile } from '@/app/actions/file'
import { PlusIcon } from 'lucide-react'

interface CreateFileDialogProps {
  folderId?: string
  onSubmit?: (formData: FormData) => Promise<{ success: boolean; error?: string; file?: any }>
}

export function CreateFileDialog({ folderId, onSubmit }: CreateFileDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    formData.append('folderId', folderId || '')
    const result = onSubmit ? await onSubmit(formData) : await createFile(formData)
    
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
        className="inline-flex items-center gap-2 px-4 py-2 bg-stripe-primary text-white text-sm font-medium rounded-md hover:bg-stripe-primary-dark shadow-stripe-sm hover:shadow-stripe transition-all"
      >
        <PlusIcon className="h-4 w-4" />
        New Email
      </button>

      {open && (
        <div className="fixed inset-0 bg-stripe-text/10 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg w-[28rem] shadow-stripe relative">
            <h2 className="text-xl font-semibold text-stripe-text mb-4">Create New Email</h2>
            <form action={handleSubmit}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stripe-border rounded shadow-stripe-sm focus:border-stripe-primary focus:ring-1 focus:ring-stripe-primary outline-none"
                placeholder="Enter e-mail topics"
              />
              {error && (
                <p className="text-sm text-stripe-danger mt-2">{error}</p>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setError(null)
                  }}
                  className="px-4 py-2 text-sm text-stripe-muted hover:text-stripe-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stripe-primary text-white text-sm font-medium rounded-md hover:bg-stripe-primary-dark shadow-stripe-sm hover:shadow-stripe transition-all"
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