import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Home, Info, HelpCircle } from 'lucide-react'

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu when location changes (navigation)
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const investigations = [
    {
      id: 'womens-land-army',
      title: 'Investigation 1: Women\'s Land Army',
      shortTitle: 'Women\'s Land Army',
      description: 'Learn about women who worked on farms during WWII',
      available: true
    },
    {
      id: 'junior-salvage-stewards', 
      title: 'Investigation 2: Junior Salvage Stewards',
      shortTitle: 'Junior Salvage Stewards',
      description: 'Explore children\'s role in wartime recycling',
      available: true
    },
    {
      id: 'scouts',
      title: 'Investigation 3: Scouts',
      shortTitle: 'Scouts',
      description: 'Discover scouts\' contributions to the war effort',
      available: true
    }
  ]

  const mainPages = [
    {
      path: '/',
      title: 'Home',
      icon: Home,
      description: 'Overview of all investigations'
    },
    {
      path: '/how-to-use',
      title: 'How to Use',
      icon: HelpCircle,
      description: 'Guide for teachers'
    },
    {
      path: '/about',
      title: 'About',
      icon: Info,
      description: 'About this project'
    }
  ]

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
      >
        <span>Navigation</span>
        <ChevronDown 
          className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Main Pages Section */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Main Pages</h3>
            <div className="space-y-1">
              {mainPages.map((page) => {
                const Icon = page.icon
                return (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                      <div className="text-xs text-gray-500">{page.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Investigations Section */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Investigations</h3>
            <div className="space-y-4">
              {investigations.map((investigation) => (
                <div key={investigation.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {investigation.shortTitle}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {investigation.description}
                      </p>
                    </div>
                    {!investigation.available && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {investigation.available ? (
                    <div className="flex gap-1">
                      <Link
                        to={`/topic/${investigation.id}/resources`}
                        className="flex-1 px-2 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded text-center transition-colors"
                      >
                        Teacher Guide
                      </Link>
                      <Link
                        to={`/topic/${investigation.id}/classroom`}
                        className="flex-1 px-2 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium rounded text-center transition-colors"
                      >
                        Investigation
                      </Link>
                      <Link
                        to={`/topic/${investigation.id}/learn-more`}
                        className="flex-1 px-2 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-medium rounded text-center transition-colors"
                      >
                        Learn More
                      </Link>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <button 
                        disabled 
                        className="flex-1 px-2 py-1.5 bg-gray-50 text-gray-400 text-xs font-medium rounded text-center cursor-not-allowed"
                      >
                        Teacher Guide
                      </button>
                      <button 
                        disabled 
                        className="flex-1 px-2 py-1.5 bg-gray-50 text-gray-400 text-xs font-medium rounded text-center cursor-not-allowed"
                      >
                        Investigation
                      </button>
                      <button 
                        disabled 
                        className="flex-1 px-2 py-1.5 bg-gray-50 text-gray-400 text-xs font-medium rounded text-center cursor-not-allowed"
                      >
                        Learn More
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainNav
