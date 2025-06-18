# Skillora - Modern Learning Management System

Skillora is a comprehensive Learning Management System (LMS) built with React, Node.js, and MongoDB. It provides a modern platform for online learning, course management, and student-instructor interaction with a focus on user experience and functionality.

## Key Features

### User Management
- Secure authentication and authorization
- Role-based access control (Students and Instructors)
- User profile management with password change functionality
- Protected routes based on user roles

### Course Management
- Create and manage courses with rich content
- Support for multiple content types:
  - Text-based content
  - File uploads for course materials
- Module-based course structure

### Content Features
- Module-based content organization
- File upload system for course materials
- Interactive course content viewing
- Progress tracking for students

### User Experience
- Responsive design for all devices
- Modern UI with Bootstrap 5
- Interactive notifications using React Toastify
- Progress tracking
- Clean and intuitive interface

## Technology Stack

### Frontend
- React 18
- React Router v6
- Bootstrap 5
- Axios for API calls
- React Toastify for notifications
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager
- Modern web browser

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd skillora
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create .env file with the following variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillora
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Create .env file with:
REACT_APP_API_URL=http://localhost:5000

# Start the development server
npm start
```

## Project Structure

```
skillora/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── contexts/      # React context providers
│       ├── pages/        # Page components
│       ├── config/       # Configuration files
│       ├── styles/       # CSS styles
│       └── App.jsx       # Main application component
└── server/               # Node.js backend
    ├── src/
    │   ├── routes/      # API routes
    │   ├── models/      # MongoDB models
    │   ├── middleware/  # Custom middleware
    │   └── server.js    # Main server file
    └── uploads/         # File upload directory
        └── courses/     # Course thumbnails
```

## 🛠️ Development

### Available Scripts

#### Frontend (client directory)
```bash
npm start        # Start development server
npm run build    # Build for production
```

#### Backend (server directory)
```bash
npm run dev     # Start development server
npm start       # Start production server
```

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- File upload validation
- Protected routes based on user roles

## API Documentation

### Main API Endpoints

#### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user profile
- PUT `/api/auth/profile` - Update user profile
- PUT `/api/auth/password` - Change password

#### Courses
- GET `/api/courses` - List all courses
- GET `/api/courses/enrolled` - Get enrolled courses for current user
- GET `/api/courses/instructor` - Get instructor's courses
- GET `/api/courses/students/instructor` - Get instructor's students
- GET `/api/courses/:id` - Get course details
- POST `/api/courses` - Create new course
- PUT `/api/courses/:id` - Update course
- DELETE `/api/courses/:id` - Delete course
- POST `/api/courses/:id/enroll` - Enroll in a course
- GET `/api/courses/:id/enrollment` - Check enrollment status

#### Course Content
- POST `/api/courses/:courseId/modules` - Add module to course
- PUT `/api/courses/:courseId/modules/:moduleId` - Update module
- DELETE `/api/courses/:courseId/modules/:moduleId` - Delete module
- PUT `/api/courses/:courseId/modules/reorder` - Reorder course modules
- POST `/api/courses/:courseId/modules/:moduleId/content` - Add content to module
- POST `/api/courses/content/upload` - Upload course content files
- GET `/api/courses/:courseId/progress` - Get course progress
- POST `/api/courses/:courseId/modules/:moduleId/complete` - Mark module as completed



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
