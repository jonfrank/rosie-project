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
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 mt-0">🔎 Choose Your Investigation</h3>
                <p className="text-gray-600">Select your topic from the avaliable options. The investigations can be done in any order, and all sessions assume basic KS2 knowledge of World War Two.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 mt-0">📖 Read the Teacher Guide</h3>
                <p className="text-gray-600">Look through the Teacher Guide for your chosen investigation. This provides background information to the topic, tips for effective use of the resources, and suggested adaptations to make the session more accessible. You will find further resources for reseach here too.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 mt-0">📜 Download the Object Guide</h3>
                <p className="text-gray-600">Make sure you have downloaded (and optionally printed) the object guide to use during the session. This gives you all of the content that will be displayed to the class (written in bold) and plenty of additional information to support you in leading class discussions.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 mt-0">🖨️ Print out the worksheets</h3>
                <p className="text-gray-600">If you are using the printable worksheets for the activity, make sure they're printed out before the session!</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">5</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 mt-0">🖥️ Open the Classroom Materials Page</h3>
                <p className="text-gray-600">Make sure that you do this <strong>before</strong> students can see the screen, so they don't see the theme in advance. As each object builds on the previous source to gradually reveal the Home Front role, you don't want to give it away before the session's started!</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">6</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 mt-0">🚀 Session Introduction and Time Portal</h3>
                <p className="text-gray-600">When you launch the investigation, your class will meet Grace. Read out Grace's words (or ask a student to read out the text), then enter the coordinates. By entering <strong>1939</strong>, you will activate the time portal, which is a 10 second long animation with sound effects. If the class would benefit from a movement break, come up with a time travel dance to do while the portal is retrieving the objects. If the animation and sound will be challenging for your students, you can enter <strong>0000</strong> instead, which will skip straight to the objects.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">7</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 mt-0">🕵🏽‍♀️ Investigate the Objects</h3>
                <p className="text-gray-600">All of the objects in the videos are <strong>real World War Two objects</strong>. Use the navigation buttons and object guide to discuss each object as a class, then view the <strong>Learn More</strong> page to build your students' knowledge further.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">8</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 mt-0">✍🏼 Activity Time</h3>
                <p className="text-gray-600">If you are using the suggested activity, reveal the prompt to the class, hand out plain paper or the printed worksheets, and let them get creative! The suggested activities have been kept as simple and resource-free as possible to keep them cheap and accessible. Have a look at the <strong>Alternative Activity Suggestions</strong> within the Teacher Guide for more creative and resource-heavy suggestions.</p>
              </div>
            </div>
          </div>

          <h2>Need Help?</h2>
          <p>
            Please reach out if you have any questions about using Museum in your Classroom. 
            You can get in touch at <a href="mailto:museuminyourclassroom@gmail.com" className="text-blue-600 hover:text-blue-800 underline font-medium">museuminyourclassroom@gmail.com</a>.
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
