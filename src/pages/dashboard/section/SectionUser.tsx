import User1 from "@/assets/images/users/avatar-1.avif"
import User2 from "@/assets/images/users/avatar-2.avif"
import User3 from "@/assets/images/users/avatar-3.avif"
import User4 from "@/assets/images/users/avatar-4.avif"
import PhotoUser from "@/assets/images/users/profile.png"
import UserList from "./components/UserList"
const friends = [
  { id: "1", name: "Amigo 1", nick_name: "nickname1", icon: User1 },
  { id: "2", name: "Amigo 2", nick_name: "nickname2", icon: User2 },
  { id: "3", name: "Amigo 3", nick_name: "nickname3", icon: User3 },
  { id: "4", name: "Amigo 4", nick_name: "nickname4", icon: User4 },
  { id: "5", name: "Amigo 5", nick_name: "nickname5", icon: User1 },
  { id: "6", name: "Amigo 6", nick_name: "nickname6", icon: User2 },
  { id: "7", name: "Amigo 7", nick_name: "nickname7", icon: User3 },
  { id: "8", name: "Amigo 8", nick_name: "nickname8", icon: User4 },
  { id: "9", name: "Amigo 9", nick_name: "nickname9", icon: User3 },
  { id: "9", name: "Amigo 9", nick_name: "nickname9", icon: User3 },
]
const user = {
  id: "1",
  name: "Lorem ipsum dolor sit amet",
  nick_name: "nickname",
  icon: PhotoUser,
  email: "admin@example.com",
  company: "Company",
}

function SectionUser() {
  return (
    <>
      {/* Profile Section */}
      <div className="flex md:flex-col items-center justify-center gap-4">
        <img
          src={user.icon}
          alt="perfil"
          className="w-3/12 md:w-10/12 lg:w-9/12 rounded-full shadow-[0_0_0_2px_rgba(130,130,130,0.35)]"
        />
        <div className="w-full flex flex-col items-start ">
          <h1 className="text-2xl text-gray-800 font-semibold">{user.name}</h1>
          <p className="text-lg text-gray-500">{user.nick_name}</p>
        </div>
      </div>

      {/* Edit Section */}
      <div className="flex flex-col items-center justify-center mt-4">
        <button className="w-full h-9 rounded-lg text-sm border cursor-pointer border-gray-300 bg-gray-100">
          Edit profile
        </button>
      </div>

      {/* Friends Section */}
      <div>
        <h2 className="text-xl font-bold mt-4">Friends</h2>
        <div className="pt-2 flex items-center flex-wrap gap-1">
          {friends.map((friend) => (
            <UserList key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </>
  )
}

export default SectionUser
