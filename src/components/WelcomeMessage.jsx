import React, { useState } from "react"
import { motion } from "framer-motion"
import TypingAnimation from "./TypingAnimation"

const WelcomeMessage = () => {
  const [firstMessageComplete, setFirstMessageComplete] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-4 mb-8"
    >
      <div className="chat-bubble chat-bubble-bot">
        <div className="text-sm leading-relaxed">
          <TypingAnimation 
            text="Hello, I am Galactus-1.0" 
            onComplete={() => setFirstMessageComplete(true)}
          />
        </div>
      </div>

      {firstMessageComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="chat-bubble chat-bubble-bot"
        >
          <div className="text-sm leading-relaxed">
            <TypingAnimation text="Enable Web Search to connect to the world" />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default WelcomeMessage