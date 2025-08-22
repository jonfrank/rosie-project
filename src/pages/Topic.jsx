import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Carousel from '../components/Carousel'
import TimePortal from '../components/TimePortal'
import CollapsibleSection from '../components/CollapsibleSection'
import '../components/TimePortal.css'

const Topic = () => {
  const { slug, type } = useParams() // type is either 'classroom' or 'resources'
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carouselDescriptions, setCarouselDescriptions] = useState({})
  const [portalActivated, setPortalActivated] = useState(false)
  const [objectsAppearing, setObjectsAppearing] = useState(false)
  const [openSection, setOpenSection] = useState(0) // Default to first section open

  // Topic metadata - now using Investigation numbers for classroom pages
  const topicTitles = {
    'scouts': 'Scouts Movement',
    'womens-land-army': 'Women\'s Land Army',
    'junior-salvage-stewards': 'Junior Salvage Stewards'
  }
  
  const investigationTitles = {
    'womens-land-army': 'Investigation 1',
    'junior-salvage-stewards': 'Investigation 2', 
    'scouts': 'Investigation 3'
  }

  // Auto-discovered carousel items
  const [carouselItems, setCarouselItems] = useState([])

  // Auto-discover media files and create carousel items for current topic
  const discoverMediaFiles = async () => {
    const basePath = ''
    const items = []
    
    // Topic-specific media files (ordered as they should appear in carousel)
    const topicMediaFiles = {
      'junior-salvage-stewards': [
        'adult-gas-mask.mov',                  // First item - Adult gas mask video
        'child-gas-mask.mov',                  // Second item - Child gas mask video
        'clothing-ration-book.mov',            // Third item - Clothing ration book video
        'Join the Cogs Art.jpg',               // Fourth item - Join the Cogs poster
        'shrapnel.mov'                         // Fifth item - Shrapnel video
      ],
      'scouts': [
        'arp-helmet.mov',                 // First item - ARP helmet video
        'Scout ARP.webp',                 // Second item - Scout ARP image
        'scout-badge.mp4',                // Third item - Scout badge video
        'fire-bucket.mov',                // Fourth item - Fire bucket video
        'first-aid-armband.mov'           // Fifth item - First aid armband video
      ],
      'womens-land-army': [
        'Ration Book.mov',         // First item - Ration Book
        'WLA Trousers.mov',        // Second item - WLA Trousers
        'Women\'s Land Army.jpg',  // Third item - WLA Poster
        'Green WLA Armband.mov',   // Fourth item - Green armband
        'Red WLA Armband.mov'      // Fifth item - Red armband
      ]
    }
    
    // Get media files for the current topic only
    const currentTopicFiles = topicMediaFiles[slug] || []
    
    for (const filename of currentTopicFiles) {
      try {
        // Check if media file exists
        const mediaResponse = await fetch(`${basePath}/topics/${slug}/${filename}`, { method: 'HEAD' })
        if (mediaResponse.ok) {
          // Try to load corresponding description file
          const descFileName = filename.replace(/\.[^.]+$/, '.md')
          let description = 'No description available.'
          let title = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
          
          try {
            const descResponse = await fetch(`${basePath}/topics/${slug}/${descFileName}`)
            if (descResponse.ok) {
              const descText = await descResponse.text()
              const lines = descText.split('\n')
              
              // Check if file starts with ## Questions (question-only format)
              if (lines[0]?.trim().toLowerCase() === '## questions') {
                // For question-only files, use the filename as title and full content as description
                description = descText.trim()
              } else {
                // Original format: Extract title from first line (remove # symbol)
                if (lines[0]?.startsWith('#')) {
                  title = lines[0].replace(/^#+\s*/, '').trim()
                }
                // Extract content (skip title and empty line)
                description = lines.slice(2).join('\n').trim()
              }
            }
          } catch (err) {
            console.log(`No description file found for ${filename}`)
          }
          
          items.push({
            image: filename,
            title: title,
            description: description
          })
        }
      } catch (err) {
        // File doesn't exist, skip it
        console.log(`Media file ${filename} not found in ${slug}`)
      }
    }
    
    return items
  }

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const basePath = ''
        
        // Load main content
        const response = await fetch(`${basePath}/topics/${slug}/${type}.md`)
        if (!response.ok) {
          throw new Error(`Failed to load ${type} content`)
        }
        const text = await response.text()
        setContent(text)
        
        // Auto-discover carousel items for classroom pages
        if (type === 'classroom') {
          const items = await discoverMediaFiles()
          setCarouselItems(items)
        }
        
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

  const topicTitle = type === 'classroom' ? (investigationTitles[slug] || `Investigation ${slug}`) : (topicTitles[slug] || slug)
  const pageType = type === 'classroom' ? 'Classroom Materials' : 'Resources'

  // Handle section toggling for accordion behavior in resources pages
  const handleSectionToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId)
  }

  // Parse content into collapsible sections for resources pages
  const parseContentSections = (content) => {
    const lines = content.split('\n')
    const sections = []
    let currentSection = null
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        // Save previous section if exists
        if (currentSection) {
          sections.push(currentSection)
        }
        // Start new section
        currentSection = {
          title: line.replace('## ', ''),
          content: []
        }
      } else if (line.startsWith('# ')) {
        // Skip main title - it will be rendered separately
        return
      } else if (currentSection) {
        currentSection.content.push(line)
      }
    })
    
    // Add final section
    if (currentSection) {
      sections.push(currentSection)
    }
    
    return sections
  }

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

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        {type === 'classroom' ? (
          // Special layout for classroom pages with Grace introduction
          <div>
            {/* Parse content to separate Grace intro from rest */}
            {(() => {
              const lines = content.split('\n')
              const graceImageIndex = lines.findIndex(line => line.includes('![Grace]'))
              const separatorIndex = lines.findIndex(line => line.trim() === '---')
              
              if (graceImageIndex !== -1 && separatorIndex !== -1) {
                // Extract Grace introduction section
                const graceSection = lines.slice(graceImageIndex, separatorIndex).join('\n')
                const restContent = lines.slice(separatorIndex + 1).join('\n')
                
                // Extract text content (everything after the image line)
                const graceTextLines = lines.slice(graceImageIndex + 1, separatorIndex)
                const graceText = graceTextLines.filter(line => line.trim() !== '').join('\n\n')
                
                return (
                  <>
                    {/* Mission Title */}
                    <div className="prose prose-lg max-w-none mb-6">
                      <ReactMarkdown>{lines[0]}</ReactMarkdown>
                    </div>
                    
                    {/* Grace Introduction - Two Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {/* Left Column - Grace Image */}
                      <div className="md:col-span-1 flex justify-center">
                        <img 
                          src="/assets/character-image.png"
                          alt="Grace"
                          className="w-56 h-56 object-cover rounded-full"
                        />
                      </div>
                      
                      {/* Right Column - Grace Text */}
                      <div className="md:col-span-2">
                        <div className="prose prose-lg">
                          <ReactMarkdown
                            components={{
                              p: ({children}) => <p className="text-lg leading-relaxed">{children}</p>
                            }}
                          >
                            {graceText}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rest of content */}
                    {restContent ? (
                      <div className="prose prose-lg max-w-none">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            img: ({node, ...props}) => {
                              const basePath = ''
                              const src = props.src?.startsWith('http') 
                                ? props.src 
                                : `${basePath}/topics/${slug}/${props.src}`
                              return <img {...props} src={src} className="rounded-lg shadow-sm" />
                            },
                            a: ({node, ...props}) => {
                              const isExternal = props.href?.startsWith('http')
                              const isFile = props.href?.endsWith('.pdf') || props.href?.endsWith('.mp4') || props.href?.endsWith('.mp3')
                              
                              if (isFile) {
                                const basePath = ''
                                const href = isExternal 
                                  ? props.href 
                                  : `${basePath}/topics/${slug}/${props.href}`
                                return <a {...props} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline" />
                              }
                              
                              if (isExternal) {
                                return <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline" />
                              }
                              
                              return <a {...props} className="text-blue-600 hover:text-blue-800 underline" />
                            }
                          }}
                        >
                          {restContent}
                        </ReactMarkdown>
                      </div>
                    ) : null}
                  </>
                )
              }
              
              // Fallback to normal rendering if structure doesn't match
              return (
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      img: ({node, ...props}) => {
                        const basePath = ''
                        const src = props.src?.startsWith('http') 
                          ? props.src 
                          : `${basePath}/topics/${slug}/${props.src}`
                        return <img {...props} src={src} className="rounded-lg shadow-sm" />
                      },
                      a: ({node, ...props}) => {
                        const isExternal = props.href?.startsWith('http')
                        const isFile = props.href?.endsWith('.pdf') || props.href?.endsWith('.mp4') || props.href?.endsWith('.mp3')
                        
                        if (isFile) {
                          const basePath = ''
                          const href = isExternal 
                            ? props.href 
                            : `${basePath}/topics/${slug}/${props.href}`
                          return <a {...props} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline" />
                        }
                        
                        if (isExternal) {
                          return <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline" />
                        }
                        
                        return <a {...props} className="text-blue-600 hover:text-blue-800 underline" />
                      }
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              )
            })()}
          </div>
        ) : (
          // Resources pages with collapsible sections
          <div>
            {/* Extract and render main title */}
            {(() => {
              const lines = content.split('\n')
              const titleLine = lines.find(line => line.startsWith('# '))
              return titleLine ? (
                <div className="prose prose-lg max-w-none mb-6">
                  <ReactMarkdown>{titleLine}</ReactMarkdown>
                </div>
              ) : null
            })()}
            
            {/* Render collapsible sections */}
            {parseContentSections(content).map((section, index) => (
              <CollapsibleSection 
                key={index} 
                title={section.title} 
                isOpen={openSection === index}
                onToggle={handleSectionToggle}
                sectionId={index}
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    ul: ({node, ...props}) => <ul {...props} style={{marginTop: '0.25rem', marginBottom: '1rem'}} />,
                    img: ({node, ...props}) => {
                      const basePath = ''
                      const src = props.src?.startsWith('http') 
                        ? props.src 
                        : `${basePath}/topics/${slug}/${props.src}`
                      return <img {...props} src={src} className="rounded-lg shadow-sm" />
                    },
                    a: ({node, ...props}) => {
                      const isExternal = props.href?.startsWith('http')
                      const isFile = props.href?.endsWith('.pdf') || props.href?.endsWith('.mp4') || props.href?.endsWith('.mp3')
                      
                      if (isFile) {
                        const basePath = ''
                        const href = isExternal 
                          ? props.href 
                          : `${basePath}/topics/${slug}/${props.href}`
                        return <a {...props} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline" />
                      }
                      
                      if (isExternal) {
                        return <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline" />
                      }
                      
                      return <a {...props} className="text-blue-600 hover:text-blue-800 underline" />
                    }
                  }}
                >
                  {section.content.join('\n')}
                </ReactMarkdown>
              </CollapsibleSection>
            ))}
            
            {/* Open Classroom Page button - placed at bottom after reading the guide */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <a
                href={`/topic/${slug}/classroom`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Open Classroom Page
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Time Portal for classroom pages */}
      {type === 'classroom' ? (
        <TimePortal onActivated={() => {
          setPortalActivated(true)
          // Start object appearing animation after a brief delay
          setTimeout(() => setObjectsAppearing(true), 500)
        }} />
      ) : null}

      {/* Auto-discovered Carousel - only show when portal is activated for classroom pages */}
      {carouselItems.length > 0 && (type !== 'classroom' || portalActivated) ? (
        <div className={`mt-8 ${objectsAppearing ? 'objects-materializing' : ''}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Time to Investigate</h2>
          <div className="objects-container">
            <Carousel 
              items={carouselItems.map((item, index) => ({
                ...item,
                image: `/topics/${slug}/${item.image}`,
                animationDelay: index * 0.3 // Stagger the animations
              }))}
            />
          </div>
        </div>
      ) : null}

    </div>
  )
}

export default Topic
