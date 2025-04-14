import FriendList from "@/components/FriendList"
import { useFriendStore } from "@/stores/friendStore"
import { CloseOutlined } from "@ant-design/icons"
function AssignToModal() {
  const { showAssignMenu, setShowAssignMenu, friendsList, handleAssign } =
    useFriendStore()

  return (
    <>
      <div
        className={`absolute left-0 top-0 h-screen w-full px-4 sm:px-0 flex flex-col items-center justify-center bg-gray-500/50 dark:bg-gray-900/80  origin-center transition-all duration-150 ease-in-out z-50 ${
          showAssignMenu ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="relative flex flex-col items-center max-h-1/2 w-full sm:w-2/3  md:w-1/2 lg:w-1/3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-900 rounded-2xl ">
          {/* Header */}
          <div className="sticky top-0 w-full text-center border-b border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-tasksync-dark rounded-t-2xl">
            <h3 className="py-2.5 font-semibold">Assign to:</h3>
          </div>

          {/* List */}
          <ul className="w-full flex flex-col last:rounded-b-2xl overflow-y-auto mb-4">
            {friendsList.map((friend) => (
              <li key={friend.id}>
                <FriendList
                  friend={friend}
                  onClick={handleAssign}
                  showTooltip={false}
                  showAddIcon={true}
                  className="w-full"
                />
              </li>
            ))}
          </ul>

          {/* Close Modal */}
          <button
            onClick={setShowAssignMenu}
            className="absolute top-1 right-1 py-0.5 px-1.5 text-2xl text-tasksync-danger hover:bg-tasksync-danger/20 cursor-pointer rounded-full"
          >
            <CloseOutlined />
          </button>
        </div>
      </div>
    </>
  )
}

export default AssignToModal
