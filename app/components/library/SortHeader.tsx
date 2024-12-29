import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

export type SortField = 'name' | 'createdAt' | 'updatedAt'
export type SortDirection = 'asc' | 'desc'

interface SortHeaderProps {
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
}

export function SortHeader({ sortField, sortDirection, onSort }: SortHeaderProps) {
  const SortButton = ({ field, label }: { field: SortField; label: string }) => {
    const isActive = sortField === field
    return (
      <button
        onClick={() => onSort(field)}
        className={`flex items-center gap-1 py-3 text-sm font-medium transition-colors ${
          isActive
            ? 'text-stripe-primary'
            : 'text-stripe-muted hover:text-stripe-text'
        }`}
      >
        {label}
        {isActive && (
          sortDirection === 'asc' ? (
            <ArrowUpIcon className="h-3 w-3" />
          ) : (
            <ArrowDownIcon className="h-3 w-3" />
          )
        )}
      </button>
    )
  }

  return (
    <div className="grid grid-cols-[minmax(400px,2fr)_200px_200px_180px] gap-6 items-center px-6 py-2 bg-white border-b border-stripe-border sticky top-0 z-10">
      <SortButton field="name" label="Name" />
      <SortButton field="createdAt" label="Created" />
      <SortButton field="updatedAt" label="Modified" />
      <div className="text-sm font-medium text-stripe-muted">Actions</div>
    </div>
  )
} 