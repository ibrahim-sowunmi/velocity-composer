'use client'

import { useParams } from 'next/navigation'
import { BackToLibraryButton } from './BackToLibraryButton'
import { EditContentButton } from './EditContentButton'
import { CopyContentButton } from './CopyContentButton'
import { ForkContentButton } from './ForkContentButton'

interface ViewButtonMenuProps {
  getContent: () => string | Promise<string>
  canEdit?: boolean
}

export function ViewButtonMenu({ getContent, canEdit }: ViewButtonMenuProps) {
  const params = useParams()
  const fileId = params?.id as string

  const buttonBaseStyles = "p-3 rounded-lg transition-all duration-300 z-50 flex items-center gap-2 text-sm font-medium w-[180px] justify-center relative"

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3">
      <BackToLibraryButton buttonBaseStyles={buttonBaseStyles} />
      {canEdit && <EditContentButton buttonBaseStyles={buttonBaseStyles} fileId={fileId} />}
      {!canEdit && <ForkContentButton buttonBaseStyles={buttonBaseStyles} fileId={fileId} />}
      <CopyContentButton buttonBaseStyles={buttonBaseStyles} getContent={getContent} />
    </div>
  )
}