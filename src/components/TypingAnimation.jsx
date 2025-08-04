import React, { useState, useEffect } from 'react'

const TypingAnimation = ({ 
  text, 
  speed = 50, 
  onComplete = () => {}, 
  className = "",
  loop = false,
  pauseAfterComplete = 2000 
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete()
      
      if (loop) {
        setTimeout(() => {
          setDisplayedText('')
          setCurrentIndex(0)
          setIsComplete(false)
        }, pauseAfterComplete)
      }
    }
  }, [currentIndex, text, speed, onComplete, isComplete, loop, pauseAfterComplete])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  )
}

export default TypingAnimation