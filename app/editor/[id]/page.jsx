'use client'

import { Puck, usePuck } from "@measured/puck"
import "@measured/puck/puck.css"
import { useEffect, useState } from "react"
import { use } from "react"
import { getFileData, saveFileData } from "@/app/actions/file"
import { puckConfig } from "@/app/config/puck"

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
      style={{
        backgroundSize: '200% 200%',
        animation: isSuccess ? 'none' : 'gradient 4s ease infinite',
      }}
      className={`
        relative px-6 py-2.5 text-sm font-medium rounded-full 
        transition-all duration-200 shadow-sm
        ${isSuccess 
          ? 'bg-[#0BAB5c] text-white' 
          : `bg-gradient-to-r from-[#635bff] via-[#8b5cf6] to-[#635bff] text-white
             hover:shadow-lg hover:translate-y-[-1px]`
        } 
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
        before:absolute before:inset-0 before:rounded-full
        before:bg-gradient-to-r before:from-[#635bff] before:via-[#8b5cf6] before:to-[#635bff]
        before:animate-[gradient_4s_ease_infinite]
        before:bg-[length:200%_200%] before:opacity-0 before:transition-opacity
        hover:before:opacity-100
        disabled:before:opacity-0
      `}
    >
      <span className="relative z-10">
        {isSaving ? 'Saving...' : isSuccess ? 'Saved!' : 'Publish'}
      </span>
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </button>
  )
}

// Editor Component
function Editor({ fileId }) {
  const [data, setData] = useState({ content: [], root: {} })
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
        const puckData = result.puckData || { content: [], root: {} }
        if (!puckData.content || !puckData.root) {
          puckData.content = []
          puckData.root = {}
        }
        
        if (mounted) {
          setData(puckData)
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
        data={data}
        overrides={{
          headerActions: () => <CustomPublishButton fileId={fileId} />
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