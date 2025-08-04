import { useState, useRef } from 'react'
import './TimePortal.css'

const TimePortal = ({ onActivated }) => {
  const [inputYear, setInputYear] = useState('')
  const [isActivated, setIsActivated] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const [isWarping, setIsWarping] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [warpMessage, setWarpMessage] = useState('')
  const audioRef = useRef(null)

  // Function to scroll to carousel section
  const scrollToCarousel = () => {
    console.log('🔍 scrollToCarousel called')
    
    // Function to attempt scrolling with retries
    const attemptScroll = (attempt = 1, maxAttempts = 5) => {
      console.log(`📍 Scroll attempt ${attempt}/${maxAttempts}`)
      
      // Look specifically for the "Time to Investigate" heading first
      const selectors = [
        'h2', // "Time to Investigate" heading
        '.objects-container',
        '.objects-materializing', 
        '[class*="carousel"]',
      ]
      
      let targetElement = null
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector)
        console.log(`🔍 Found ${elements.length} elements for selector: ${selector}`)
        
        // If it's h2, look for one that might contain "Time to Investigate"
        if (selector === 'h2' && elements.length > 0) {
          for (const h2 of elements) {
            console.log(`📝 H2 text: "${h2.textContent}"`)
            if (h2.textContent.includes('Time to Investigate') || h2.textContent.includes('Investigate')) {
              targetElement = h2
              console.log('✅ Found "Time to Investigate" heading!')
              break
            }
          }
          if (targetElement) break
          // If no specific "Time to Investigate" found, use the last h2 (likely to be it)
          targetElement = elements[elements.length - 1]
          console.log('📍 Using last h2 element as fallback')
          break
        } else if (elements.length > 0) {
          targetElement = elements[0]
          console.log(`✅ Found target element with selector: ${selector}`)
          break
        }
      }
      
      if (targetElement) {
        console.log('🎯 Scrolling to target element:', targetElement)
        // Get the element's position and add some offset to keep it visible
        const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset
        const offset = 30 // Keep 30px from top of viewport to ensure heading is fully visible
        
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        })
      } else if (attempt < maxAttempts) {
        // Retry after a longer delay - elements might not be rendered yet
        console.log(`⏳ No target found, retrying in ${attempt * 200}ms...`)
        setTimeout(() => attemptScroll(attempt + 1, maxAttempts), attempt * 200)
      } else {
        // Final fallback: scroll to a position
        console.log('📍 Using fallback scroll position')
        const scrollPosition = Math.max(window.innerHeight, document.body.scrollHeight * 0.65)
        console.log(`📍 Scrolling to position: ${scrollPosition}px`)
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        })
      }
    }
    
    // Start the first attempt with a small delay
    setTimeout(() => attemptScroll(), 300) // Increased initial delay
  }

  const handleActivate = async () => {
    if (inputYear === '1939') {
      setIsActivating(true)
      setShowError(false)
      
      // Start the warp effect
      setTimeout(() => {
        setIsWarping(true)
        
        // Dynamic message sequence
        const messages = [
          '🔍 CHECKING COORDINATES',
          '⏰ TRAVELLING THROUGH TIME', 
          '📦 GATHERING OBJECTS',
          '🏠 RETURNING TO PRESENT'
        ]
        
        // Set initial message
        setWarpMessage(messages[0])
        
        // Change messages every ~3.1 seconds (12.45 seconds total / 4 messages)
        messages.forEach((message, index) => {
          setTimeout(() => {
            setWarpMessage(message)
          }, index * 3100)
        })
        
        // Play audio if available
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(err => {
            console.log('Audio playback failed:', err)
          })
          
          // Start explosion 800ms before audio ends so they finish together
          setTimeout(() => {
            setIsWarping(false)
            setIsExploding(true)
            // Activate portal early so carousel elements are rendered
            onActivated()
            // Start scrolling to carousel during explosion
            setTimeout(() => scrollToCarousel(), 400) // More delay for rendering
          }, 11650) // 12450ms - 800ms = 11650ms
          
          // Listen for audio end to complete the effect
          audioRef.current.onended = () => {
            // Audio ends, explosion should also end now
            setIsExploding(false)
            setIsActivated(true)
            setIsActivating(false)
          }
          
          // Fallback in case audio doesn't load or play - start explosion at same time
          setTimeout(() => {
            if (isActivating) {
              setIsWarping(false)
              setIsExploding(true)
              // Activate portal early so carousel elements are rendered
              onActivated()
              // Start scrolling to carousel during explosion
              setTimeout(() => scrollToCarousel(), 400)
            }
          }, 11650) // Same timing as audio version
          
          // Fallback to end explosion after full duration
          setTimeout(() => {
            if (isActivating) {
              setIsExploding(false)
              setIsActivated(true)
              setIsActivating(false)
            }
          }, 12450) // 12.45 second total duration
        } else {
          // No audio, use same timing as audio version
          setTimeout(() => {
            setIsWarping(false)
            setIsExploding(true)
            // Activate portal early so carousel elements are rendered
            onActivated()
            // Start scrolling to carousel during explosion
            setTimeout(() => scrollToCarousel(), 400)
          }, 11650) // Start explosion at same time
          
          setTimeout(() => {
            setIsExploding(false)
            setIsActivated(true)
            setIsActivating(false)
          }, 12450) // End at same time
        }
      }, 500) // Short delay before warp starts
    } else if (inputYear === '0000') {
      // Teacher skip code - instantly activate without animation
      setIsActivating(true)
      setShowError(false)
      
      // Instantly activate portal
      setTimeout(() => {
        setIsActivated(true)
        setIsActivating(false)
        onActivated()
      }, 200) // Very brief delay for visual feedback
    } else {
      setShowError(true)
      // Clear error after 3 seconds
      setTimeout(() => setShowError(false), 3000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleActivate()
    }
  }

  if (isActivated) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="text-center">
          <div className="text-green-600 text-xl font-bold mb-2">
            🌟 Time Portal Activated! 🌟
          </div>
          <p className="text-green-800">
            Perfect! The coordinates are set. The objects from the past are materializing below...
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        preload="auto"
        src={`${import.meta.env.PROD ? '/rosie-project' : ''}/time-portal-warp.mp3`}
      />
      
      {/* Warp Effect Overlay */}
      {isWarping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="warp-effect">
            <div className="spiral-ring spiral-ring-1"></div>
            <div className="spiral-ring spiral-ring-2"></div>
            <div className="spiral-ring spiral-ring-3"></div>
            <div className="warp-center">
              <div className="warp-text">
                {warpMessage}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Explosion Effect Overlay */}
      {isExploding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="warp-effect">
            <div className="spiral-ring explosion-ring-1"></div>
            <div className="spiral-ring explosion-ring-2"></div>
            <div className="spiral-ring explosion-ring-3"></div>
            <div className="spiral-ring explosion-ring-4"></div>
            <div className="spiral-ring explosion-ring-5"></div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            ⚡ Time Portal Activation ⚡
          </h3>
          
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="year-input" className="block text-sm font-medium text-blue-800 mb-2">
                Enter the year World War Two began:
              </label>
              <input
                id="year-input"
                type="number"
                value={inputYear}
                onChange={(e) => setInputYear(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter year..."
                className="w-full px-4 py-2 border border-blue-300 rounded-md text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isActivating}
              />
            </div>
            
            <button
              onClick={handleActivate}
              disabled={isActivating || !inputYear}
              className={`w-full py-3 px-6 rounded-lg text-white text-lg font-bold transition-all duration-200 ${
                isActivating 
                  ? 'bg-yellow-500 animate-pulse cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
              }`}
            >
              {isActivating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Activating Portal...
                </span>
              ) : (
                '🚀 ACTIVATE TIME PORTAL'
              )}
            </button>
            
            {showError && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
                <p className="text-red-800 text-sm">
                  🤔 Hmm, that doesn't seem right. Try again! 
                  <br />
                  <span className="text-xs text-red-600">Hint: Think about when the war started in Europe...</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TimePortal
