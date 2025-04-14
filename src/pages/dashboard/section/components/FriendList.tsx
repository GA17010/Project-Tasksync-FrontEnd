import { useUIStore } from "@/stores/uiStore"
import { Friend } from "@/types"

interface FriendListProps {
  friend: Friend
}

function FriendList({ friend }: FriendListProps) {
  const { userAvatars } = useUIStore()
  // Retrieve the avatar based on the friend's icon
  const icon = userAvatars[friend.icon] || userAvatars["avatar-1"] // Default to avatar-1 if not found

  return (
    <>
      <div className="group flex justify-center" key={friend.id}>
        <img
          src={icon}
          className=" border dark:border-white rounded-full"
          alt="Friend photo"
          width={44}
          height={44}
        />

        {/* Tooltip */}
        <div className="absolute top-full origin-top mt-1 z-20 whitespace-normal rounded-lg bg-gray-700 py-1.5 px-2.5 font-sans text-xs font-medium text-white flex min-w-max opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          <span>{friend.nick_name}</span>
        </div>
      </div>
    </>
  )
}

export default FriendList
