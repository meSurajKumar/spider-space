import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { sendQuery as apiSendQuery, clearSession as apiClearSession } from "../api/queryService"

export const sendQuery = createAsyncThunk(
  "chat/sendQuery",
  async (query, { rejectWithValue, getState, dispatch }) => {
    // Set the pending query in the state
    console.log('Setting pending query:', query)
    dispatch(setPendingQuery(query))
    
    // Add user message immediately to ensure it appears right away
    dispatch(addMessage({
      id: Date.now(),
      type: "user",
      content: query,
      timestamp: new Date().toISOString()
    }))
    
    try {
      const state = getState()
      const isWebsearchEnabled = state.websearch.isEnabled
      
      // Format chat history according to backend expectations
      // Backend expects an array of objects with User and AI properties
      const chatHistoryData = []
      
      // Create pairs of user and bot messages
      // We need to ensure we have valid pairs of user and bot messages
      const messages = [...state.chat.messages] // Create a copy to avoid modifying the original
      
      // Process messages in pairs
      for (let i = 0; i < messages.length - 1; i++) {
        const currentMsg = messages[i]
        const nextMsg = messages[i + 1]
        
        // Check if we have a user-bot pair
        if (currentMsg.type === "user" && nextMsg.type === "bot") {
          chatHistoryData.push({
            User: currentMsg.content,
            AI: nextMsg.content
          })
          i++ // Skip the next message as we've already processed it
        }
      }
      
      // Log the chat history for debugging
      console.log('Messages in state:', messages.map(m => ({ type: m.type, content: m.content })))
      
      console.log('Formatted chat history:', chatHistoryData)
      
      // Match the payload structure expected by the backend
      const payload = {
        question: query,
        websearch: isWebsearchEnabled,
        chatHistoryData
      }
      
      console.log('Sending payload to backend:', payload)
      const response = await apiSendQuery(payload)
      
      // Debug logging
      console.log('API Response:', response)
      console.log('Response structure:', JSON.stringify(response, null, 2))
      
      return { query, response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

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
  thinking: false,
  pendingQuery: "",
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
    setPendingQuery: (state, action) => {
      state.pendingQuery = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQuery.pending, (state) => {
        state.loading = true
        state.thinking = true
        state.error = null
        
        // User message is now added directly in the thunk action
        // No need to add it here again
        console.log('In pending case - current messages:', state.messages)
      })
      .addCase(sendQuery.fulfilled, (state, action) => {
        state.loading = false
        state.thinking = false
        const { query, response } = action.payload

        // Debug logging
        console.log('Action payload in fulfilled:', action.payload)
        console.log('Response in fulfilled:', response)

        // User message already added in pending state
        
        // Add bot response
        // Handle the specific response structure from the backend
        // The backend returns: { message, statusCode, apiCode, data: { answer } }
        let content = "No response received"
        
        console.log('Raw response structure:', JSON.stringify(response, null, 2))
        
        // Extract the answer based on the response structure
        if (response && response.data && typeof response.data === 'object' && response.data.answer) {
          // If response has data.answer structure (from backend)
          content = response.data.answer
          console.log('Extracted answer from response.data.answer:', content)
        } else if (response && response.answer) {
          // Direct answer property
          content = response.answer
          console.log('Extracted answer from response.answer:', content)
        } else if (response && response.message) {
          // Message property as fallback
          content = response.message
          console.log('Extracted answer from response.message:', content)
        } else if (typeof response === 'string') {
          // Handle case where response is a string
          content = response
          console.log('Response is a string:', content)
        } else {
          console.log('Could not extract answer from response:', response)
        }
        
        console.log('Final content to display:', content)
        
        // Check if a bot message with this content already exists to prevent duplicates
        const botMessageExists = state.messages.some(
          message => message.type === "bot" && message.content === content
        )
        
        console.log('Current messages before adding bot response:', state.messages)
        console.log('Bot message exists?', botMessageExists)
        
        if (!botMessageExists && content !== "No response received") {
          const newBotMessage = {
            id: Date.now() + 1,
            type: "bot",
            content: content,
            sources: (response.data && response.data.sources) || response.sources || [],
            images: (response.data && response.data.images) || response.images || [],
            imageUrl: (response.data && response.data.imageUrl) || response.imageUrl || null,
            otherUrl: (response.data && response.data.otherUrl) || response.otherUrl || null,
            timestamp: new Date().toISOString(),
          }
          
          console.log('Adding new bot message:', newBotMessage)
          state.messages.push(newBotMessage)
        } else {
          console.log('Skipping bot message addition because it already exists or has no content')
        }
      })
      .addCase(sendQuery.rejected, (state, action) => {
        state.loading = false
        state.thinking = false
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

export const { clearError, addMessage, setPendingQuery } = chatSlice.actions

export const selectMessages = (state) => state.chat.messages
export const selectLoading = (state) => state.chat.loading
export const selectError = (state) => state.chat.error
export const selectThinking = (state) => state.chat.thinking

export default chatSlice.reducer
