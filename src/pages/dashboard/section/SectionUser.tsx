import FriendList from "@/components/FriendList"
import { useFetchFriends } from "@/hooks/useFetchFriends"
import RequestFriendModal from "@/pages/dashboard/section/components/RequestFriendModal"
import { useAuthStore } from "@/stores/authStore"
import { useFriendStore } from "@/stores/friendStore"
import { useUIStore } from "@/stores/uiStore"
import { PlusOutlined } from "@ant-design/icons"

function SectionUser() {
  useFetchFriends()

  const { listFriends, setShowRequestFriendModal } =
    useFriendStore()
  const { user } = useAuthStore()
  const { userAvatarLarge } = useUIStore()

  const avatarUrl =
    user?.icon && userAvatarLarge[user.icon]
      ? userAvatarLarge[user.icon]
      : userAvatarLarge["avatar-00"]

  const filteredFriends = listFriends?.filter((friend) => !friend.isMe)

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
              {filteredFriends &&
                filteredFriends.map((friend) => (
                  <FriendList key={friend.id} friend={friend} />
                ))}
              <div
                onClick={setShowRequestFriendModal}
                className="relative group flex items-center cursor-pointer"
              >
                <div className="border border-gray-300 dark:border-gray-500 rounded-full object-cover w-11 h-11 text-3xl flex items-center justify-center">
                  <PlusOutlined />
                </div>

                <div className="absolute top-full origin-top right-1/2 translate-x-1/2 mt-1 z-20 whitespace-normal rounded-lg bg-gray-700 py-1.5 px-2.5 font-sans text-xs font-medium text-white flex min-w-max opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <span>Add friends</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal */}
          <RequestFriendModal />
        </div>
      )}
    </>
  )
}

export default SectionUser
