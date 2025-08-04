import React, { useState, useEffect, useRef } from "react"

const TypingAnimation = ({ text, speed = 30, onComplete = () => {} }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (currentIndex < text.length) {
      intervalRef.current = setInterval(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
    } else {
      clearInterval(intervalRef.current)
      onComplete()
    }

    return () => clearInterval(intervalRef.current)
  }, [currentIndex, text, speed, onComplete])

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  return <span>{displayedText}</span>
}

export default TypingAnimation