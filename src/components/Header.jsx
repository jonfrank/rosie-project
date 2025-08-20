import { Link } from 'react-router-dom'
import MainNav from './MainNav'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Museum in your Classroom
            </Link>
          </div>
          <div className="flex items-center">
            <MainNav />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
