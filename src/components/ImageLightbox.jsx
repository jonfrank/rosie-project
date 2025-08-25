import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const ImageLightbox = ({ src, alt, className, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scrolling when lightbox is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const openLightbox = () => setIsOpen(true)
  const closeLightbox = () => setIsOpen(false)

  return (
    <>
      {/* Clickable image */}
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={openLightbox}
        {...props}
      />
      
      {/* Optional children (like figcaption) that should also be clickable */}
      {children && (
        <div onClick={openLightbox} className="cursor-pointer">
          {children}
        </div>
      )}

      {/* Lightbox overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Full-screen image */}
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />

          {/* Image caption */}
          {alt && (
            <div className="absolute bottom-4 left-4 right-4 text-white text-center text-sm md:text-base bg-black bg-opacity-50 rounded-lg p-3">
              {alt}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ImageLightbox
