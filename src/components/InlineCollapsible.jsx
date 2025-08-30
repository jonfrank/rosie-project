import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const InlineCollapsible = ({ buttonText = "Show more", children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="my-6">
      <div className="border border-gray-200 rounded-lg shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between rounded-t-lg border-b border-gray-200"
        >
          <span className="text-base font-medium text-gray-900">{buttonText}</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
        
        {isOpen && (
          <div className="px-4 py-4 bg-white rounded-b-lg">
            <div className="max-w-none text-gray-700 leading-relaxed">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InlineCollapsible
