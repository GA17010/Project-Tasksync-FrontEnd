import LoaderWrapper from "@/components/LoaderWrapper"
import { Outlet } from "react-router"

function App() {
  return (
    <>
      <LoaderWrapper />
      <Outlet />
    </>
  )
}

export default App
