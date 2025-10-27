# Library Management System - Frontend

This is the frontend application for the Library Management System built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- **Authentication** - Login, register, and role-based navigation
- **Book Management** - Browse, search, and filter books
- **Borrowing System** - Borrow and return books with due date tracking
- **Admin Dashboard** - Complete book and user management
- **User Dashboard** - Personal borrowing history and management
- **Real-time Updates** - Instant feedback with toast notifications

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation component
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── contexts/
│   │   └── AuthContext.jsx      # Authentication context
│   ├── pages/
│   │   ├── Home.jsx             # Home page with book listing
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── BookDetails.jsx      # Book details page
│   │   ├── UserDashboard.jsx   # User dashboard
│   │   ├── AdminDashboard.jsx  # Admin dashboard
│   │   ├── AddBook.jsx          # Add book page (admin)
│   │   ├── EditBook.jsx         # Edit book page (admin)
│   │   └── BorrowedBooks.jsx    # Borrowed books page
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                 # Global styles
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
└── postcss.config.js            # PostCSS configuration
```

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 UI Components

### Pages
- **Home** - Book listing with search and filters
- **Login/Register** - Authentication forms
- **Book Details** - Individual book information
- **User Dashboard** - Personal borrowing management
- **Admin Dashboard** - Book and user management
- **Add/Edit Book** - Book management forms
- **Borrowed Books** - Current and historical borrowing

### Components
- **Navbar** - Responsive navigation with role-based links
- **ProtectedRoute** - Route protection based on authentication and roles
- **AuthContext** - Global authentication state management

## 🎯 Key Features

### User Features
- **Browse Books** - Grid view with search and filtering
- **Book Details** - Comprehensive book information
- **Borrow Books** - One-click borrowing with due date tracking
- **Return Books** - Easy return functionality
- **Dashboard** - Personal borrowing overview
- **History** - Complete borrowing history

### Admin Features
- **Book Management** - Add, edit, and delete books
- **User Management** - View all registered users
- **Statistics** - Comprehensive analytics
- **Dashboard** - Admin overview with key metrics

### UI/UX Features
- **Responsive Design** - Mobile-first approach
- **Search & Filter** - Advanced filtering options
- **Loading States** - Smooth loading indicators
- **Toast Notifications** - Real-time feedback
- **Modern Cards** - Clean card-based layout
- **Interactive Forms** - User-friendly input fields

## 🎨 Styling

### Tailwind CSS Configuration
- **Custom Colors** - Primary and secondary color schemes
- **Typography** - Inter font family
- **Components** - Custom component classes
- **Responsive** - Mobile-first responsive design

### Custom CSS Classes
```css
.btn-primary     /* Primary button styling */
.btn-secondary   /* Secondary button styling */
.btn-danger      /* Danger button styling */
.input-field     /* Form input styling */
.card           /* Card component styling */
```

## 🔧 Configuration

### Vite Configuration
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

### Tailwind Configuration
```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { /* Custom primary colors */ },
        secondary: { /* Custom secondary colors */ }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## 🚀 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Dependencies
- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **react-hot-toast** - Toast notifications
- **lucide-react** - Icon library

### Dev Dependencies
- **@vitejs/plugin-react** - Vite React plugin
- **tailwindcss** - CSS framework
- **autoprefixer** - CSS autoprefixer
- **postcss** - CSS post-processor
- **eslint** - Code linting

## 🔐 Authentication

### AuthContext
Global authentication state management with:
- User login/logout
- Token management
- Role-based access
- Protected routes

### Protected Routes
- User-only routes
- Admin-only routes
- Authentication checks
- Role-based redirects

## 📱 Responsive Design

### Breakpoints
- **Mobile** - < 768px
- **Tablet** - 768px - 1024px
- **Desktop** - > 1024px

### Mobile Features
- Responsive navigation
- Touch-friendly buttons
- Optimized forms
- Mobile-first design

## 🎯 User Experience

### Navigation
- **Home** - Book browsing
- **Login/Register** - Authentication
- **Dashboard** - Personal management
- **Admin** - Administrative functions
- **My Books** - Borrowing management

### Search & Filtering
- **Text Search** - Title, author, category
- **Category Filter** - Filter by book category
- **Author Filter** - Filter by author
- **Real-time Results** - Instant search results

## 🚀 Deployment

### Build Process
1. **Production Build**
   ```bash
   npm run build
   ```

2. **Preview Build**
   ```bash
   npm run preview
   ```

### Deployment Platforms
- **Vercel** - Recommended for React apps
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting
- **AWS S3** - Scalable hosting

### Environment Variables
- Update API endpoints for production
- Configure CORS settings
- Set up proper domain routing

## 🔧 Customization

### Styling
- Modify `tailwind.config.js` for custom colors
- Update `src/index.css` for global styles
- Customize component styles in individual files

### Features
- Add new pages in `src/pages/`
- Create new components in `src/components/`
- Extend authentication in `src/contexts/`

## 🐛 Troubleshooting

### Common Issues
1. **API Connection** - Check backend server is running
2. **CORS Errors** - Verify CORS configuration
3. **Build Errors** - Check dependencies and imports
4. **Styling Issues** - Verify Tailwind configuration

### Development Tips
- Use browser dev tools for debugging
- Check console for error messages
- Verify API endpoints are correct
- Test responsive design on different devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.




