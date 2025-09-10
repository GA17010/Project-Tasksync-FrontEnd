import { createContext, useEffect, useState, use, useMemo } from "react"
import { ReactNode } from "react"

interface DarkModeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
)

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode")
    return storedDarkMode === "true" || false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "false")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  const value = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode])

  return <DarkModeContext value={value}>{children}</DarkModeContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
  const context = use(DarkModeContext)
  if (!context)
    throw new Error("useDarkMode must be used within DarkModeProvider")
  return context
}
