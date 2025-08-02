import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { sendQuery as apiSendQuery, clearSession as apiClearSession } from "../api/queryService"

export const sendQuery = createAsyncThunk("chat/sendQuery", async (query, { rejectWithValue }) => {
  try {
    const response = await apiSendQuery(query)
    return { query, response }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQuery.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendQuery.fulfilled, (state, action) => {
        state.loading = false
        const { query, response } = action.payload

        state.messages.push({
          id: Date.now(),
          type: "user",
          content: query,
          timestamp: new Date().toISOString(),
        })

        state.messages.push({
          id: Date.now() + 1,
          type: "bot",
          content: response.answer || response.message || "No response received",
          sources: response.sources || [],
          images: response.images || [],
          timestamp: new Date().toISOString(),
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
      })
      .addCase(clearSession.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, addMessage } = chatSlice.actions

export const selectMessages = (state) => state.chat.messages
export const selectLoading = (state) => state.chat.loading
export const selectError = (state) => state.chat.error

export default chatSlice.reducer
