const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Museum in your Classroom</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Museum in your Classroom, a digital resource platform designed to bring the museum experience into the classroom through engaging materials and interactive content.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We believe that history should be accessible, engaging, and relevant to students' lives. 
            Our carefully curated resources help teachers bring historical events to life through 
            multimedia content, hands-on activities, and thought-provoking discussions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
          <p className="text-gray-600 mb-4">
            This blog is built using modern web technologies that ensure performance, 
            maintainability, and a great user experience:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• React 18 for component-based UI</li>
                <li>• Vite for fast development and building</li>
                <li>• Tailwind CSS for responsive styling</li>
                <li>• React Router for client-side routing</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Deployment</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• AWS S3 for static hosting</li>
                <li>• CloudFront CDN for global delivery</li>
                <li>• Optimized build for fast loading</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Fast Performance</h3>
              <p className="text-sm text-gray-600 mt-1">Optimized for speed and performance</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Mobile Friendly</h3>
              <p className="text-sm text-gray-600 mt-1">Responsive design for all devices</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">SEO Optimized</h3>
              <p className="text-sm text-gray-600 mt-1">Built with search engines in mind</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            Have questions, suggestions, or want to collaborate? We'd love to hear from you!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn btn-primary">
              Contact Us
            </button>
            <button className="btn btn-secondary">
              Follow on Social
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
