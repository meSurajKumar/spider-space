import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { sendQuery as apiSendQuery, clearSession as apiClearSession } from "../api/queryService"

export const sendQuery = createAsyncThunk("chat/sendQuery", async ({ query, websearch, chatHistoryData }, { rejectWithValue }) => {
  try {
    const response = await apiSendQuery({ 
      question: query, 
      websearch, 
      chatHistoryData 
    })
    return { query, response, websearch }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const clearSession = createAsyncThunk("chat/clearSession", async (_, { rejectWithValue }) => {
  try {
    await apiClearSession()
    return true
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  messages: [],
  loading: false,
  error: null,
  sessionId: null,
  websearchEnabled: false,
  hasUserSentMessage: false,
  streamingMessage: null,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    addMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      })
    },
    toggleWebsearch: (state) => {
      state.websearchEnabled = !state.websearchEnabled
    },
    setUserSentMessage: (state) => {
      state.hasUserSentMessage = true
    },
    setStreamingMessage: (state, action) => {
      state.streamingMessage = action.payload
    },
    clearStreamingMessage: (state) => {
      state.streamingMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQuery.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendQuery.fulfilled, (state, action) => {
        state.loading = false
        const { query, response, websearch } = action.payload
        state.hasUserSentMessage = true

        state.messages.push({
          id: Date.now(),
          type: "user",
          content: query,
          websearch,
          timestamp: new Date().toISOString(),
        })

        state.messages.push({
          id: Date.now() + 1,
          type: "bot",
          content: response.answer || response.message || "No response received",
          imageUrl: response.data?.imageUrl,
          otherUrl: response.data?.otherUrl,
          sources: response.sources || [],
          images: response.images || [],
          timestamp: new Date().toISOString(),
          streaming: true,
        })
      })
      .addCase(sendQuery.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(clearSession.pending, (state) => {
        state.loading = true
      })
      .addCase(clearSession.fulfilled, (state) => {
        state.loading = false
        state.messages = []
        state.error = null
        state.sessionId = null
        state.hasUserSentMessage = false
        state.streamingMessage = null
      })
      .addCase(clearSession.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { 
  clearError, 
  addMessage, 
  toggleWebsearch, 
  setUserSentMessage, 
  setStreamingMessage, 
  clearStreamingMessage 
} = chatSlice.actions

export const selectMessages = (state) => state.chat.messages
export const selectLoading = (state) => state.chat.loading
export const selectError = (state) => state.chat.error
export const selectWebsearchEnabled = (state) => state.chat.websearchEnabled
export const selectHasUserSentMessage = (state) => state.chat.hasUserSentMessage
export const selectStreamingMessage = (state) => state.chat.streamingMessage

export default chatSlice.reducer
