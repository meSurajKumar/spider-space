import { createSlice } from "@reduxjs/toolkit"

const getStoredTheme = () => {
  try {
    return localStorage.getItem("theme")
  } catch (error) {
    console.warn("localStorage not available")
    return null
  }
}

const getSystemPreference = () => {
  try {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  } catch (error) {
    console.warn("matchMedia not available")
    return false
  }
}

const initialState = {
  isDark: (() => {
    const stored = getStoredTheme()
    if (stored) return stored === "dark"
    return getSystemPreference()
  })(),
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark
      try {
        localStorage.setItem("theme", state.isDark ? "dark" : "light")
      } catch (error) {
        console.warn("Could not save theme to localStorage")
      }

      try {
        if (state.isDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      } catch (error) {
        console.warn("Could not apply theme to document")
      }
    },
    setTheme: (state, action) => {
      state.isDark = action.payload
      try {
        localStorage.setItem("theme", state.isDark ? "dark" : "light")
      } catch (error) {
        console.warn("Could not save theme to localStorage")
      }

      try {
        if (state.isDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      } catch (error) {
        console.warn("Could not apply theme to document")
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const selectIsDark = (state) => state.theme.isDark
export default themeSlice.reducer
