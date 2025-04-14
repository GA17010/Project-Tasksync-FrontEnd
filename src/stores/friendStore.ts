import { Friend, Task } from "@/types"
import { create } from "zustand"

const friends: Friend[] = [
  { id: "1", name: "You", nick_name: "Me", icon: 'avatar-1', isMe: true },
  { id: "2", name: "Alice", nick_name: "Ali", icon: 'avatar-2' , isMe: false },
  { id: "3", name: "Bob", nick_name: "Bod", icon: 'avatar-2', isMe: false },
  { id: "4", name: "Amigo 1", nick_name: "nickname1", icon: 'avatar-2', isMe: false },
  { id: "5", name: "Amigo 2", nick_name: "nickname2", icon: 'avatar-2', isMe: false },
  { id: "6", name: "Amigo 3", nick_name: "nickname3", icon: 'avatar-3', isMe: false },
  { id: "7", name: "Amigo 4", nick_name: "nickname4", icon: 'avatar-4', isMe: false },
  { id: "8", name: "Amigo 5", nick_name: "nickname5", icon: 'avatar-2', isMe: false },
  { id: "9", name: "Amigo 6", nick_name: "nickname6", icon: 'avatar-2', isMe: false },
  { id: "10", name: "Amigo 7", nick_name: "nickname7", icon: 'avatar-3', isMe: false },
  { id: "11", name: "Amigo 8", nick_name: "nickname8", icon: 'avatar-4', isMe: false },
  { id: "12", name: "Amigo 9", nick_name: "nickname9", icon: 'avatar-3', isMe: false },
  { id: "13", name: "Amigo 9", nick_name: "nickname9", icon: 'avatar-3', isMe: false },
]

type FriendState = {
  friendsList: Friend[]
  showAssignMenu: boolean
  taskToAssign: Task | null

  setShowAssignMenu: () => void
  setTaskAndToggleMenu: (task: Task) => void
  handleAssign: () => void
}

export const useFriendStore = create<FriendState>((set, get) => ({
  friendsList: friends,
  showAssignMenu: false,
  taskToAssign: null,

  setShowAssignMenu: () => {
    set((state) => ({ showAssignMenu: !state.showAssignMenu }))
  },

  setTaskAndToggleMenu: (task) => {
    set({ taskToAssign: task })

    set((state) => ({ showAssignMenu: !state.showAssignMenu }))
  },

  handleAssign: () => {
    console.log(`taskId ${get().taskToAssign}`)

    set(() => ({
      showAssignMenu: false,
      taskToAssign: null,
    }))
  },
}))
