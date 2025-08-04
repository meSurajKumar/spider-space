"use client"

import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { 
  sendQuery, 
  clearSession, 
  selectMessages, 
  selectLoading, 
  selectError, 
  clearError,
  selectWebsearchEnabled,
  selectHasUserSentMessage,
  toggleWebsearch,
  setUserSentMessage
} from "../app/chatSlice"

export const useSendQuery = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const websearchEnabled = useSelector(selectWebsearchEnabled)
  const messages = useSelector(selectMessages)

  const send = useCallback(
    (query) => {
      if (query.trim() && !loading) {
        // Build chat history data
        const chatHistoryData = messages
          .filter(msg => msg.type === 'user' || msg.type === 'bot')
          .reduce((acc, msg, index, arr) => {
            if (msg.type === 'user') {
              const nextMsg = arr[index + 1]
              if (nextMsg && nextMsg.type === 'bot') {
                acc.push({
                  User: msg.content,
                  AI: nextMsg.content
                })
              }
            }
            return acc
          }, [])

        dispatch(sendQuery({ 
          query: query.trim(), 
          websearch: websearchEnabled,
          chatHistoryData 
        }))
        dispatch(setUserSentMessage())
      }
    },
    [dispatch, loading, websearchEnabled, messages],
  )

  return { send, loading }
}

export const useClearChat = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  const clear = useCallback(() => {
    if (!loading) {
      dispatch(clearSession())
    }
  }, [dispatch, loading])

  return { clear, loading }
}

export const useMessages = () => {
  const messages = useSelector(selectMessages)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const dispatch = useDispatch()

  const dismissError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    messages,
    loading,
    error,
    dismissError,
    hasMessages: messages.length > 0,
  }
}

export const useChat = () => {
  const { send, loading: sendLoading } = useSendQuery()
  const { clear, loading: clearLoading } = useClearChat()
  const { messages, loading: messagesLoading, error, dismissError, hasMessages } = useMessages()
  const websearchEnabled = useSelector(selectWebsearchEnabled)
  const hasUserSentMessage = useSelector(selectHasUserSentMessage)
  const dispatch = useDispatch()

  const toggleWebSearch = useCallback(() => {
    dispatch(toggleWebsearch())
  }, [dispatch])

  return {
    sendQuery: send,
    clearChat: clear,
    dismissError,
    toggleWebSearch,
    messages,
    hasMessages,
    hasUserSentMessage,
    websearchEnabled,
    error,
    loading: sendLoading || clearLoading || messagesLoading,
    canSend: !sendLoading && !clearLoading,
    canClear: hasMessages && !clearLoading,
  }
}
