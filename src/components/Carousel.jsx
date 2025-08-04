import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import "./Carousel.css"

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setIsExpanded(false); // Collapse when moving to next item
    setCurrentQuestionIndex(0); // Reset questions when changing items
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setIsExpanded(false); // Collapse when moving to previous item
    setCurrentQuestionIndex(0); // Reset questions when changing items
  };

  const toggleExpanded = () => {
    if (!isExpanded) {
      // Expanding: Start animation, then set expanded state
      setIsAnimating(true);
      setCurrentQuestionIndex(0);
      // Small delay to let the browser capture the current state
      requestAnimationFrame(() => {
        setIsExpanded(true);
      });
      // Reset animation state after animation completes
      setTimeout(() => setIsAnimating(false), 800);
    } else {
      // Collapsing: Immediately set states
      setIsExpanded(false);
      setIsAnimating(false);
      setCurrentQuestionIndex(0);
    }
  };

  const revealNextQuestion = () => {
    const currentItem = items[currentIndex];
    const questions = extractQuestions(currentItem.description);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Extract questions from markdown content
  const extractQuestions = (description) => {
    if (!description) return [];
    
    const lines = description.split('\n');
    const questionSectionIndex = lines.findIndex(line => 
      line.toLowerCase().includes('## questions') || 
      line.toLowerCase().includes('# questions')
    );
    
    if (questionSectionIndex === -1) return [];
    
    const questionsSection = lines.slice(questionSectionIndex + 1);
    const questions = [];
    
    for (const line of questionsSection) {
      const trimmed = line.trim();
      // Match numbered questions (1., 2., etc.) or bullet points with question marks
      if (trimmed.match(/^\d+\.|^-|^\*/) && trimmed.includes('?')) {
        questions.push(trimmed.replace(/^\d+\.\s*|^[-*]\s*/, ''));
      }
    }
    
    return questions;
  };

  // Split description into main content and questions
  const getMainDescription = (description) => {
    if (!description) return '';
    
    const lines = description.split('\n');
    const questionSectionIndex = lines.findIndex(line => 
      line.toLowerCase().includes('## questions') || 
      line.toLowerCase().includes('# questions')
    );
    
    if (questionSectionIndex === -1) return description;
    
    return lines.slice(0, questionSectionIndex).join('\n');
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
      <div className={`carousel-container ${isExpanded ? 'expanded' : 'collapsed'} ${isAnimating ? 'animating' : ''}`}>
        <div className="media-section">
          {renderMedia()}
          {!isExpanded && (
            <div className="button-section">
              <button onClick={toggleExpanded} className="expand-button bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                Investigation Questions
              </button>
            </div>
          )}
        </div>
        
        {isExpanded && (
          <div className="questions-panel">
            <div className="questions-header">
              <button onClick={toggleExpanded} className="close-button">
                × Close Questions
              </button>
            </div>
            {(() => {
              const questions = extractQuestions(items[currentIndex].description);
              if (questions.length > 0 && isExpanded) {
                const currentQuestion = questions[currentQuestionIndex];
                return (
                  <div className="questions-section">
                    <div className="questions-list">
                      <div className="question-item">
                        <span className="question-number">{currentQuestionIndex + 1}.</span>
                        <span className="question-text">{currentQuestion}</span>
                      </div>
                      {currentQuestionIndex < questions.length - 1 && (
                        <button 
                          onClick={revealNextQuestion} 
                          className="reveal-question-button"
                        >
                          Reveal Next Question ({currentQuestionIndex + 2} of {questions.length})
                        </button>
                      )}
                      {currentQuestionIndex === questions.length - 1 && (
                        <button 
                          onClick={nextItem} 
                          className="next-source-button"
                        >
                          Next Source &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}
      </div>
      <button onClick={prevItem} className="carousel-button prev">&larr;</button>
      <button onClick={nextItem} className="carousel-button next">&rarr;</button>
    </div>
  );
};

export default Carousel;

