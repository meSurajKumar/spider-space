"use client"

import React from "react"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { selectMessages, selectLoading, selectHasUserSentMessage } from "../app/chatSlice"
import StreamingMessage from "./StreamingMessage"
import GalactusWelcome from "./GalactusWelcome"
import ThinkingIndicator from "./ThinkingIndicator"

const ChatMessage = ({ message, index }) => {
  const isUser = message.type === "user"

  // If it's a bot message with streaming enabled, use StreamingMessage component
  if (!isUser && message.streaming) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex justify-start mb-4"
      >
        <StreamingMessage message={message} />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-bot"}`}>
        <div className="text-sm leading-relaxed">{message.content}</div>

        {message.websearch && isUser && (
          <div className="mt-1 text-xs text-blue-200 opacity-75">
            🌐 Web search enabled
          </div>
        )}

        {message.images && message.images.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {message.images.map((imageUrl, idx) => (
              <img
                key={idx}
                src={imageUrl || "/placeholder.svg"}
                alt={`Response image ${idx + 1}`}
                className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.open(imageUrl, "_blank")}
              />
            ))}
          </div>
        )}

        {message.sources && message.sources.length > 0 && (
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

const ChatWindow = () => {
  const messages = useSelector(selectMessages)
  const loading = useSelector(selectLoading)
  const hasUserSentMessage = useSelector(selectHasUserSentMessage)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-hidden bg-transparent">
      <div className="h-full overflow-y-auto chat-scroll px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {!hasUserSentMessage && <GalactusWelcome />}
          
          {messages.length > 0 && (
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} />
              ))}
            </AnimatePresence>
          )}

          {loading && (
            <ThinkingIndicator />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
