"use client"

import React, { useEffect } from "react"
import { Provider, useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import store from "./app/store"
import { setTheme, selectIsDark } from "./app/themeSlice"
import ChatWindow from "./components/ChatWindow"
import MessageInput from "./components/MessageInput"
import ThemeToggle from "./components/ThemeToggle"
import SpaceScene from "./components/SpaceScene"
import SpaceBackgroundDemo from "./data/SpaceBackgroundDemo"
import { useChat } from "./hooks/useChatHooks"
import "./styles/globals.css"

const ErrorNotification = ({ error, onDismiss }) => {
  if (!error) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-20 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm">{error}</span>
        <button onClick={onDismiss} className="ml-3 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </motion.div>
  )
}

const AppContent = () => {
  const dispatch = useDispatch()
  const isDark = useSelector(selectIsDark)
  const { clearChat, error, dismissError, hasMessages, canClear } = useChat()

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme")
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

      dispatch(setTheme(shouldBeDark))
    } catch (err) {
      console.warn("Could not access localStorage or matchMedia, using default theme")
      dispatch(setTheme(false))
    }
  }, [dispatch])

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      clearChat()
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* <ThemeToggle /> */}
      <ErrorNotification error={error} onDismiss={dismissError} />

      <div className="relative z-10 flex flex-col flex-grow bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm">
        <header className="border-b border-gray-200/30 dark:border-gray-700/30 bg-white/10 dark:bg-gray-900/10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">RAG AI Chat</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Intelligent document search & analysis</p>
              </div>
            </div>

            {hasMessages && (
              <button onClick={handleClearChat} disabled={!canClear} className="btn-secondary text-sm">
                Clear Chat
              </button>
            )}
          </div>
        </header>

        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <SpaceBackgroundDemo>
        <AppContent />
      </SpaceBackgroundDemo>
    </Provider>
  )
}

export default App
