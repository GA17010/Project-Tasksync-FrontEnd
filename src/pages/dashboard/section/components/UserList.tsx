import User1 from "@/assets/images/users/avatar-1.avif"
import User2 from "@/assets/images/users/avatar-2.avif"
import User3 from "@/assets/images/users/avatar-3.avif"
import User4 from "@/assets/images/users/avatar-4.avif"
const friends = [
  { id: 1, name: "Amigo 1", nick_name: "nickname1", icon: User1 },
  { id: 2, name: "Amigo 2", nick_name: "nickname2", icon: User2 },
  { id: 3, name: "Amigo 3", nick_name: "nickname3", icon: User3 },
  { id: 4, name: "Amigo 4", nick_name: "nickname4", icon: User4 },
  { id: 5, name: "Amigo 5", nick_name: "nickname5", icon: User1 },
  { id: 6, name: "Amigo 6", nick_name: "nickname6", icon: User2 },
  { id: 7, name: "Amigo 7", nick_name: "nickname7", icon: User3 },
  { id: 8, name: "Amigo 8", nick_name: "nickname8", icon: User4 },
  { id: 9, name: "Amigo 9", nick_name: "nickname9", icon: User3 },
  { id: 9, name: "Amigo 9", nick_name: "nickname9", icon: User3 },
]

function UserList() {
  return (
    <>
      {friends.map((friend) => (
        <div className="relative group flex justify-center" key={friend.id}>
          <img
            src={friend.icon}
            className="border border-white rounded-full"
            alt="vector"
            width={44}
            height={44}
          />

          {/* Tooltip */}
          <div className="absolute top-full origin-top mt-1 z-20 whitespace-normal rounded-lg bg-gray-700 py-1.5 px-2.5 font-sans text-xs font-medium text-white flex min-w-max opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
            <span>{friend.nick_name}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default UserList
