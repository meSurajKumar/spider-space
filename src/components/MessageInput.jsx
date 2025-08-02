"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendQuery, selectLoading } from "../app/chatSlice"

const MessageInput = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !loading) {
      dispatch(sendQuery(input.trim()))
      setInput("")
    }
  }

  const handleKeyPress = (e) => {
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
    <div className="sticky bottom-0 bg-white/10 dark:bg-gray-900/10 border-t border-gray-200/30 dark:border-gray-700/30 p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your documents..."
              className="message-input min-h-[48px] max-h-32 overflow-y-auto"
              disabled={loading}
              rows={1}
            />
            {input.length > 0 && (
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">{input.length}/2000</div>
            )}
          </div>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-primary flex items-center justify-center min-w-[48px] h-12 rounded-full"
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

        <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span className="hidden sm:block">Powered by RAG AI</span>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
