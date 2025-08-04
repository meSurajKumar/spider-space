import React from 'react'

const WebSearchToggle = ({ enabled, onToggle, disabled = false }) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
        transition-all duration-200 border
        ${enabled 
          ? 'bg-purple-600/20 border-purple-500/50 text-purple-300 hover:bg-purple-600/30' 
          : 'bg-gray-700/50 border-gray-600/50 text-gray-400 hover:bg-gray-700/70'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
      `}
      aria-label={`${enabled ? 'Disable' : 'Enable'} web search`}
      role="switch"
      aria-checked={enabled}
    >
      <div className={`
        w-4 h-4 rounded-full border-2 flex items-center justify-center
        ${enabled ? 'border-purple-400 bg-purple-500' : 'border-gray-500'}
      `}>
        {enabled && (
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span>Web Search</span>
      {enabled && (
        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      )}
    </button>
  )
}

export default WebSearchToggle