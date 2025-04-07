import { useUIStore } from "@/stores/uiStore"
import { useEffect } from "react"
import { useNavigation } from "react-router"

function LoaderWrapper() {
  const navigation = useNavigation()
  const { isLoading, setIsLoading } = useUIStore()
  const loadingNav = navigation.state === "loading"

  useEffect(() => {
    setIsLoading(loadingNav)
  }, [setIsLoading, loadingNav])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-350 ease-linear ${
        isLoading ? "opacity-100 animate-loading" : "opacity-0"
      }`}
    >
      <div className="bg-blue-600 h-1 w-full"></div>
    </div>
  )
}

export default LoaderWrapper
