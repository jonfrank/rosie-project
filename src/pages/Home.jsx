import { Link } from 'react-router-dom'

// Topics data for classroom resources
const topics = [
  {
    id: 1,
    slug: 'mary-rose',
    title: 'The Mary Rose',
    description: 'Explore the famous Tudor warship of Henry VIII, its sinking, and remarkable recovery.',
    period: 'Tudor Period (1510-1545)',
    keyStage: 'KS2-KS3',
    subjects: ['History', 'Geography', 'Science']
  },
  {
    id: 2,
    slug: 'king-henry-viii',
    title: 'King Henry VIII',
    description: 'Discover the life and reign of England\'s most famous Tudor monarch and the English Reformation.',
    period: 'Tudor Period (1509-1547)',
    keyStage: 'KS2-KS4',
    subjects: ['History', 'Religious Studies']
  },
  {
    id: 3,
    slug: 'princess-di',
    title: 'Princess Diana',
    description: 'Learn about the People\'s Princess and her impact on modern British society and charity work.',
    period: 'Modern History (1961-1997)',
    keyStage: 'KS3-KS4',
    subjects: ['History', 'Citizenship', 'PSHE']
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
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Educational resources and teaching materials to bring the museum experience directly into your classroom.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Topics</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{topic.period}</span>
                  <span className="mx-2">•</span>
                  <span>{topic.keyStage}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {topic.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {topic.subjects.map((subject) => (
                    <span key={subject} className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {subject}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
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
                    Resources
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Resources Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">For Teachers</h2>
        <p className="text-gray-600 mb-6">Each topic includes classroom activities, downloadable resources, and multimedia content to support your teaching.</p>
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Lesson Plans</h3>
            <p className="text-sm text-gray-600">Ready-to-use classroom activities</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Worksheets</h3>
            <p className="text-sm text-gray-600">Printable activities and assignments</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Multimedia</h3>
            <p className="text-sm text-gray-600">Videos, images, and audio content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
