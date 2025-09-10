function FooterPanel() {
  const footerLink = [
    {
      href: "/about",
      title: "About us",
    },
    {
      href: "/about",
      title: "Developed by",
    },
  ]
  return (
    <>
      <footer className="px-4 sm:px-12">
        <div className="h-14 flex flex-col justify-center items-center sm:flex-row sm:justify-between text-sm text-gray-700 dark:text-gray-500">
          <div className="text-center">
            <p>© 2025 TaskSync.</p>
          </div>
          <div className="text-center sm:text-right">
            {footerLink.map((item) => (
              <span key={item.title} className="mx-2">
                {item.title}
              </span>
            ))}
            <a
              href="https://devgustavo17.netlify.app"
              className="text-tasksync-primary"
            >
              DevGustavo
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default FooterPanel
