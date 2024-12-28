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
    const isDate = field === 'createdAt' || field === 'updatedAt'
    return (
      <button
        onClick={() => onSort(field)}
        className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'text-stripe-primary'
            : 'text-stripe-muted hover:text-stripe-text'
        } ${isDate ? 'justify-end' : ''}`}
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
    <div className="grid grid-cols-[minmax(300px,1fr)_minmax(200px,300px)_minmax(200px,300px)_120px] gap-4 items-center px-6 py-2 bg-white border-b border-stripe-border">
      <SortButton field="name" label="Name" />
      <SortButton field="createdAt" label="Created" />
      <SortButton field="updatedAt" label="Modified" />
      <div /> {/* Space for actions */}
    </div>
  )
} 