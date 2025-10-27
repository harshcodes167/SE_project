import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import BookDetails from './pages/BookDetails'
import BorrowedBooks from './pages/BorrowedBooks'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
  <div className="min-h-screen text-secondary-800" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--text-primary)' }}>
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/book/:id" element={<BookDetails />} />
              
              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/add-book" element={
                <ProtectedRoute role="admin">
                  <AddBook />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/edit-book/:id" element={
                <ProtectedRoute role="admin">
                  <EditBook />
                </ProtectedRoute>
              } />
              
              <Route path="/borrowed" element={
                <ProtectedRoute>
                  <BorrowedBooks />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App




