import { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'

const InvestigationNav = () => {
  const { slug } = useParams()
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)

  // Topic metadata - using Investigation numbers for consistency
  const topicTitles = {
    'scouts': 'Investigation 3: Scouts',
    'womens-land-army': 'Investigation 1: Women\'s Land Army',
    'junior-salvage-stewards': 'Investigation 2: Junior Salvage Stewards'
  }

  const getCurrentPageType = () => {
    if (location.pathname.includes('/resources')) return 'resources'
    if (location.pathname.includes('/learn-more')) return 'learn-more'
    if (location.pathname.includes('/classroom')) return 'classroom'
    return 'classroom'
  }

  const getPageDisplayName = (type) => {
    switch (type) {
      case 'resources': return 'Teacher Guide'
      case 'classroom': return 'Investigation'
      case 'learn-more': return 'Learn More'
      default: return 'Investigation'
    }
  }

  const currentPageType = getCurrentPageType()
  const topicTitle = topicTitles[slug] || slug
  const currentPageName = getPageDisplayName(currentPageType)

  // Navigation items for the topic
  const navItems = [
    {
      type: 'resources',
      label: 'Teacher Guide',
      description: 'Background information and guidance',
      path: `/topic/${slug}/resources`
    },
    {
      type: 'classroom',
      label: 'Investigation',
      description: 'Interactive classroom experience',
      path: `/topic/${slug}/classroom`
    },
    {
      type: 'learn-more',
      label: 'Learn More',
      description: 'Extended content and activities',
      path: `/topic/${slug}/learn-more`
    }
  ]

  return (
    <div className="relative mb-6">
      {/* Current Page Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="text-left">
            <div className="text-sm text-gray-500">{topicTitle}</div>
            <div className="font-medium text-gray-900">{currentPageName}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Navigate</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {navItems.map((item) => (
            <Link
              key={item.type}
              to={item.path}
              className={`block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                currentPageType === item.type 
                  ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                  : ''
              }`}
              onClick={() => setIsExpanded(false)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${
                    currentPageType === item.type ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                </div>
                {currentPageType === item.type && (
                  <div className="flex items-center text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Backdrop to close menu when clicking outside */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}

export default InvestigationNav
