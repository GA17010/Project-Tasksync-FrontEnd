// src/hooks/useDarkMode.tsx
import { createContext, useEffect, useContext, useState } from "react"
import { ReactNode } from "react"

interface DarkModeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
}

const initialDarkModeContext: DarkModeContextType = {
  darkMode: false,
  toggleDarkMode: () => {},
}

const DarkModeContext = createContext(initialDarkModeContext)


export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Comprueba el almacenamiento local al cargar la página
    const storedDarkMode = localStorage.getItem("darkMode")
    return storedDarkMode === "true" || false
  })

  useEffect(() => {
    // Aplica la clase 'dark' al elemento html según el estado
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "false")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => useContext(DarkModeContext)