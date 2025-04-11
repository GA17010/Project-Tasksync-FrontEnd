function FooterPanel() {
  const footerLink = [
    {
      title: "About us",
    },
    {
      title: "Developed by",
    },
  ]
  return (
    <>
      <footer className="px-4 sm:px-12">
        <div className="h-14 flex flex-col justify-center items-center sm:flex-row sm:justify-between text-sm text-gray-700">
          <div className="text-center">
            <p>© 2025 TaskSync.</p>
          </div>
          <div className="text-center sm:text-right">
            {footerLink.map((item, i) => (
              <span key={i} className="mx-2">
                {item.title}
              </span>
            ))}
            <a
              href="https://devgustavo17.netlify.app"
              className="text-blue-500"
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
