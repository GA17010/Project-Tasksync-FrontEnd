import { router } from "@/router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { DarkModeProvider } from "./hooks/useDarkMode"
import "./index.css"

const rootEl = document.getElementById("root")

if (!rootEl) throw new Error("Failed to find the root element")

createRoot(rootEl).render(
  <StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  </StrictMode>
)
