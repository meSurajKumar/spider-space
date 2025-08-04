import { createSlice } from "@reduxjs/toolkit"

const getStoredWebsearchState = () => {
  try {
    return localStorage.getItem("websearch")
  } catch (error) {
    console.warn("localStorage not available")
    return null
  }
}

const initialState = {
  isEnabled: (() => {
    const stored = getStoredWebsearchState()
    if (stored) return stored === "true"
    return false // Default to disabled
  })(),
}

const websearchSlice = createSlice({
  name: "websearch",
  initialState,
  reducers: {
    toggleWebsearch: (state) => {
      state.isEnabled = !state.isEnabled
      try {
        localStorage.setItem("websearch", state.isEnabled ? "true" : "false")
      } catch (error) {
        console.warn("Could not save websearch state to localStorage")
      }
    },
    setWebsearch: (state, action) => {
      state.isEnabled = action.payload
      try {
        localStorage.setItem("websearch", state.isEnabled ? "true" : "false")
      } catch (error) {
        console.warn("Could not save websearch state to localStorage")
      }
    },
  },
})

export const { toggleWebsearch, setWebsearch } = websearchSlice.actions
export const selectIsWebsearchEnabled = (state) => state.websearch.isEnabled
export default websearchSlice.reducer