import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-96 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page not found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn btn-primary"
          >
            Go back home
          </Link>
          <Link 
            to="/about" 
            className="btn btn-secondary"
          >
            Learn about us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
