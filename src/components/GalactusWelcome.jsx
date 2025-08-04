import React from 'react'
import TypingAnimation from './TypingAnimation'

const GalactusWelcome = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="chat-bubble chat-bubble-bot">
        <div className="text-sm leading-relaxed mb-2">
          <TypingAnimation 
            text="Hello, I am Galactus-1.0" 
            speed={80}
            loop={true}
            pauseAfterComplete={3000}
            className="font-semibold text-purple-300"
          />
        </div>
        <div className="text-xs text-gray-400">
          <TypingAnimation 
            text="Enable Web Search to connect to the world" 
            speed={60}
            loop={true}
            pauseAfterComplete={4000}
          />
        </div>
      </div>
    </div>
  )
}

export default GalactusWelcome