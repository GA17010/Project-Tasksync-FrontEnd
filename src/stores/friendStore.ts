import { FriendRequest, FriendResponse, TaskResponse } from "@/types"
import friendService from "@/utils/services/friendServices"
import { create } from "zustand"

type FriendState = {
  listFriends: FriendResponse[] | null
  showAssignMenu: boolean
  showRequestFriendModal: boolean
  friendError: string | null
  sendFriendSuccess: string | null
  taskToAssign: TaskResponse | null
  projectId: string | null

  closeAssignMenu: () => void
  closeRequestFriendModal: () => void
  setShowRequestFriendModal: () => void
  setTaskAndToggleMenu: (task: TaskResponse) => void
  setProjectAndToggleMenu: (projectId: string) => void
  handleAssign: () => void
  fetchFriends: () => Promise<boolean>
  sendRequest: (email: FriendRequest) => Promise<boolean>
}

export const useFriendStore = create<FriendState>((set) => ({
  listFriends: null,
  showAssignMenu: false,
  showRequestFriendModal: false,
  friendError: null,
  sendFriendSuccess: null,
  taskToAssign: null,
  projectId: null,

  closeAssignMenu() {
    set({ showAssignMenu: false })
  },
  closeRequestFriendModal() {
    set({ showRequestFriendModal: false })
  },

  setShowRequestFriendModal: () => {
    set((state) => ({ showRequestFriendModal: !state.showRequestFriendModal }))
  },

  setTaskAndToggleMenu: (task) => {
    set({ taskToAssign: task })

    set((state) => ({ showAssignMenu: !state.showAssignMenu }))
  },

  setProjectAndToggleMenu: (projectId: string) => {
    set({ projectId: projectId })
    set((state) => ({ showAssignMenu: !state.showAssignMenu }))
  },

  handleAssign: () => {
    set(() => ({
      showAssignMenu: false,
      taskToAssign: null,
      projectId: null,
    }))
  },

  fetchFriends: async () => {
    try {
      const response = await friendService.fetchFriends()

      set({
        listFriends: response,
      })
      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ friendError: "Connection error" })
      } else if (error instanceof Error) {
        set({
          friendError:
            error.message || "Error in obtaining friends, please try again.",
        })
      } else {
        set({ friendError: "An unknown error occurred." })
      }
      return false
    }
  },

  sendRequest: async (email: FriendRequest) => {
    try {
      const response = await friendService.sendRequest(email)

      console.log(response.name)
      // Notificar response.name

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ friendError: "Connection error" })
      } else if (error instanceof Error) {
        set({
          friendError:
            error.message || "Error sending request, please try again.",
        })
      } else {
        set({ friendError: "An unknown error occurred." })
      }
      return false
    }
  },
}))
