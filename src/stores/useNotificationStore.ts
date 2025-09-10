import { NotificationResponse } from "@/types"
import { create } from "@/utils/locales/zustand"
import notificationService from "@/utils/services/notificationService"

interface NotificationState {
  Data_notification: NotificationResponse[]
  notificationError?: string
  COUNT_UNREAD_NOTIFICATIONS: number

  SET_IS_READ_ONE: (id: number) => void
  SET_IS_READ_ALL: () => void
  fetchNotification: () => Promise<boolean>
}

const dataNotification: NotificationResponse[] = [
  {
    id: 1,
    message: {
      prefix: "It's",
      main: "Christina Danny's",
      suffix: "birthday today.",
    },
    timestamps: {
      receivedAt: "3:00 AM",
      lastSeen: "2 min ago",
      isRead: false,
    },
    category: "reminder",
  },
  {
    id: 2,
    message: {
      prefix: "",
      main: "Aida Burg",
      suffix: "commented your post.",
    },
    timestamps: {
      receivedAt: "6:00 PM",
      lastSeen: "5 August",
      isRead: false,
    },
    category: "interaction",
  },
  {
    id: 3,
    message: {
      prefix: "Your Profile is Complete",
      main: "60%",
      suffix: "",
    },
    timestamps: {
      receivedAt: "2:45 PM",
      lastSeen: "7 hours ago",
      isRead: true,
    },
    category: "system",
  },
  {
    id: 4,
    message: {
      prefix: "",
      main: "Cristina Danny",
      suffix: "invited to join.",
    },
    timestamps: {
      receivedAt: "9:10 PM",
      lastSeen: "Daily scrum meeting time",
      isRead: false,
    },
    category: "invitation",
  },
]

export const useNotificationStore = create<NotificationState>()((set) => ({
  Data_notification: dataNotification,
  COUNT_UNREAD_NOTIFICATIONS: dataNotification.filter(
    (element) => !element.timestamps.isRead
  ).length,
  SET_IS_READ_ONE: (id: number) => {
    set((state) => {
      const updatedNotifications = state.Data_notification.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              timestamps: { ...notification.timestamps, isRead: true },
            }
          : notification
      )
      return {
        Data_notification: updatedNotifications,
        COUNT_UNREAD_NOTIFICATIONS: updatedNotifications.filter(
          (element) => !element.timestamps.isRead
        ).length,
      }
    })
  },
  SET_IS_READ_ALL: () => {
    set((state) => {
      const updatedNotifications = state.Data_notification.map(
        (notification) => ({
          ...notification,
          timestamps: { ...notification.timestamps, isRead: true },
        })
      )
      return {
        Data_notification: updatedNotifications,
        COUNT_UNREAD_NOTIFICATIONS: 0,
      }
    })
  },

  fetchNotification: async () => {
    try {
      const response = await notificationService.fetchNotification()

      set({
        Data_notification: response,
      })
      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ notificationError: "Connection error" })
      } else if (error instanceof Error) {
        set({
          notificationError:
            "Error in obtaining notifications, please try again.",
        })
      } else {
        set({ notificationError: "An unknown error occurred." })
      }
      return false
    }
  },
}))
