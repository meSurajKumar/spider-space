import api from "./apiService"

export const sendQuery = async (payload) => {
  try {
    // Handle both string and object payloads for backward compatibility
    const requestPayload = typeof payload === 'string' 
      ? { query: payload } 
      : payload
    
    console.log('Request payload:', requestPayload)
      
    const response = await api.post("/api/v1/botresponse/get-response", requestPayload)
    console.log('Raw API response:', response)
    console.log('API response data:', response.data)
    
    return response.data
  } catch (error) {
    console.error('API error:', error)
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
