import React from 'react'

const PDFLink = ({ href, children, className, style, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault()
    // Force browser to navigate to PDF by changing window location
    window.location.href = href
  }

  return (
    <a 
      {...props}
      href={href}
      className={className}
      style={style}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export default PDFLink
