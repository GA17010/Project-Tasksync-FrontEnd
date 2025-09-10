import { useAuthStore } from "@/stores/authStore"
import { redirect } from "react-router"

export function authLoader() {
  const { unauthorized, updateUnauthorized } = //, checkAuth } =
    useAuthStore.getState()

  let isAuthenticated = false

  if (!unauthorized) {
    try {
      // isAuthenticated = await checkAuth() //Functionality disabled, needs to be implemented in the backend
      const token = localStorage.getItem("token")
      if(token){
        isAuthenticated = true
      } else {
        isAuthenticated = false
      }

      updateUnauthorized(!isAuthenticated)
    } catch {
      updateUnauthorized(true)
    }
  } else {
    isAuthenticated = !unauthorized
  }

  if (!isAuthenticated) {
    return redirect("/login")
  }

  return null
}
