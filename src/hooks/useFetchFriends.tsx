import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useFriendStore } from "@/stores/friendStore"

export const useFetchFriends = () => {
  const { listFriends, fetchFriends } = useFriendStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (listFriends) return
    if (!localStorage.getItem("token")) return

    const loadFriends = async () => {
      const res = await fetchFriends()
      if (!res) {
        localStorage.removeItem("token")
        navigate("/login")
      }
    }

    loadFriends()
  }, [listFriends, fetchFriends, navigate])

  return null
}
