"use client"

import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { sendQuery, clearSession, selectMessages, selectLoading, selectError, clearError } from "../app/chatSlice"

export const useSendQuery = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  const send = useCallback(
    (query) => {
      if (query.trim() && !loading) {
        dispatch(sendQuery(query.trim()))
      }
    },
    [dispatch, loading],
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

  return {
    sendQuery: send,
    clearChat: clear,
    dismissError,
    messages,
    hasMessages,
    error,
    loading: sendLoading || clearLoading || messagesLoading,
    canSend: !sendLoading && !clearLoading,
    canClear: hasMessages && !clearLoading,
  }
}
