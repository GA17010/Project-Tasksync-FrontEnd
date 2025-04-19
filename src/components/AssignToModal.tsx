import FriendList from "@/components/FriendList"
import { useFriendStore } from "@/stores/friendStore"
import { FriendResponse } from "@/types"
import { CloseOutlined } from "@ant-design/icons"

interface AssignToModalProps {
  onClick: (friend: FriendResponse) => void
  showMe?: boolean
}

function AssignToModal({ onClick, showMe }: AssignToModalProps) {
  const { showAssignMenu, closeAssignMenu, listFriends } = useFriendStore()

  const filteredFriends = showMe
    ? listFriends
    : listFriends?.filter((friend) => !friend.isMe)

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-screen w-full px-4 sm:px-0 flex flex-col items-center justify-center bg-gray-500/30 dark:bg-gray-900/60 backdrop-blur-xs origin-center transition-all duration-150 ease-in-out z-50 ${
          showAssignMenu ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="relative flex flex-col items-center max-h-1/2 w-full sm:w-2/3  md:w-1/2 lg:w-1/3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-900 rounded-2xl ">
          {/* Header */}
          <div className="sticky top-0 w-full text-center border-b border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-tasksync-dark rounded-t-2xl">
            <h3 className="py-3 font-semibold">Assign to:</h3>
          </div>

          {/* List */}
          <ul className="w-full flex flex-col last:rounded-b-2xl overflow-y-auto mb-4">
            {filteredFriends &&
              filteredFriends.map((friend) => (
                <li key={friend.id}>
                  <FriendList
                    friend={friend}
                    onClick={onClick}
                    showTooltip={false}
                    showAddIcon={true}
                    className="w-full"
                  />
                </li>
              ))}
          </ul>

          {/* Close Modal */}
          <button
            onClick={closeAssignMenu}
            className="absolute top-1 right-1 py-1.5 px-2.5 text-lg text-tasksync-danger hover:bg-tasksync-danger/20 cursor-pointer rounded-lg"
          >
            <CloseOutlined />
          </button>
        </div>
      </div>
    </>
  )
}

export default AssignToModal
