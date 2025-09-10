import { useUIStore } from "@/stores/uiStore"

interface SelectAvatarModalProps {
  isOpen: boolean
  selectedIcon: string
  onClick: (iconName: string) => void
}

function SelectAvatarModal({
  isOpen,
  selectedIcon,
  onClick,
}: SelectAvatarModalProps) {
  const { userAvatarSmall } = useUIStore()
  return (
    <>
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-tasksync-dark border border-gray-300 dark:border-gray-500 shadow-md rounded-sm z-10 overflow-y-auto max-h-40 origin-top transition-all duration-100 ease-linear">
          <div className="p-2 flex flex-wrap gap-1.5">
            {Object.entries(userAvatarSmall).map(([iconName, imageUrl]) => (
              <button
                key={iconName}
                type="button"
                className={`w-10 h-10 rounded-full cursor-pointer overflow-hidden focus:outline-none ${
                  selectedIcon === iconName
                    ? "ring-2 ring-tasksync-primary"
                    : "hover:ring-1 ring-gray-300 dark:hover:ring-gray-500"
                }`}
                onClick={() => {
                  onClick(iconName)
                }}
              >
                <img
                  src={imageUrl}
                  alt={iconName}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SelectAvatarModal
