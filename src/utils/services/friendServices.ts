import { FriendResponse, FriendRequest } from "@/types"
import apiService from "@/utils/services/apiServices"

const projectService = {
  fetchFriends: async (): Promise<FriendResponse[]> => {
    const response = await apiService.get<FriendResponse[]>("/api/friends/list")
    sessionStorage.setItem("listFriends", JSON.stringify(response))
    return response
  },

  sendRequest: async (email: FriendRequest): Promise<FriendResponse> => {
    const response = await apiService.post<FriendResponse>(
      "/api/friends/send",
      email
    )
    return response
  }
}

export default projectService
