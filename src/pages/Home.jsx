import { Link } from 'react-router-dom'

// Topics data for classroom resources - ordered by investigation number
const topics = [
  {
    id: 1,
    slug: 'womens-land-army',
    title: 'Investigation 1: Women\'s Land Army',
    description: 'Learn about the vital role played by the women who joined the Land Army to help feed Britain.',
    period: 'World War Two (1939-1945)',
    keyStage: 'Year 6'
  },
  {
    id: 2,
    slug: 'junior-salvage-stewards',
    title: 'Investigation 2: Junior Salvage Stewards',
    description: 'Explore children\'s contribution to the war effort through recycling and salvage collection.',
    period: 'World War Two (1939-1945)',
    keyStage: 'Year 6'
  },
  {
    id: 3,
    slug: 'scouts',
    title: 'Investigation 3: Scouts',
    description: 'Discover the range of jobs undertaken by Boy Scouts on the Home Front.',
    period: 'World War Two (1939-1945)',
    keyStage: 'Year 6'
  }
]

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Museum in your Classroom
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Ready to use lessons and resources bringing the museum experience into your classroom
        </p>
        
        {/* How to Use Button */}
        <div className="mb-8">
          <Link
            to="/how-to-use"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="mr-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to use Museum in your Classroom
          </Link>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Topics</h2>
        <p className="text-lg text-gray-600 mb-8">Three sessions for Year Six classes, exploring jobs on the Home Front during World War Two</p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{topic.period}</span>
                  <span className="mx-2">•</span>
                  <span>{topic.keyStage}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 min-h-[3.5rem] flex items-start">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 mb-6 flex-grow">
                  {topic.description}
                </p>
                
                {topic.id === 1 ? (
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Link 
                      to={`/topic/${topic.slug}/classroom`}
                      className="btn btn-primary flex-1 text-center"
                    >
                      Classroom Materials
                    </Link>
                    <Link 
                      to={`/topic/${topic.slug}/resources`}
                      className="btn btn-secondary flex-1 text-center"
                    >
                      Teacher<br />Guide
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                      <p className="text-yellow-700 font-medium text-sm">
                        🚧 Under Construction
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Resources Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Created for Teachers</h2>
        <p className="text-gray-600 mb-6">Each investigation session includes multimedia classroom resources, activity prompts and downloadable resources to support your students' learning.</p>
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Multimedia</h3>
            <p className="text-sm text-gray-600">Videos and images of real World War Two objects</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Activities</h3>
            <p className="text-sm text-gray-600">Prompts and printable templates to encourage creativity</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Teacher Guides</h3>
            <p className="text-sm text-gray-600">Ready-to-use information and guidance</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
