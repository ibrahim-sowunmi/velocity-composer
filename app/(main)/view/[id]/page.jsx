import { getFileData } from "@/app/actions/file"
import ViewPageClient from "./ViewPageClient"

export default async function ViewPage({ params }) {
  const { id } = await params
  const result = await getFileData(id)
  
  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-stripe-danger">{result.error}</div>
      </div>
    )
  }

  return (
    <ViewPageClient 
      initialData={result.file.puckData}
      fileData={result.file}
      currentUserId={result.currentUserId}
      currentUserEmail={result.currentUserEmail}
    />
  )
}