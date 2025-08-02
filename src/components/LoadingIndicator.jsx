import React from "react"

const LoadingIndicator = ({ type = "dots", size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  if (type === "spinner") {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`${sizeClasses[size]} border-2 border-blue-500 border-t-transparent rounded-full animate-spin`}
        ></div>
      </div>
    )
  }

  if (type === "skeleton") {
    return (
      <div className="animate-pulse">
        <div className="chat-bubble chat-bubble-bot">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-bubble chat-bubble-bot">
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}

export default LoadingIndicator
