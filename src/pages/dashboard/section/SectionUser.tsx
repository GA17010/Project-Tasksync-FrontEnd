import PhotoUser from "@/assets/images/users/profile.png"
import { useFriendStore } from "@/stores/friendStore"
import FriendList from "@/components/FriendList"

const user = {
  id: "1",
  full_name: "Otorinolaringologddw ada aso ipsum dolor sit amet",
  nick_name: "nickname",
  icon: PhotoUser,
  email: "admin@example.com",
}

function SectionUser() {
  const { friendsList } = useFriendStore()

  return (
    <>
      {/* Profile Section */}
      <div className="flex md:flex-col items-center justify-center gap-4">
        <div className="w-4/12 sm:w-3/12 md:w-10/12 lg:w-9/12 ">
          <img
            src={user.icon}
            alt="perfil"
            className="rounded-full shadow-[0_0_0_2px_rgba(130,130,130,0.35)]"
          />
        </div>
        <div className="py-2 sm:px-8 w-8/12 sm:w-9/12 md:w-full flex flex-col items-start break-words">
          <h1 className="text-lg w-full sm:text-xl md:text-2xl font-semibold ">
            {user.full_name}
          </h1>
          <p className="text-lg w-full text-gray-500 dark:text-gray-400">
            {user.nick_name}
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
    </>
  )
}

export default SectionUser
