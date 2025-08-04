import React, { useState, useEffect } from 'react'
import TypingAnimation from './TypingAnimation'

const StreamingMessage = ({ message, onStreamComplete }) => {
  const [showImage, setShowImage] = useState(false)
  const [showOtherUrl, setShowOtherUrl] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState(null)

  const handleTextComplete = () => {
    if (message.imageUrl) {
      setShowImage(true)
    }
    if (message.otherUrl) {
      setShowOtherUrl(true)
      // Try to fetch thumbnail or metadata
      fetchUrlMetadata(message.otherUrl)
    }
    onStreamComplete?.()
  }

  const fetchUrlMetadata = async (url) => {
    try {
      // This would typically be handled by your backend
      // For now, we'll just show a link preview
      setThumbnailUrl(null)
    } catch (error) {
      console.warn('Could not fetch URL metadata:', error)
    }
  }

  return (
    <div className="chat-bubble chat-bubble-bot">
      <div className="text-sm leading-relaxed">
        <TypingAnimation 
          text={message.content} 
          speed={30}
          onComplete={handleTextComplete}
        />
      </div>

      {showImage && message.imageUrl && (
        <div className="mt-3">
          <img
            src={message.imageUrl}
            alt="Response image"
            className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-80 transition-opacity"
            loading="lazy"
            style={{ maxHeight: '300px', width: 'auto' }}
            onClick={() => window.open(message.imageUrl, "_blank")}
          />
        </div>
      )}

      {showOtherUrl && message.otherUrl && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Related Link:</div>
          {thumbnailUrl ? (
            <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
              <img 
                src={thumbnailUrl} 
                alt="Link preview" 
                className="w-12 h-12 object-cover rounded"
                loading="lazy"
              />
              <a
                href={message.otherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:underline flex-1"
              >
                {message.otherUrl}
              </a>
            </div>
          ) : (
            <a
              href={message.otherUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 
                       dark:hover:text-blue-300 hover:underline break-all"
            >
              🔗 {message.otherUrl}
            </a>
          )}
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

      <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  )
}

export default StreamingMessage