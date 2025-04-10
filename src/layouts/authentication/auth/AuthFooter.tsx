function AuthFooter() {
  const footerLink = [
    {
      title: "© 2025 TaskSync.",
    },
    {
      title: "All rights reserved.",
    },
    {
      title: "Version 1.0.0",
    },
  ]
  return (
    <>
      <footer className="px-0 pt-2">
        <div className="flex flex-col justify-center lg:flex-row text-gray-600 dark:text-gray-400">
          <div className="flex flex-col w-full text-center lg:w-8/12 lg:text-left">
            <p className="text-xs mb-4 lg:mb-0 lg:ml-8">
              Developed by
              <a
                href="https://devgustavo17.netlify.app"
                className="pl-1 text-tasksync-primary text-xs"
              >
                DevGustavo
              </a>
            </p>
          </div>
          <div className="flex flex-col text-center w-full lg:pr-8 lg:w-auto lg:flex-row lg:justify-end">
            {footerLink.map((item, i) => (
              <a
                key={i}
                className="w-full min-w-max text-xs px-2 mb-2 lg:px-3 lg:pb-0"
                href="https://devgustavo17.netlify.app"
                target="_blank"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

export default AuthFooter
