interface UserListProps {
  friend: {
    id: string
    name: string
    nick_name: string
    icon: string
  }
}

function UserList({ friend }: UserListProps) {
  return (
    <>
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
    </>
  )
}

export default UserList
