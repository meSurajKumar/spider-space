import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

const initApp = () => {
  const rootElement = document.getElementById("root")

  if (!rootElement) {
    console.error("Root element not found. Creating one...")
    const newRoot = document.createElement("div")
    newRoot.id = "root"
    document.body.appendChild(newRoot)

    ReactDOM.createRoot(newRoot).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp)
} else {
  initApp()
}
