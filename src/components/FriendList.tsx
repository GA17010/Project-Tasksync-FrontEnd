import { useUIStore } from "@/stores/uiStore"
import { Friend } from "@/types"
import { UserAddOutlined } from "@ant-design/icons"

interface FriendListProps {
  friend: Friend
  onClick?: (friend: Friend) => void
  showTooltip?: boolean
  showAddIcon?: boolean
  className?: string
}

function FriendList({
  friend,
  onClick,
  showTooltip = true,
  showAddIcon = false,
  className = "",
}: FriendListProps) {
  const { userAvatarSmall } = useUIStore()

  const avatarUrl =
    friend.icon && userAvatarSmall[friend.icon]
      ? userAvatarSmall[friend.icon]
      : userAvatarSmall["avatar-00"]

  const clickable = typeof onClick === "function"

  return (
    <div
      onClick={clickable ? () => onClick(friend) : undefined}
      className={[
        "relative group flex items-center gap-2",
        clickable &&
          "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/70 px-3 py-2 rounded-lg",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={avatarUrl}
        className="border border-gray-300 dark:border-gray-500 rounded-full object-cover w-11 h-11"
        alt="Friend photo"
        loading="lazy"
        width={44}
        height={44}
      />

      {/* Show Name + Icon if used in assign mode */}
      {clickable && (
        <div className="flex justify-between w-full">
          <span className="break-all">
            {friend.name} {friend.isMe && "(Me)"}
          </span>
          {showAddIcon && <UserAddOutlined className="text-xl" />}
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full origin-top mt-1 z-20 whitespace-normal rounded-lg bg-gray-700 py-1.5 px-2.5 font-sans text-xs font-medium text-white flex min-w-max opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          <span>{friend.nick_name}</span>
        </div>
      )}
    </div>
  )
}

export default FriendList
