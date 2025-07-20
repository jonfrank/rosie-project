import React, { useState } from 'react'
import "./Carousel.css" // You may want to customize styles here

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-content">
        <img src={items[currentIndex].image} alt={items[currentIndex].title} />
        <div className="description">
          <h3>{items[currentIndex].title}</h3>
          <p>{items[currentIndex].description}</p>
        </div>
      </div>
      <button onClick={prevItem} className="carousel-button prev">←</button>
      <button onClick={nextItem} className="carousel-button next">→</button>
    </div>
  );
};

export default Carousel;

