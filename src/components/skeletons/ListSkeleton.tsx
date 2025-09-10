const ProjectListSkeleton = () => (
  <div
    role="status"
    className="p-4 border border-t-0 border-gray-300 dark:border-gray-500 rounded-b-2xl"
  >
    <div className="animate-pulse flex flex-col gap-3">
      <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
    </div>
  </div>
)

export default ProjectListSkeleton
