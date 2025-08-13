import { Link } from 'react-router-dom'

const HowToUse = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <div className="flex items-center space-x-2 text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>›</span>
          <span className="text-gray-900">How to use Museum in your Classroom</span>
        </div>
      </nav>

      {/* Back to Home button */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="prose prose-lg max-w-none">
          <h1>How to use Museum in your Classroom</h1>
          
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive guide to getting the most out of your Museum in your Classroom experience.
          </p>

          <h2>How It Works</h2>
          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Choose Your Investigation</h3>
                <p className="text-gray-600">Select from our available investigations focusing on jobs during World War Two.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Prepare with Teacher Guides</h3>
                <p className="text-gray-600">Review the comprehensive teacher materials to understand the learning objectives and prepare discussion points.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Launch the Investigation</h3>
                <p className="text-gray-600">Students meet Grace and activate the time portal by entering the correct year (1939) to begin their historical journey.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Explore Historical Objects</h3>
                <p className="text-gray-600">Students examine real artifacts through videos and images, answering questions and making discoveries about the past.</p>
              </div>
            </div>
          </div>

          <h2>Tips for Success</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-yellow-600 mt-1">💡</span>
                <span><strong>Pre-lesson preparation:</strong> Review the teacher guide and familiarize yourself with the artifacts students will encounter.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-yellow-600 mt-1">💡</span>
                <span><strong>Encourage discussion:</strong> Pause during investigations to discuss what students are observing and learning.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-yellow-600 mt-1">💡</span>
                <span><strong>Extend learning:</strong> Use the suggested activities in the teacher guides to deepen understanding.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-yellow-600 mt-1">💡</span>
                <span><strong>Technical tip:</strong> Ensure good internet connection for smooth video playback of artifact examinations.</span>
              </li>
            </ul>
          </div>

          <h2>Need Help?</h2>
          <p>
            If you have any questions about using Museum in your Classroom, please don't hesitate to reach out. 
            We're here to support you in bringing engaging historical learning to your students.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Get Started with Investigations
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToUse
