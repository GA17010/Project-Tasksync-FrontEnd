import LoaderWrapper from "@/components/LoaderWrapper"
import React from "react"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router"

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const lightToastStyle = {
    background: "#fff",
    color: "#000",
  }

  const darkToastStyle = {
    background: "#333",
    color: "#fff",
  }

  React.useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    setIsDarkMode(darkModeMediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    darkModeMediaQuery.addEventListener("change", handleChange)

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange)
    }
  }, [])
  return (
    <>
      <Toaster
        toastOptions={{
          style: isDarkMode ? darkToastStyle : lightToastStyle,
        }}
      />
      <LoaderWrapper />
      <Outlet />
    </>
  )
}

export default App
