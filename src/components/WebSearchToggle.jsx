"use client"

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleWebsearch, selectIsWebsearchEnabled } from "../app/websearchSlice"

const WebSearchToggle = () => {
  const dispatch = useDispatch()
  const isEnabled = useSelector(selectIsWebsearchEnabled)

  const handleToggle = () => {
    dispatch(toggleWebsearch())
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/80 border border-gray-700/50 
                 hover:bg-gray-700/80 transition-all duration-200 shadow-md"
      aria-label="Toggle web search"
    >
      <div className="relative w-10 h-5 rounded-full bg-gray-700 transition-colors duration-200 ease-in-out">
        <div
          className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${isEnabled ? 'translate-x-5 bg-blue-500' : 'bg-gray-400'}`}
        />
      </div>
      <span className="text-sm text-white">Web Search</span>
    </button>
  )
}

export default WebSearchToggle