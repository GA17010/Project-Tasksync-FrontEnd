import { SearchOutlined } from "@ant-design/icons"

function ProjetFilter() {
  return (
    <>
      <div className="flex-1 h-full relative">
        <input
          type="text"
          placeholder="Search all projects"
          className="flex w-full h-10 pl-9 px-2 rounded-md border border-gray-300 focus:outline-blue-500"
        />
        <SearchOutlined className="px-1 absolute left-2 top-1/2 transform -translate-y-1/2" />
      </div>
    </>
  )
}

export default ProjetFilter
