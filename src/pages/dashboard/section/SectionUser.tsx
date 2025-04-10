import PhotoUser from "@/assets/images/users/profile.png"
import UserList from "./components/UserList"

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
          <UserList />
        </div>
      </div>
    </>
  )
}

export default SectionUser
