import { Friend } from "@/types"
import { create } from "zustand"

const friends: Friend[] = [
  { id: "1", name: "Alice", isMe: false },
  { id: "2", name: "Bob", isMe: false },
  { id: "3", name: "You", isMe: true },
]

type FriendState = {
  friendsList: Friend[]
  showAssignMenu: boolean
  taskToAssgin: string | null

  setShowAssignMenu: () => void
  setTaskAndToggleMenu: (id: string) => void
  handleAssign: (friend: Friend) => void
}

export const useFriendStore = create<FriendState>((set, get) => ({
  friendsList: friends,
  showAssignMenu: false,
  taskToAssgin: null,

  setShowAssignMenu: () => {
    set((state) => ({ showAssignMenu: !state.showAssignMenu }))
  },

  setTaskAndToggleMenu: (id) => {
    set({ taskToAssgin: id })

    set((state) => ({ showAssignMenu: !state.showAssignMenu }))
  },

  handleAssign: (friend) => {
    console.log(`Assigned to ${friend.name}`)
    if (!get().taskToAssgin) return

    console.log(`taskId ${get().taskToAssgin}`)

    set(() => ({
      showAssignMenu: false,
      taskToAssgin: null
    })) // get().setShowAssignMenu()
  },
}))
