import React from 'react'

const ThinkingIndicator = () => {
  return (
    <div className="w-full bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 mb-4 backdrop-blur-sm">
      <div className="flex items-center justify-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
        <span className="text-purple-300 text-sm font-medium ml-3">
          Galactus is thinking...
        </span>
      </div>
      <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default ThinkingIndicator