'use client'

import { Puck, usePuck } from "@measured/puck"
import "@measured/puck/puck.css"
import { useEffect, useState } from "react"
import { use } from "react"
import { getFileData, saveFileData } from "@/app/actions/file"
import { puckConfig } from "@/app/config/puck"
import Link from "next/link"

// Navigation Buttons Component
const NavigationButtons = ({ file }) => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={file.folderId ? `/folder/${file.folderId}` : '/library'}
        className="group flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
        >
          <path 
            fillRule="evenodd" 
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" 
            clipRule="evenodd" 
          />
        </svg>
        Back to Library
      </Link>
      <Link
        href={`/view/${file.id}`}
        className="px-3 py-1.5 text-sm font-medium text-white bg-[#635bff] rounded-full hover:bg-[#5851db] transition-all duration-200 shadow-sm hover:shadow-md hover:translate-y-[-1px] active:translate-y-0"
      >
        View Page
      </Link>
    </div>
  )
}

// Custom Publish Button Component
const CustomPublishButton = ({ fileId }) => {
  const { appState } = usePuck()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const result = await saveFileData(fileId, appState.data)
      if (!result.success) {
        throw new Error(result.error || 'Failed to save')
      }
      // Show success state
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 1000)
    } catch (err) {
      console.error('Save error:', err)
      alert('Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={isSaving}
      className={`
        px-3 py-1.5 text-sm font-medium rounded-full
        transition-all duration-200 shadow-sm
        ${isSuccess 
          ? 'bg-[#0BAB5c] text-white hover:bg-[#0a9b52]' 
          : 'bg-[#635bff] text-white hover:bg-[#5851db]'
        } 
        hover:shadow-md hover:translate-y-[-1px]
        active:translate-y-0
        disabled:opacity-70 disabled:cursor-not-allowed 
        disabled:hover:translate-y-0 disabled:hover:shadow-sm
      `}
    >
      {isSaving ? 'Saving...' : isSuccess ? 'Saved!' : 'Publish'}
    </button>
  )
}

// Editor Component
function Editor({ fileId }) {
  const [fileData, setFileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await getFileData(fileId)
        
        if (!mounted) return
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to load file')
        }
        
        // Ensure we have valid Puck data structure
        const puckData = result.file.puckData || { content: [], root: {} }
        if (!puckData.content || !puckData.root) {
          puckData.content = []
          puckData.root = {}
        }
        
        if (mounted) {
          setFileData({
            ...result.file,
            puckData
          })
        }
      } catch (err) {
        console.error('Load error:', err)
        if (mounted) {
          setError(err.message || 'Failed to load file')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }
    
    loadData()
    
    return () => {
      mounted = false
    }
  }, [fileId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-stripe-muted">Loading editor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-stripe-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <Puck 
        config={puckConfig} 
        data={fileData.puckData}
        overrides={{
          headerTitle: fileData.name,
          headerActions: () => (
            <div className="flex items-center gap-4">
              <NavigationButtons file={fileData} />
              <CustomPublishButton fileId={fileId} />
            </div>
          )
        }}
      />
    </div>
  )
}

// Page Component
export default function EditorPage({ params }) {
  const unwrappedParams = use(params)
  return <Editor fileId={unwrappedParams.id} />
} 