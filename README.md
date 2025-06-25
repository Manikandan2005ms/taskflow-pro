# TaskFlow Pro

TaskFlow Pro is a comprehensive, full-stack Learning Management System (LMS) designed to streamline the educational process for students, lecturers, and administrators. It provides a centralized platform for course management, material distribution, and user administration.

## 🚀 About The Project

This project is a modern web application built with a separate frontend and backend. The frontend is a responsive and interactive user interface built with Next.js and Tailwind CSS, while the backend is a robust REST API powered by Node.js, Express, and MongoDB.

## ✨ Features

- **User Authentication:** Secure registration and login for students, lecturers, and administrators.
- **Role-Based Access Control:** Different permissions and views for different user roles (student, lecturer, admin).
- **Course Management:** Admins and lecturers can create, update, and delete courses.
- **Material Management:** Lecturers can upload and manage course materials (e.g., PDFs, documents).
- **Student Enrollment:** Students can enroll in available courses.
- **Dashboard:** A central hub for users to access their courses, materials, and other relevant information.
- **User Management:** Admins can manage all users in the system.

## 🛠️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js.

### Backend

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [MongoDB](https://www.mongodb.com/) - NoSQL database.
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.
- [JSON Web Tokens (JWT)](https://jwt.io/) - For secure user authentication.

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation or a cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/taskflow_pro.git
    cd taskflow_pro
    ```

2.  **Backend Setup:**

    - Navigate to the backend directory:
      ```sh
      cd backend
      ```
    - Install NPM packages:
      ```sh
      npm install
      ```
    - Create a `.env` file in the `backend` directory and add the following environment variables:
      ```env
      PORT=4000
      MONGODB_URI=<your_mongodb_connection_string>
      JWT_SECRET=<your_jwt_secret>
      FRONTEND_URL=http://localhost:3000
      ```
    - Start the backend server:
      ```sh
      npm start
      ```

3.  **Frontend Setup:**

    - Open a new terminal and navigate to the frontend directory:
      ```sh
      cd frontend
      ```
    - Install NPM packages:
      ```sh
      npm install
      ```
    - Create a `.env.local` file in the `frontend` directory and add the following environment variable:
      ```env
      NEXT_PUBLIC_API_URL=http://localhost:4000/api
      ```
    - Start the frontend development server:
      ```sh
      npm run dev
      ```

After following these steps, the application should be running at `http://localhost:3000`.

## 📁 Project Structure

The project is organized into two main directories:

-   `frontend/`: Contains the Next.js application, including all components, pages, services, and styles.
-   `backend/`: Contains the Node.js/Express application, including routes, controllers, models, and middleware.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
