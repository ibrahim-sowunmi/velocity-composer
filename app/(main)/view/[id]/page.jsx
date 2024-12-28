'use client'

import { Render } from "@measured/puck"
import { useEffect, useState } from "react"
import { getFileData } from "@/app/actions/file"
import { use } from "react"
import { config } from "@/app/editor/[id]/config"

export default function ViewPage({ params }) {
  const unwrappedParams = use(params)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getFileData(unwrappedParams.id)
        if (!result.success) {
          setError(result.error || 'Failed to load file')
          setLoading(false)
          return
        }
        setData(result.puckData || {})
        setLoading(false)
      } catch (err) {
        setError('Failed to load file')
        setLoading(false)
      }
    }
    loadData()
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-stripe-danger">{error}</div>
      </div>
    )
  }

  return <Render config={config} data={data} />
}