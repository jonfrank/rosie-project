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

  return (
    <div className="carousel">
      <div className="carousel-content">
        <img src={items[currentIndex].image} alt={items[currentIndex].title} />
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

