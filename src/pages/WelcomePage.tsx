import logotipo from "@/assets/logos/logo.avif"
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ProjectOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Link } from "react-router"

function WelcomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <ProjectOutlined className="text-2xl text-blue-600" />,
      title: "Project Management",
      description: "Efficiently organize and track your projects in one place",
    },
    {
      icon: <TeamOutlined className="text-2xl text-blue-600" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members",
    },
    {
      icon: <AppstoreOutlined className="text-2xl text-blue-600" />,
      title: "Kanban Board",
      description: "Visualize your workflow with customizable Kanban boards",
    },
    {
      icon: <UsergroupAddOutlined className="text-2xl text-blue-600" />,
      title: "User Management",
      description: "Manage team members and their access permissions",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-tasksync-dark dark:text-white">
      {/* Navigation */}
      <nav
        className={`px-4 py-5 transition-all duration-500 ease-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={logotipo}
              alt="Logo"
              className="h-8 w-auto transition-transform duration-300 hover:scale-110"
            />
            <span className="text-xl font-semibold text-tasksync-primary dark:text-tasksync-light">
              TaskSync
            </span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-600 dark:text-gray-50 hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-tasksync-primary text-white rounded-full hover:bg-blue-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className={`container mx-auto px-4 py-16 text-center transition-all duration-700 ease-out delay-300 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-tasksync-primary dark:text-tasksync-light">
          Streamline Your Project Management
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Organize, track, and manage your projects efficiently with our
          powerful project management solution.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
          >
            Start Free Trial
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-gray-300 text-gray-700 dark:text-gray-200 rounded-full transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500 transform hover:-translate-y-1"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div
        className={`container mx-auto px-4 py-16 transition-all duration-700 ease-out delay-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-tasksync-primary dark:text-tasksync-light">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Powerful features to help you manage your projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-tasksync-gray dark:border-gray-700 transition-all duration-400 ease-out transform hover:shadow-xl hover:-translate-y-2 delay-${
                index * 100
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="mb-4 transform transition-transform duration-300 hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        className={`container mx-auto px-4 py-16 transition-all duration-700 ease-out delay-700 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="bg-tasksync-primary rounded-2xl px-8 py-12 text-center text-white dark:text-tasksync-gray transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teams already using our platform
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 bg-white text-tasksync-primary rounded-full transition-all duration-300 hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-1 font-medium"
          >
            <CheckCircleOutlined className="mr-2 transition-transform duration-300 group-hover:rotate-12" />
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400 border-t border-t-gray-400 dark:border-t-tasksync-dark transition-all duration-500 ease-out delay-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <p>© 2025 TaskSync. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default WelcomePage
