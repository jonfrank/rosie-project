import { useState } from 'react'

const TimePortal = ({ onActivated }) => {
  const [inputYear, setInputYear] = useState('')
  const [isActivated, setIsActivated] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isActivating, setIsActivating] = useState(false)

  const handleActivate = () => {
    if (inputYear === '1939') {
      setIsActivating(true)
      setShowError(false)
      
      // Add some drama with a delay
      setTimeout(() => {
        setIsActivated(true)
        setIsActivating(false)
        onActivated()
      }, 2000)
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
  )
}

export default TimePortal
