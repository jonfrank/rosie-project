import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import "./Carousel.css"

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setIsExpanded(false); // Collapse when moving to next item
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setIsExpanded(false); // Collapse when moving to previous item
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if current item is a video
  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.mov', '.webm', '.ogg', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  // Render media (image or video)
  const renderMedia = () => {
    const currentItem = items[currentIndex];
    const mediaUrl = currentItem.image || currentItem.video || currentItem.media;
    
    if (isVideo(mediaUrl)) {
      return (
        <video 
          src={mediaUrl} 
          alt={currentItem.title}
          controls
          className="carousel-media"
        >
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img 
          src={mediaUrl} 
          alt={currentItem.title}
          className="carousel-media"
        />
      );
    }
  };

  return (
    <div className="carousel">
      <div className="carousel-content">
        {renderMedia()}
        <div className="description">
          <div className="description-header">
            <h3>{items[currentIndex].title}</h3>
            <button onClick={toggleExpanded} className="expand-button">
              {isExpanded ? '− Show Less' : '+ Show More'}
            </button>
          </div>
          <div className={`description-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="prose">
              <ReactMarkdown>{items[currentIndex].description}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
      <button onClick={prevItem} className="carousel-button prev">←</button>
      <button onClick={nextItem} className="carousel-button next">→</button>
    </div>
  );
};

export default Carousel;

