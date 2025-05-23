import { useNotificationStore } from "@/stores/useNotificationStore"
import IconNotificationDD from "./IconNotificationDD"

export default function ListNotificationDD() {
  const { Data_notification, SET_IS_READ_ONE } = useNotificationStore()

  return (
    <ul>
      {Data_notification.map((item) => (
        <li
          key={item.id}
          className={`w-full cursor-pointer ${
            item.timestamps.isRead
              ? "hover:bg-gray-100 dark:hover:bg-gray-900"
              : "hover:bg-gray-200 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-900"
          }`}
        >
          <button
            className="cursor-pointer w-full sm:w-96"
            onClick={() => SET_IS_READ_ONE(item.id)}
          >
            <div className="py-3 px-4 flex transition-colors duration-100 ease-in-out">
              <div className="flex items-center">
                <IconNotificationDD
                  category={item.category}
                  mainMessage={item.message.main}
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="inline-flex justify-between w-full">
                  <h6 className="text-sm text-left font-normal text-gray-700 dark:text-gray-200">
                    {item.message.prefix}
                    <span className="font-semibold text-gray-900 dark:text-white px-1">
                      {item.message.main}
                    </span>
                    {item.message.suffix}
                  </h6>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {item.timestamps.receivedAt}
                  </span>
                </div>

                <span className="text-xs text-left text-gray-600 dark:text-gray-400 py-1">
                  {item.timestamps.lastSeen}
                </span>
              </div>
            </div>
            <span className="flex w-full bg-gray-300 dark:bg-tasksync-dark h-[1px]" />
          </button>
        </li>
      ))}
    </ul>
  )
}
