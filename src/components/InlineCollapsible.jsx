import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const InlineCollapsible = ({ 
  buttonText = "Show more", 
  children, 
  isOpen: controlledIsOpen = null,
  onToggle = null,
  index = null
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const sectionRef = useRef(null)
  const wasOpen = useRef(controlledIsOpen !== null ? controlledIsOpen : false)
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== null ? controlledIsOpen : internalIsOpen

  // Handle scrolling to section header when it opens
  useEffect(() => {
    // Only scroll if the section just opened (was closed before, now open)
    if (isOpen && !wasOpen.current && sectionRef.current) {
      // Small delay to allow DOM updates and previous section to close
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
        }
      }, 150) // Slightly longer delay to account for accordion transition
    }
    // Update the wasOpen ref for next comparison
    wasOpen.current = isOpen
  }, [isOpen])

  const handleToggle = () => {
    if (onToggle && index !== null) {
      // Controlled mode - notify parent
      onToggle(index)
    } else {
      // Uncontrolled mode - manage own state
      setInternalIsOpen(!internalIsOpen)
    }
  }

  return (
    <div ref={sectionRef} className="my-6">
      <div className="border border-gray-200 rounded-lg shadow-sm">
        <button
          onClick={handleToggle}
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
