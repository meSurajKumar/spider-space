import axios from "axios"

const getApiUrl = () => {
  try {
    return import.meta.env?.VITE_API_URL || "http://localhost:8000"
  } catch (error) {
    console.warn("Could not access environment variables, using default API URL")
    return "http://localhost:8000"
  }
}

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.baseURL + config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default api
