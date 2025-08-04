"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendQuery, selectLoading } from "../app/chatSlice"
import { selectIsWebsearchEnabled } from "../app/websearchSlice"

const MessageInput = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const isWebsearchEnabled = useSelector(selectIsWebsearchEnabled)
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !loading) {
      // The query parameter is passed to the sendQuery thunk
      // The thunk will handle adding websearch and chat history
      const trimmedInput = input.trim()
      console.log('Submitting query:', trimmedInput)
      
      // Dispatch the query
      dispatch(sendQuery(trimmedInput))
      
      // Clear the input field
      setInput("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  return (
    <div className="border-t border-gray-700/50 backdrop-blur-md p-4 sm:p-6 z-20 w-full" style={{ backgroundColor: 'hsla(var(--background), 0.95)' }}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-2 sm:space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your documents..."
              className="w-full px-5 py-3 border border-gray-600/70 rounded-2xl 
                         bg-gray-800/95 text-white backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder-gray-400 resize-none shadow-lg min-h-[52px] max-h-32 overflow-y-auto text-sm sm:text-base
                         transition-all duration-200 hover:border-gray-500/80"
              disabled={loading}
              rows={1}
              tabIndex={0}
              aria-label="Message input"
            />
            {input.length > 0 && (
              <div className="absolute bottom-2 right-3 text-xs text-gray-500">{input.length}/2000</div>
            )}
          </div>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-2xl 
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg hover:shadow-xl flex items-center justify-center min-w-[52px] h-[52px] shrink-0
                       border border-blue-500/50 hover:border-blue-400/70 hover:scale-105"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span className="hidden md:block">Powered by RAG AI</span>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
