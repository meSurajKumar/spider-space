import { configureStore } from "@reduxjs/toolkit"
import chatReducer from "./chatSlice"
import themeReducer from "./themeSlice"
import websearchReducer from "./websearchSlice"

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    theme: themeReducer,
    websearch: websearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export default store
