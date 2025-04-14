import { SearchOutlined } from "@ant-design/icons"

function ProjetFilter() {
  return (
    <>
      <div className="flex-1 h-full relative">
        <input
          type="text"
          placeholder="Search all projects"
          className="flex w-full h-10 pl-9 px-2 rounded-full  border border-gray-300 dark:border-gray-500 hover:border-tasksync-primary focus:border-2 focus:border-tasksync-primary   focus:outline-none"
        />
        <SearchOutlined className="px-1 absolute left-2 top-1/2 transform -translate-y-1/2" />
      </div>
    </>
  )
}

export default ProjetFilter
