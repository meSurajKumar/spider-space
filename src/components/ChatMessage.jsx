"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TypingAnimation from "./TypingAnimation"

const ChatMessage = ({ message, index }) => {
  const isUser = message.type === "user"
  const [isTypingComplete, setIsTypingComplete] = useState(isUser) // User messages don't need typing animation
  const [showImage, setShowImage] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false)

  // Handle fetching thumbnail for otherUrl if present
  useEffect(() => {
    if (message.otherUrl && !isUser && isTypingComplete) {
      setIsLoadingThumbnail(true)
      // In a real implementation, you would call an API to get a thumbnail
      // For this demo, we'll simulate a delay and then use the URL as is
      const timer = setTimeout(() => {
        setThumbnailUrl(message.otherUrl)
        setIsLoadingThumbnail(false)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [message.otherUrl, isUser, isTypingComplete])

  // Show image after typing is complete
  useEffect(() => {
    if (isTypingComplete && message.imageUrl) {
      setShowImage(true)
    }
  }, [isTypingComplete, message.imageUrl])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-bot"}`}>
        <div className="text-sm leading-relaxed">
          {isUser ? (
            message.content
          ) : (
            <TypingAnimation 
              text={message.content} 
              onComplete={() => setIsTypingComplete(true)}
            />
          )}
        </div>

        {/* Display image if available and typing is complete */}
        {message.imageUrl && showImage && (
          <div className="mt-3">
            <img
              src={message.imageUrl}
              alt="Response image"
              className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => window.open(message.imageUrl, "_blank")}
              loading="lazy"
            />
          </div>
        )}

        {/* Display images array if available */}
        {message.images && message.images.length > 0 && isTypingComplete && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {message.images.map((imageUrl, idx) => (
              <img
                key={idx}
                src={imageUrl || "/placeholder.svg"}
                alt={`Response image ${idx + 1}`}
                className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.open(imageUrl, "_blank")}
                loading="lazy"
              />
            ))}
          </div>
        )}

        {/* Display otherUrl thumbnail or link */}
        {message.otherUrl && isTypingComplete && (
          <div className="mt-3">
            {isLoadingThumbnail ? (
              <div className="h-20 bg-gray-700 rounded-md animate-pulse"></div>
            ) : thumbnailUrl ? (
              <a 
                href={message.otherUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={thumbnailUrl} 
                        alt="Link preview" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 truncate">
                      <div className="text-xs text-blue-400 truncate">{message.otherUrl}</div>
                      <div className="text-xs text-gray-400">Click to open link</div>
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <a 
                href={message.otherUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-400 hover:underline"
              >
                {message.otherUrl}
              </a>
            )}
          </div>
        )}

        {/* Display sources if available */}
        {message.sources && message.sources.length > 0 && isTypingComplete && (
          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sources:</div>
            <div className="space-y-1">
              {message.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 
                           dark:hover:text-blue-300 truncate hover:underline"
                >
                  📄 {source.title || source.filename || `Source ${idx + 1}`}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className={`text-xs mt-2 ${isUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage