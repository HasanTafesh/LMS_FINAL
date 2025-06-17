# Skillora - Modern Learning Management System

Skillora is a comprehensive Learning Management System (LMS) built with React, Node.js, and MongoDB. It provides a modern platform for online learning, course management, and student-instructor interaction with a focus on user experience and functionality.

## 🌟 Key Features

### User Management
- Secure authentication and authorization
- Role-based access control (Students and Instructors)
- User profile management with password change functionality
- Protected routes based on user roles

### Course Management
- Create and manage courses with rich content
- Support for multiple content types:
  - Video lessons
  - Text-based content
- Course categorization and search
- Module-based course structure
- Drag-and-drop module reordering

### Content Features
- Rich text editor for content creation
- File upload system for course materials
- Video player integration
- Module-based content organization
- Interactive course content viewing

### User Experience
- Responsive design for all devices
- Modern UI with Bootstrap 5
- Interactive notifications using React Toastify
- Progress tracking
- Clean and intuitive interface

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router v6
- Bootstrap 5
- Axios for API calls
- React Beautiful DnD for drag-and-drop
- React Toastify for notifications
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager
- Modern web browser

## 🚀 Getting Started

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
MONGODB_URI=mongodb://localhost:27017/skillora
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

## 📁 Project Structure

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
    │   ├── controllers/ # Route controllers
    │   └── utils/      # Utility functions
    └── uploads/        # File upload directory
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

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- File upload validation
- Protected routes based on user roles

## 📚 API Documentation

### Main API Endpoints

#### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile
- PUT `/api/auth/password` - Change password

#### Courses
- GET `/api/courses` - List all courses
- POST `/api/courses` - Create new course
- GET `/api/courses/:id` - Get course details
- PUT `/api/courses/:id` - Update course
- DELETE `/api/courses/:id` - Delete course
- PUT `/api/courses/:id/modules/reorder` - Reorder course modules

#### Content
- POST `/api/upload` - Upload files
- GET `/api/courses/:id/learn` - Get course content
- POST `/api/courses/:id/modules` - Add module
- PUT `/api/courses/:id/modules/:moduleId` - Update module
- DELETE `/api/courses/:id/modules/:moduleId` - Delete module

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

For support, please create an issue in the repository. 