import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import InlineCollapsible from './InlineCollapsible'

const MarkdownWithCollapsibles = ({ content, slug, ...markdownProps }) => {
  // Process the content to extract collapsibles
  const processContent = (content) => {
    const collapsibleRegex = /\+\+\+\[([^\]]+)\]\n([\s\S]*?)\n\+\+\+/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = collapsibleRegex.exec(content)) !== null) {
      // Add content before collapsible
      if (match.index > lastIndex) {
        const beforeContent = content.slice(lastIndex, match.index).trim()
        if (beforeContent) {
          parts.push({
            type: 'markdown',
            content: beforeContent,
            key: `markdown-${parts.length}`
          })
        }
      }

      // Add collapsible
      parts.push({
        type: 'collapsible',
        buttonText: match[1],
        content: match[2].trim(),
        key: `collapsible-${parts.length}`
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining content
    if (lastIndex < content.length) {
      const remainingContent = content.slice(lastIndex).trim()
      if (remainingContent) {
        parts.push({
          type: 'markdown',
          content: remainingContent,
          key: `markdown-${parts.length}`
        })
      }
    }

    // If no collapsibles found, treat as single markdown block
    if (parts.length === 0) {
      parts.push({
        type: 'markdown',
        content: content,
        key: 'markdown-0'
      })
    }

    return parts
  }

  const parts = processContent(content)

  return (
    <div>
      {parts.map((part) => {
        if (part.type === 'collapsible') {
          return (
            <InlineCollapsible key={part.key} buttonText={part.buttonText}>
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
                    
                    const linkStyle = {
                      color: '#2563eb', // blue-600
                      textDecoration: 'underline'
                    }
                    
                    if (isFile) {
                      const basePath = ''
                      const href = isExternal 
                        ? props.href 
                        : `${basePath}/topics/${slug}/${props.href}`
                      return <a {...props} href={href} target="_blank" rel="noopener noreferrer" style={linkStyle} />
                    }
                    
                    if (isExternal) {
                      return <a {...props} target="_blank" rel="noopener noreferrer" style={linkStyle} />
                    }
                    
                    return <a {...props} style={linkStyle} />
                  }
                }}
              >
                {part.content}
              </ReactMarkdown>
            </InlineCollapsible>
          )
        } else {
          return (
            <ReactMarkdown 
              key={part.key}
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
                },
                ...markdownProps.components
              }}
              {...markdownProps}
            >
              {part.content}
            </ReactMarkdown>
          )
        }
      })}
    </div>
  )
}

export default MarkdownWithCollapsibles
