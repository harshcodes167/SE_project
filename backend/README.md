# Library Management System - Backend

This is the backend API for the Library Management System built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **JWT Authentication** - Secure user authentication and authorization
- **User Management** - User registration, login, and role-based access
- **Book Management** - CRUD operations for books with admin controls
- **Borrowing System** - Book borrowing and returning functionality
- **Search & Filtering** - Advanced search capabilities
- **Statistics** - Comprehensive analytics for admins

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── bookController.js     # Book management logic
│   └── userController.js      # User operations logic
├── middleware/
│   ├── authMiddleware.js     # JWT authentication middleware
│   └── errorMiddleware.js    # Error handling middleware
├── models/
│   ├── User.js               # User data model
│   └── Book.js               # Book data model
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── bookRoutes.js         # Book management routes
│   └── userRoutes.js         # User operation routes
├── server.js                 # Main server file
├── package.json              # Dependencies
└── .env                      # Environment variables
```

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://gvamsikrishna71817:chronvirkcr7@cluster0.y2z6c3m.mongodb.net/library-management
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Book Endpoints

#### Get All Books
```http
GET /api/books?search=javascript&category=programming&page=1&limit=10
```

#### Get Single Book
```http
GET /api/books/:id
```

#### Add Book (Admin Only)
```http
POST /api/books
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "JavaScript: The Good Parts",
  "author": "Douglas Crockford",
  "isbn": "978-0596517748",
  "category": "Programming",
  "publicationYear": 2008,
  "imageUrl": "https://example.com/book.jpg",
  "description": "A book about JavaScript",
  "totalCopies": 5
}
```

#### Update Book (Admin Only)
```http
PUT /api/books/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author"
}
```

#### Delete Book (Admin Only)
```http
DELETE /api/books/:id
Authorization: Bearer <admin_token>
```

### User Operation Endpoints

#### Borrow Book
```http
POST /api/users/borrow
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookId": "book_id_here"
}
```

#### Return Book
```http
POST /api/users/return
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookId": "book_id_here"
}
```

#### Get Borrowed Books
```http
GET /api/users/borrowed
Authorization: Bearer <token>
```

#### Get Borrowing History
```http
GET /api/users/history
Authorization: Bearer <token>
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  borrowedBooks: [{
    book: ObjectId (ref: 'Book'),
    borrowedDate: Date,
    dueDate: Date,
    returned: Boolean
  }]
}
```

### Book Model
```javascript
{
  title: String,
  author: String,
  isbn: String (unique),
  category: String,
  publicationYear: Number,
  imageUrl: String,
  description: String,
  availability: Boolean,
  totalCopies: Number,
  availableCopies: Number
}
```

## 🚀 Deployment

### Environment Variables
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - JWT expiration time

### Production Deployment
1. Set up MongoDB Atlas cluster
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Ensure CORS is properly configured for your frontend domain

## 🔧 Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **express-validator** - Input validation

### Dev Dependencies
- **nodemon** - Development server with auto-restart

## 🐛 Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- Custom error messages
- Proper HTTP status codes

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Secure environment variable handling

## 📊 Statistics Endpoints

### Book Statistics (Admin Only)
```http
GET /api/books/stats
Authorization: Bearer <admin_token>
```

### User Statistics (Admin Only)
```http
GET /api/users/stats
Authorization: Bearer <admin_token>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.




