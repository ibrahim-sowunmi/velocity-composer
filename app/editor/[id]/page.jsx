'use client'

import { Puck } from "@measured/puck"
import "@measured/puck/puck.css"
import { useEffect, useState } from "react"
import { getFileData, saveFileData } from "@/app/actions/file"

// Create Puck component config
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>
      },
    },
  },
}

export default function EditorPage({ params }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getFileData(params.id)
        if (!result.success) {
          setError(result.error || 'Failed to load file')
          setLoading(false)
          return
        }
        setData(result.puckData || { content: [], root: {} })
        setLoading(false)
      } catch (err) {
        setError('Failed to load file')
        setLoading(false)
      }
    }
    loadData()
  }, [params.id])

  const handlePublish = async (newData) => {
    try {
      setSaving(true)
      const result = await saveFileData(params.id, newData)
      if (!result.success) {
        throw new Error(result.error || 'Failed to save')
      }
      // Update local data after successful save
      setData(newData)
    } catch (err) {
      console.error('Save error:', err)
      alert('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-stripe-muted">Loading editor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-stripe-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <Puck 
        config={config} 
        data={data}
        onPublish={handlePublish}
      />
    </div>
  )
} 