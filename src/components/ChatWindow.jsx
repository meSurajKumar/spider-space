"use client"

import React from "react"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { selectMessages, selectLoading, selectThinking } from "../app/chatSlice"
import LoadingIndicator from "./LoadingIndicator"
import ChatMessage from "./ChatMessage"
import WelcomeMessage from "./WelcomeMessage"

const ChatWindow = () => {
  const messages = useSelector(selectMessages)
  const loading = useSelector(selectLoading)
  const thinking = useSelector(selectThinking)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, loading, thinking])

  return (
    <div className="h-full bg-transparent">
      <div 
        ref={messagesContainerRef}
        className="h-full chat-scroll px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="max-w-4xl mx-auto space-y-4 pb-4">
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} />
              ))}
            </AnimatePresence>
          )}

          {thinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-4 w-full"
            >
              <div className="chat-bubble chat-bubble-bot w-full">
                <div className="text-sm leading-relaxed flex items-center space-x-2">
                  <span>thinking</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
