import api from "./apiService"

export const sendQuery = async (payload) => {
  try {
    const response = await api.post("/api/query", payload)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send query")
  }
}

export const clearSession = async () => {
  try {
    const response = await api.post("/api/clear")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to clear session")
  }
}

export const getChatHistory = async () => {
  try {
    const response = await api.get("/api/history")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get chat history")
  }
}
