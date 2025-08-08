import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { X } from 'lucide-react'
import "./Carousel.css"

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('question')

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    setIsExpanded(false)
    setCurrentQuestionIndex(0)
    setCurrentPhase('question')
  }

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    setIsExpanded(false)
    setCurrentQuestionIndex(0)
    setCurrentPhase('question')
  }

  const toggleExpanded = () => {
    if (!isExpanded) {
      setIsAnimating(true)
      setCurrentQuestionIndex(0)
      setCurrentPhase('question')
      requestAnimationFrame(() => {
        setIsExpanded(true)
      })
      setTimeout(() => setIsAnimating(false), 800)
    } else {
      setIsExpanded(false)
      setIsAnimating(false)
      setCurrentQuestionIndex(0)
      setCurrentPhase('question')
    }
  }

  const handleNextStep = () => {
    const currentItem = items[currentIndex]
    const { questions, explanations, summary } = extractStructuredContent(currentItem.description)
    
    if (currentPhase === 'question') {
      if (explanations[currentQuestionIndex]) {
        setCurrentPhase('explanation')
      } else {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setCurrentPhase('question')
        } else {
          if (summary) {
            setCurrentPhase('summary')
          } else {
            nextItem()
          }
        }
      }
    } else if (currentPhase === 'explanation') {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setCurrentPhase('question')
      } else {
        if (summary) {
          setCurrentPhase('summary')
        } else {
          nextItem()
        }
      }
    } else if (currentPhase === 'summary') {
      nextItem()
    }
  }

  const isNumberedQuestion = (line) => {
    const trimmed = line.trim()
    if (!trimmed.includes('?')) return false
    
    const parts = trimmed.split('.')
    if (parts.length >= 2) {
      const firstPart = parts[0].trim()
      return !isNaN(firstPart) && firstPart.length > 0
    }
    return false
  }

  const extractQuestionText = (line) => {
    if (line.startsWith('-') || line.startsWith('*')) {
      return line.substring(1).trim()
    } else if (isNumberedQuestion(line)) {
      const dotIndex = line.indexOf('.')
      return line.substring(dotIndex + 1).trim()
    }
    return line
  }

  const extractStructuredContent = (description) => {
    if (!description) return { questions: [], explanations: {}, summary: '' }
    
    const lines = description.split('\n')
    const questionSectionIndex = lines.findIndex(line => 
      line.toLowerCase().includes('## questions') || 
      line.toLowerCase().includes('# questions')
    )
    
    if (questionSectionIndex === -1) return { questions: [], explanations: {}, summary: '' }
    
    const contentLines = lines.slice(questionSectionIndex + 1)
    const questions = []
    const explanations = {}
    let summary = ''
    let currentQuestionIndex = -1
    let inSummary = false
    let currentExplanation = []
    
    for (let i = 0; i < contentLines.length; i++) {
      const line = contentLines[i].trim()
      
      if (line.toLowerCase().includes('## summary') || line.toLowerCase().includes('# summary')) {
        inSummary = true
        if (currentQuestionIndex >= 0 && currentExplanation.length > 0) {
          explanations[currentQuestionIndex] = currentExplanation.join('\n').trim()
          currentExplanation = []
        }
        continue
      }
      
      if (inSummary) {
        if (line) {
          summary += (summary ? '\n' : '') + contentLines[i]
        }
      } else {
        const isQuestion = (line.startsWith('-') || line.startsWith('*') || isNumberedQuestion(line)) && line.includes('?')
        if (isQuestion) {
          if (currentQuestionIndex >= 0 && currentExplanation.length > 0) {
            explanations[currentQuestionIndex] = currentExplanation.join('\n').trim()
          }
          
          const questionText = extractQuestionText(line)
          questions.push(questionText)
          currentQuestionIndex = questions.length - 1
          currentExplanation = []
        } else if (currentQuestionIndex >= 0 && line && !line.startsWith('-') && !line.startsWith('*') && !isNumberedQuestion(line)) {
          currentExplanation.push(contentLines[i])
        }
      }
    }
    
    if (currentQuestionIndex >= 0 && currentExplanation.length > 0) {
      explanations[currentQuestionIndex] = currentExplanation.join('\n').trim()
    }
    
    return { questions, explanations, summary: summary.trim() }
  }

  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.mov', '.webm', '.ogg', '.avi', '.mkv']
    return videoExtensions.some(ext => url.toLowerCase().includes(ext))
  }

  const renderMedia = () => {
    const currentItem = items[currentIndex]
    const mediaUrl = currentItem.image || currentItem.video || currentItem.media
    
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
      )
    } else {
      return (
        <img 
          src={mediaUrl} 
          alt={currentItem.title}
          className="carousel-media"
        />
      )
    }
  }

  const getButtonText = () => {
    const currentItem = items[currentIndex]
    const { questions, explanations, summary } = extractStructuredContent(currentItem.description)
    
    if (currentPhase === 'question' && explanations[currentQuestionIndex]) return 'Reveal Answer'
    if (currentPhase === 'question' && !explanations[currentQuestionIndex] && currentQuestionIndex < questions.length - 1) return `Next Question (${currentQuestionIndex + 2} of ${questions.length})`
    if (currentPhase === 'question' && !explanations[currentQuestionIndex] && currentQuestionIndex === questions.length - 1 && summary) return 'View Summary'
    if (currentPhase === 'question' && !explanations[currentQuestionIndex] && currentQuestionIndex === questions.length - 1 && !summary) return 'Next Source'
    if (currentPhase === 'explanation' && currentQuestionIndex < questions.length - 1) return `Next Question (${currentQuestionIndex + 2} of ${questions.length})`
    if (currentPhase === 'explanation' && currentQuestionIndex === questions.length - 1 && summary) return 'View Summary'
    if (currentPhase === 'explanation' && currentQuestionIndex === questions.length - 1 && !summary) return 'Next Source'
    if (currentPhase === 'summary') return 'Next Source'
    return 'Continue'
  }

  return (
    <div className="carousel">
      <div className={`carousel-container ${isExpanded ? 'expanded' : 'collapsed'} ${isAnimating ? 'animating' : ''}`}>
        <div className="media-section">
          {renderMedia()}
          {!isExpanded && (
            <div className="button-section">
              <div className="flex gap-3 justify-center items-center flex-wrap">
                <button 
                  onClick={prevItem} 
                  disabled={currentIndex === 0}
                  className="previous-object-button bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Previous Object
                </button>
                <button onClick={toggleExpanded} className="expand-button bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                  Investigation Questions
                </button>
                <button 
                  onClick={nextItem}
                  disabled={currentIndex === items.length - 1}
                  className="skip-object-button bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Skip Object
                </button>
              </div>
            </div>
          )}
        </div>
        
        {isExpanded && (
          <div className="questions-panel">
            <button onClick={toggleExpanded} className="close-button">
              <X size={16} />
            </button>
            {(() => {
              const { questions, explanations, summary } = extractStructuredContent(items[currentIndex].description)
              if (questions.length > 0 && isExpanded) {
                return (
                  <div className="questions-section">
                    <div className="questions-list">
                      {currentPhase === 'question' && (
                        <div className="question-item">
                          <span className="question-number">{currentQuestionIndex + 1}.</span>
                          <span className="question-text">{questions[currentQuestionIndex]}</span>
                        </div>
                      )}
                      
                      {currentPhase === 'explanation' && explanations[currentQuestionIndex] && (
                        <div className="explanation-item">
                          <div className="explanation-header">
                            <span className="explanation-label">Answer:</span>
                          </div>
                          <div className="explanation-content">
                            <ReactMarkdown>{explanations[currentQuestionIndex]}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                      
                      {currentPhase === 'summary' && summary && (
                        <div className="summary-item">
                          <div className="summary-header">
                            <span className="summary-label">Summary</span>
                          </div>
                          <div className="summary-content">
                            <ReactMarkdown>{summary}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                      
                      <button 
                        onClick={handleNextStep} 
                        className="next-step-button reveal-question-button"
                      >
                        {getButtonText()}
                      </button>
                    </div>
                  </div>
                )
              }
              return null
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Carousel
