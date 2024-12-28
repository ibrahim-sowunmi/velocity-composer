'use client'

import { Render } from "@measured/puck"
import { useEffect, useState } from "react"
import { getFileData } from "@/app/actions/file"
import { use } from "react"
import { puckConfig } from "@/app/config/puck"

export default function ViewPage({ params }) {
  const unwrappedParams = use(params)
  const [data, setData] = useState({ content: [], root: {} })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await getFileData(unwrappedParams.id)
        
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
  }, [unwrappedParams.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-stripe-muted">Loading view...</div>
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

  return <Render config={puckConfig} data={data} />
}