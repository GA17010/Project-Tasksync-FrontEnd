import { router } from "@/router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { DarkModeProvider } from "./hooks/useDarkMode"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  </StrictMode>
)
