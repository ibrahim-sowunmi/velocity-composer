'use client'

import { Puck, usePuck } from "@measured/puck"
import "@measured/puck/puck.css"
import { useEffect, useState } from "react"
import { use } from "react"
import { getFileData, saveFileData } from "@/app/actions/file"
import { puckConfig } from "@/app/config/puck"
import Link from "next/link"
import { Loader } from "lucide-react"
import { ChevronRight } from "lucide-react"

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
        View Email
      </Link>
    </div>
  )
}

// Custom Publish Button Component
const CustomPublishButton = ({ fileId, onPublish }) => {
  const { dispatch, appState } = usePuck()

  const handlePublish = async () => {
    try {
      const result = await saveFileData(fileId, appState.data)
      if (result.success) {
        onPublish()
      } else {
        console.error('Failed to save:', result.error)
      }
    } catch (error) {
      console.error('Error saving:', error)
    }
  }

  return (
    <button
      onClick={handlePublish}
      className="inline-flex items-center gap-2 px-4 py-2 bg-stripe-primary text-white text-sm font-medium rounded-md hover:bg-stripe-primary-dark shadow-stripe-sm hover:shadow-stripe transition-all"
    >
      Publish Changes
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

// Component Search Component
const ComponentSearch = () => {
  const { appState, dispatch } = usePuck();
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingComponents, setMatchingComponents] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    if (!appState.ui.componentList) return;

    const searchLower = value.toLowerCase().trim();
    const matches = [];
    
    // Create updated componentList state
    const updatedComponentList = {};
    
    Object.entries(appState.ui.componentList).forEach(([category, data]) => {
      // Skip if not an object or no components
      if (typeof data !== 'object' || !data.components) return;
      
      // Check each component in the category
      Object.entries(data.components).forEach(([name, comp]) => {
        const componentTitle = comp.label || name;
        const titleMatch = componentTitle.toLowerCase().includes(searchLower);
        const categoryMatch = category.toLowerCase().includes(searchLower);
        
        if (titleMatch || categoryMatch) {
          matches.push({
            title: componentTitle,
            category: category
          });
        }
      });
      
      // Update category state
      updatedComponentList[category] = {
        ...data,
        expanded: searchLower === '' ? false : matchingComponents.length > 0
      };
    });

    // Update matches state
    setMatchingComponents(value ? matches : []);

    // Update UI state
    dispatch({
      type: "setUi",
      ui: {
        ...appState.ui,
        componentList: updatedComponentList,
        leftSideBarVisible: true
      }
    });
  };

  return (
    <div className="border-b py-1 pb-4 border-gray-200">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search components..."
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm 
                   focus:outline-none focus:ring-2 focus:ring-stripe-primary focus:border-transparent
                   placeholder-gray-400"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              handleSearch('');
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Show matching components */}
      {matchingComponents.length > 0 && (
        <div className="m-4 border-b border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase">
            Matching Components
          </div>
          {matchingComponents.map((comp, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 py-1.5 px-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="font-medium">{comp.title}</span>
                <span className="text-xs text-gray-400">{comp.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
          ),
          components: ({ children }) => {
            const { dispatch, appState } = usePuck();
            
            return (
              <div>
                <ComponentSearch />
                {children}
              </div>
            );
          }
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