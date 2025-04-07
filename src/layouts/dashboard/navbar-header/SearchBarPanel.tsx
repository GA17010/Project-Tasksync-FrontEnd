import { SearchOutlined } from "@ant-design/icons"

function SearchBarPanel() {
  return (
    <div className="relative">
      <input
        id="search"
        type="text"
        className="w-full bg-white placeholder:text-gray-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Search here..."
      />
      <div className="text-gray-400 p-1.5 size-5 absolute left-1 top-1">
        <SearchOutlined />
      </div>
    </div>
  )
}

export default SearchBarPanel
