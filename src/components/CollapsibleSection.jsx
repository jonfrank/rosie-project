import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false, 
  isOpen: controlledIsOpen = null, 
  onToggle = null,
  sectionId = null
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen)
  const sectionRef = useRef(null)
  const wasOpen = useRef(controlledIsOpen !== null ? controlledIsOpen : defaultOpen)
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== null ? controlledIsOpen : internalIsOpen

  // Handle scrolling to section header when it opens
  useEffect(() => {
    // Only scroll if the section just opened (was closed before, now open)
    if (isOpen && !wasOpen.current && sectionRef.current) {
      // Small delay to allow DOM updates to complete
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
        }
      }, 100)
    }
    // Update the wasOpen ref for next comparison
    wasOpen.current = isOpen
  }, [isOpen])

  return (
    <div ref={sectionRef} className="border border-gray-200 rounded-lg mb-4 shadow-sm">
      <button
        onClick={() => {
          if (onToggle && sectionId !== null) {
            // Controlled mode - notify parent
            onToggle(sectionId)
          } else {
            // Uncontrolled mode - manage own state
            setInternalIsOpen(!internalIsOpen)
          }
        }}
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
