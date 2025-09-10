import { useAuthStore } from "@/stores/authStore"
import React from "react"
import { useNavigate } from "react-router"

export const useAuthCheck = () => {
  const { user, fetchMe } = useAuthStore()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user) return
    if (!localStorage.getItem("token")) return

    const checkAuth = async () => {
      const res = await fetchMe()
      if (!res) {
        localStorage.removeItem("token")
        void navigate("/login")
      }
    }

    void checkAuth().catch((err: unknown) => {
      console.error("Error checking auth:", err)
      localStorage.removeItem("token")
      void navigate("/login")
    })
  }, [user, fetchMe, navigate])

  return null
}
