import { useParams, Link } from 'react-router-dom'

const LearnMore = () => {
  const { slug } = useParams()

  // Topic metadata
  const topicTitles = {
    'scouts': 'Scouts Movement',
    'womens-land-army': 'Women\'s Land Army',
    'junior-salvage-stewards': 'Junior Salvage Stewards'
  }

  const topicTitle = topicTitles[slug] || slug

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <div className="flex items-center space-x-2 text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>›</span>
          <Link to={`/topic/${slug}/classroom`} className="hover:text-blue-600">{topicTitle}</Link>
          <span>›</span>
          <span className="text-gray-900">Learn More</span>
        </div>
      </nav>

      {/* Back to Investigation button */}
      <div className="mb-8">
        <Link
          to={`/topic/${slug}/classroom`}
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Investigation
        </Link>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-800 text-sm">
            Note: Learn more content is not yet available for this topic. Default content is shown below.
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <h1>Learn More About {topicTitle}</h1>
          <p>This page will contain additional information about {topicTitle}.</p>
          <p>Content coming soon...</p>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
        <div className="space-y-2">
          <Link
            to={`/topic/${slug}/resources`}
            className="block text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Teaching Resources for {topicTitle}
          </Link>
          <Link
            to={`/topic/${slug}/classroom`}
            className="block text-blue-600 hover:text-blue-800 hover:underline"
          >
            Return to Classroom Investigation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LearnMore
