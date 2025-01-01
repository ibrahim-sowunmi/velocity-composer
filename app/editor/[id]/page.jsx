'use client'

import { Puck, usePuck } from "@measured/puck"
import "@measured/puck/puck.css"
import { useEffect, useState } from "react"
import { use } from "react"
import { getFileData, saveFileData } from "@/app/actions/file"
import { puckConfig } from "@/app/config/puck"
import Link from "next/link"
import { Loader } from "lucide-react"

// Navigation Buttons Component
const NavigationButtons = ({ file }) => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={file.folderId ? `/folder/${file.folderId}` : '/library'}
        className="group flex items-center text-sm font-medium text-gray-600 hover:text-stripe-primary transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:-translate-x-2 group-hover:text-stripe-primary"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Library
      </Link>
      <Link
        href={`/view/${file.id}`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-stripe-primary text-white text-sm font-medium rounded-md hover:bg-stripe-primary-dark shadow-stripe-sm hover:shadow-stripe transition-all"
      >
        View Page
      </Link>
    </div>
  )
}

// Custom Publish Button Component
const CustomPublishButton = ({ fileId, onPublish }) => {
  const { appState } = usePuck()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await new Promise(resolve => setTimeout(resolve, 1000))

      const result = await saveFileData(fileId, appState.data)
      if (!result.success) {
        throw new Error(result.error || 'Failed to save')
      }
      // Show success state
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 1000)
      onPublish()

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
        inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md
        shadow-stripe-sm transition-all duration-500
        min-w-[100px] h-[36px] w-[100px]
        ${isSuccess 
          ? 'bg-green-600 text-white hover:bg-green-700' 
          : 'bg-stripe-primary text-white hover:bg-stripe-primary-dark'
        } 
        hover:shadow-stripe
        disabled:opacity-70 disabled:cursor-not-allowed 
        disabled:hover:shadow-stripe-sm
      `}
    >
      {isSaving ? <Loader className="animate-spin h-4 w-4"/> :  'Publish'}
    </button>
  )
}

// Status Indicator Component
const PublishStatus = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="flex items-center gap-3 py-2.5 px-3.5 bg-white rounded-md shadow-stripe hover:shadow-stripe-lg transition-all">
        <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
        <span className="text-sm font-medium text-gray-600">Changes published</span>
        <span className="text-xs text-stripe-muted">•</span>
        <span className="text-xs text-stripe-muted">Just now</span>
      </div>
    </div>
  );
};

// Editor Component
function Editor({ fileId }) {
  const [fileData, setFileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showStatus, setShowStatus] = useState(false)

  const handlePublish = () => {
    setShowStatus(true)
    setTimeout(() => setShowStatus(false), 3000)
  }

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

        if (!result.file.canEdit) {
          throw new Error('You do not have permission to edit this file')
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
        <Link
          href="/library"
          className="text-stripe-primary hover:text-stripe-primary-dark transition-colors"
        >
          Return to Library
        </Link>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <Puck 
        config={puckConfig} 
        data={fileData.puckData}
        headerTitle={fileData.name}
        overrides={{
          headerActions: () => (
            <div className="flex items-center gap-4">
              <NavigationButtons file={fileData} />
              <CustomPublishButton fileId={fileId} onPublish={handlePublish} />
            </div>
          )
        }}
      />
      <PublishStatus show={showStatus} />
    </div>
  )
}

// Page Component
export default function EditorPage({ params }) {
  const unwrappedParams = use(params)
  return <Editor fileId={unwrappedParams.id} />
} 