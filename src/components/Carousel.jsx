import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import "./Carousel.css"

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setIsExpanded(false); // Collapse when moving to next item
    setRevealedQuestions(0); // Reset questions when changing items
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setIsExpanded(false); // Collapse when moving to previous item
    setRevealedQuestions(0); // Reset questions when changing items
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setRevealedQuestions(1); // Show first question immediately when expanding
    } else {
      setRevealedQuestions(0); // Reset questions when collapsing
    }
  };

  const revealNextQuestion = () => {
    const currentItem = items[currentIndex];
    const questions = extractQuestions(currentItem.description);
    if (revealedQuestions < questions.length) {
      setRevealedQuestions(revealedQuestions + 1);
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
      <div className="carousel-content">
        {renderMedia()}
        <div className="description">
          <div className="description-header">
            <button onClick={toggleExpanded} className="expand-button">
              {isExpanded ? '− Hide Questions' : 'Investigation Questions'}
            </button>
          </div>
          <div className={`description-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded && (() => {
              const questions = extractQuestions(items[currentIndex].description);
              if (questions.length > 0) {
                return (
                  <div className="questions-section">
                    <div className="questions-header">
                      <h4>Questions to Consider</h4>
                    </div>
                    <div className="questions-list">
                      {questions.slice(0, revealedQuestions).map((question, index) => (
                        <div key={index} className="question-item">
                          <span className="question-number">{index + 1}.</span>
                          <span className="question-text">{question}</span>
                        </div>
                      ))}
                      {revealedQuestions < questions.length && (
                        <button 
                          onClick={revealNextQuestion} 
                          className="reveal-question-button"
                        >
                          Reveal Next Question ({revealedQuestions + 1} of {questions.length})
                        </button>
                      )}
                      {revealedQuestions > 0 && revealedQuestions === questions.length && (
                        <button 
                          onClick={nextItem} 
                          className="next-source-button"
                        >
                          Next Source →
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </div>
      <button onClick={prevItem} className="carousel-button prev">←</button>
      <button onClick={nextItem} className="carousel-button next">→</button>
    </div>
  );
};

export default Carousel;

