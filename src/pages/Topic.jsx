import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Carousel from '../components/Carousel'

const Topic = () => {
  const { slug, type } = useParams() // type is either 'classroom' or 'resources'
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Topic metadata
  const topicTitles = {
    'scouts': 'Scouts Movement',
    'womens-land-army': 'Women\'s Land Army',
    'junior-salvage-stewards': 'Junior Salvage Stewards'
  }

  // Carousel data for Junior Salvage Stewards
  const juniorSalvageCarouselItems = [
    {
      image: 'Anti-Gas Respirator MKII.jpg',
      title: 'Anti-Gas Respirator MKII',
      description: 'This is a standard Adult Mark II anti-gas respirator used during World War II. These masks were distributed to civilians as protection against potential chemical attacks. The Junior Salvage Stewards would have been familiar with these masks as they were part of everyday wartime life. Rubber from old masks and equipment was often collected by children as part of their salvage efforts - every piece of rubber was valuable for the war effort and could be recycled into new equipment, vehicle tires, or other essential items.'
    },
    {
      image: 'Anti-Gas Respirator Small Child.jpg',
      title: 'Anti-Gas Respirator for Small Children',
      description: 'This specially designed gas mask was created for young children during World War II. Notice how it\'s designed to look less frightening than adult masks - it was sometimes called a "Mickey Mouse" mask because of its distinctive shape and colorful design. Children as young as those who would become Junior Salvage Stewards had to carry these masks everywhere during the war. The bright colors and child-friendly design helped reduce fear and encouraged children to wear them properly during air raid drills.'
    }
  ]

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const basePath = import.meta.env.PROD ? '/rosie-project' : ''
        const response = await fetch(`${basePath}/topics/${slug}/${type}.md`)
        if (!response.ok) {
          throw new Error(`Failed to load ${type} content`)
        }
        const text = await response.text()
        setContent(text)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [slug, type])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const topicTitle = topicTitles[slug] || slug
  const pageType = type === 'classroom' ? 'Classroom Materials' : 'Resources'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <div className="flex items-center space-x-2 text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>›</span>
          <span>{topicTitle}</span>
          <span>›</span>
          <span className="text-gray-900">{pageType}</span>
        </div>
      </nav>

      {/* Resources page link to classroom */}
      {type === 'resources' && (
        <div className="mb-8">
          <a
            href={`${import.meta.env.PROD ? '/rosie-project' : ''}/topic/${slug}/classroom`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Open Classroom Page
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom components for handling images and links relative to topic folder
              img: ({node, ...props}) => {
                const basePath = import.meta.env.PROD ? '/rosie-project' : ''
                const src = props.src?.startsWith('http') 
                  ? props.src 
                  : `${basePath}/topics/${slug}/${props.src}`
                return <img {...props} src={src} className="rounded-lg shadow-sm" />
              },
              a: ({node, ...props}) => {
                if (props.href?.endsWith('.pdf') || props.href?.endsWith('.mp4') || props.href?.endsWith('.mp3')) {
                  const basePath = import.meta.env.PROD ? '/rosie-project' : ''
                  const href = props.href?.startsWith('http') 
                    ? props.href 
                    : `${basePath}/topics/${slug}/${props.href}`
                  return <a {...props} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline" />
                }
                return <a {...props} className="text-blue-600 hover:text-blue-800 underline" />
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Carousel for Junior Salvage Stewards classroom page */}
      {slug === 'junior-salvage-stewards' && type === 'classroom' && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Artifact Gallery</h2>
          <Carousel 
            items={juniorSalvageCarouselItems.map(item => ({
              ...item,
              image: `${import.meta.env.PROD ? '/rosie-project' : ''}/topics/${slug}/${item.image}`
            }))}
          />
        </div>
      )}

      {/* Back to topic navigation */}
      <div className="mt-8 text-center">
        <Link 
          to="/"
          className="btn btn-secondary"
        >
          ← Back to All Topics
        </Link>
      </div>
    </div>
  )
}

export default Topic
