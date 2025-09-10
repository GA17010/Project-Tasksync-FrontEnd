# TaskSync - Project Management Application

## Overview

TaskSync is a modern project management application built with React and TypeScript for the frontend and Laravel for the backend. It's designed to help teams organize and track their projects efficiently, featuring a Kanban board system, real-time notifications, and collaborative tools for seamless project coordination.

The project is split into two repositories:

- Frontend (Current): [Project-Tasksync-FrontEnd](https://github.com/GA17010/Project-Tasksync-FrontEnd)
- Backend: [tasksync-backend](https://github.com/GA17010/tasksync-backend)

## Features

- **Authentication System**

  - User registration and login
  - Password recovery
  - Email verification
  - Custom avatar selection

- **Dashboard**

  - Project overview
  - Task management
  - User statistics
  - Activity tracking

- **Kanban Board**

  - Drag-and-drop task management
  - Multiple task columns
  - Task creation and editing
  - Task assignments

- **Collaboration Tools**

  - Friend system
  - Real-time notifications
  - Task assignments
  - Project sharing

- **User Experience**
  - Dark/Light mode support
  - Responsive design
  - Loading states and skeletons
  - Error handling

## Technology Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand
- **Styling:** TailwindCSS
- **Routing:** React Router
- **Authentication:** JWT (JSON Web Tokens)
- **Backend:** Laravel (PHP)

## Getting Started

### Prerequisites

- Node.js (version 22.13.0 or higher)
- npm or yarn
- Access to the TaskSync Backend API

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GA17010/Project-Tasksync-FrontEnd.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file with the required environment variables:

   ```bash
   VITE_API_BASE_URL=your_backend_api_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── layouts/       # Page layouts and templates
├── pages/         # Application pages
├── stores/        # Zustand state management
├── types/         # TypeScript type definitions
└── utils/         # Utility functions and services
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. When contributing to this repository, please first discuss the change you wish to make via issue or pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please feel free to contact:

- Email: gustavoaguirre287@gmail.com
- GitHub Issues: [Create an issue](https://github.com/GA17010/Project-Tasksync-FrontEnd/issues)
