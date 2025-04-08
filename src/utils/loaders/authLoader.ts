import { useAuthStore } from "@/stores/authStore"
import { redirect } from "react-router"

export async function authLoader() {
  const { unauthorized, updateUnauthorized, checkAuth } =
    useAuthStore.getState()

  let isAuthenticated: boolean = false

  if (!unauthorized) {
    try {
      isAuthenticated = await checkAuth()
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
