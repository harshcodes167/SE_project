# Library Management System

A complete Library Management System built with the MERN stack (MongoDB, Express.js, React, Node.js) and Tailwind CSS.

## 🚀 Features

### 👤 User Features
- **User Registration & Login** - Secure JWT-based authentication
- **Browse Books** - View all available books with search and filtering
- **Borrow Books** - Borrow up to 3 books at a time
- **Return Books** - Easy book return functionality
- **Dashboard** - View borrowed books and due dates
- **Borrowing History** - Complete history of all borrowed books

### 🧑‍💼 Admin Features
- **Book Management** - Add, edit, and delete books
- **User Management** - View all registered users
- **Dashboard** - Comprehensive statistics and analytics
- **Book Statistics** - Track total, available, and borrowed books
- **User Statistics** - Monitor user registrations and roles

### 🎨 UI/UX Features
- **Modern Design** - Clean, responsive interface with Tailwind CSS
- **Search & Filter** - Search by title, author, or category
- **Responsive Layout** - Works perfectly on all devices
- **Real-time Updates** - Instant feedback and notifications
- **Intuitive Navigation** - Easy-to-use interface

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📁 Project Structure

```
library-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Book.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create Environment File**
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://gvamsikrishna71817:chronvirkcr7@cluster0.y2z6c3m.mongodb.net/library-management
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the Application**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Books
- `GET /api/books` - Get all books (with search/filter)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Add book (admin only)
- `PUT /api/books/:id` - Update book (admin only)
- `DELETE /api/books/:id` - Delete book (admin only)
- `GET /api/books/stats` - Get book statistics (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/stats` - Get user statistics (admin only)
- `POST /api/users/borrow` - Borrow book
- `POST /api/users/return` - Return book
- `GET /api/users/borrowed` - Get user's borrowed books
- `GET /api/users/history` - Get borrowing history

## 🔐 User Roles

### User
- Browse and search books
- Borrow books (max 3 at a time)
- Return books
- View borrowing history
- Access personal dashboard

### Admin
- All user features
- Add/edit/delete books
- View all users
- Access admin dashboard
- Manage book inventory

## 🎨 UI Components

- **Responsive Design** - Mobile-first approach
- **Modern Cards** - Clean card-based layout
- **Interactive Forms** - User-friendly input fields
- **Loading States** - Smooth loading indicators
- **Toast Notifications** - Real-time feedback
- **Search & Filters** - Advanced filtering options

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

### MongoDB Connection
The application uses MongoDB Atlas. Update the connection string in the `.env` file with your MongoDB credentials.

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Set environment variables in your deployment platform
3. Ensure MongoDB Atlas allows connections from your deployment IP

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API endpoints if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🎯 Future Enhancements

- [ ] Email notifications for due dates
- [ ] Book reservations system
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Integration with external book APIs
- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] Book recommendations
- [ ] Social features (reviews, ratings)

---

**Happy Reading! 📚**




