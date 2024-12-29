'use client'

import { useState, useEffect, useRef } from 'react'
import { File } from '@prisma/client'
import { SearchIcon, CopyIcon, EyeIcon, Loader2Icon } from 'lucide-react'
import { useDebounce } from 'use-debounce'
import { searchPublicFiles, forkFile } from '@/app/actions/file'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchResult extends Omit<File, 'user'> {
  creatorEmail: string
}

interface SearchResponse {
  success: boolean
  files?: SearchResult[]
  error?: string
}

interface ForkResponse {
  success: boolean
  file?: File
  error?: string
}

export function FileSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const formatDate = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  useEffect(() => {
    const searchFiles = async () => {
      if (!debouncedQuery.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const result = await searchPublicFiles(debouncedQuery) as SearchResponse
        if (result.success && result.files) {
          setResults(result.files)
        } else {
          setError(result.error || 'Failed to search files')
        }
      } catch (err) {
        setError('Failed to search files')
      } finally {
        setIsLoading(false)
      }
    }

    searchFiles()
  }, [debouncedQuery])

  const handleFork = async (fileId: string) => {
    try {
      const result = await forkFile(fileId) as ForkResponse
      if (result.success && result.file) {
        router.push(`/editor/${result.file.id}`)
      } else {
        setError(result.error || 'Failed to fork file')
      }
    } catch (err) {
      setError('Failed to fork file')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > -1 ? prev - 1 : prev)
    } else if (e.key === 'Enter' && selectedIndex > -1) {
      e.preventDefault()
      const selectedFile = results[selectedIndex]
      if (selectedFile) {
        router.push(`/view/${selectedFile.id}`)
      }
    }
  }

  useEffect(() => {
    if (selectedIndex > -1 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[selectedIndex]
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
        })
      }
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setResults([]);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stripe-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search public files..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-stripe-border rounded-lg shadow-stripe-sm focus:border-stripe-primary focus:ring-1 focus:ring-stripe-primary outline-none"
        />
        {isLoading && (
          <Loader2Icon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stripe-muted animate-spin" />
        )}
      </div>

      {(results.length > 0 || error) && query.trim() && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-stripe-border max-h-[400px] overflow-y-auto"
        >
          {error ? (
            <div className="p-4 text-sm text-stripe-danger">{error}</div>
          ) : (
            results.map((file, index) => (
              <div
                key={file.id}
                className={`p-4 hover:bg-stripe-light ${
                  index === selectedIndex ? 'bg-stripe-light' : ''
                } ${index !== results.length - 1 ? 'border-b border-stripe-border' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-stripe-text truncate">
                      {file.name}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-xs text-stripe-muted">
                      <span>{file.creatorEmail.split('@')[0]}</span>
                      <span>•</span>
                      <span>Created {formatDate(file.createdAt)}</span>
                      <span>•</span>
                      <span>Updated {formatDate(file.updatedAt)}</span>
                    </div>
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {file.productList.map((product) => (
                        <span
                          key={product}
                          className="px-2 py-0.5 text-xs font-medium rounded-full bg-stripe-border-light text-stripe-muted"
                        >
                          {product.toLocaleUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <button
                      onClick={() => handleFork(file.id)}
                      className="p-2 text-stripe-muted hover:text-stripe-text rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
                    >
                      <CopyIcon className="h-4 w-4" />
                    </button>
                    <Link
                      href={`/view/${file.id}`}
                      className="p-2 text-stripe-muted hover:text-stripe-text rounded-lg hover:bg-white hover:shadow-stripe transition-all duration-200"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
} 