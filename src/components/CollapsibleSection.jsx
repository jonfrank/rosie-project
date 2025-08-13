import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-200 rounded-lg mb-4 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between rounded-t-lg"
      >
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-white rounded-b-lg">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default CollapsibleSection
