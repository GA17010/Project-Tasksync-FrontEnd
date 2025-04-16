import FriendList from "@/components/FriendList"
import { useFriendStore } from "@/stores/friendStore"

import { useAuthStore } from "@/stores/authStore"
import { useUIStore } from "@/stores/uiStore"

function SectionUser() {
  const { friendsList } = useFriendStore()
  const { user } = useAuthStore()
  const { userAvatarLarge } = useUIStore()

  const avatarUrl =
    user?.icon && userAvatarLarge[user.icon]
      ? userAvatarLarge[user.icon]
      : userAvatarLarge["avatar-00"]

  return (
    <>
      {/* Profile Section */}
      {user && (
        <div>
          <div className="flex md:flex-col items-center justify-center gap-4">
            <div className="w-4/12 sm:w-3/12 md:w-10/12 lg:w-9/12 aspect-square">
              <img
                src={avatarUrl}
                alt="perfil"
                className="rounded-full shadow-[0_0_0_2px_rgba(130,130,130,0.35)] object-cover w-full h-full"
              />
            </div>
            <div className="py-2 sm:px-8 w-8/12 sm:w-9/12 md:w-full flex flex-col items-start break-words">
              <h1 className="text-lg w-full sm:text-xl md:text-2xl font-semibold ">
                {user.name}
              </h1>
              <p className="text-lg w-full text-gray-500 dark:text-gray-400">
                @{user.nickname}
              </p>
            </div>
          </div>

          {/* Edit Section */}
          <div className="flex flex-col items-center justify-center mt-4">
            <button className="w-full h-9 rounded-full text-sm border cursor-pointer border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-tasksync-dark hover:bg-gray-200 dark:hover:bg-tasksync-dark/60">
              Edit profile
            </button>
          </div>

          {/* Friends Section */}
          <div>
            <h2 className="text-xl font-bold mt-4">Friends</h2>
            <div className="pt-2 flex items-center flex-wrap gap-1">
              {friendsList.map((friend) => (
                <FriendList key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SectionUser
