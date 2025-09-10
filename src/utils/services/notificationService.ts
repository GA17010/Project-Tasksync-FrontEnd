import { ApiRequestBody, NotificationResponse } from "@/types"
import apiService from "@/utils/services/apiServices"

const notificationService = {
  createNotification: async (
    notification: ApiRequestBody
  ): Promise<NotificationResponse> => {
    const response = await apiService.post<NotificationResponse>(
      "/api/notification",
      notification
    )
    return response
  },
  fetchNotification: async (): Promise<NotificationResponse[]> => {
    const response = await apiService.get<NotificationResponse[]>(
      "/api/notification"
    )
    return response
  },

  //   deleteProject: async (projectId: string): Promise<void> => {
  //     await apiService.delete(`/api/notification/${projectId}`)
  //   },
}

export default notificationService
