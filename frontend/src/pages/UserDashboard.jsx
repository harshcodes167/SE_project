import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from '../config/axios'
import { BookOpen, Calendar, Clock, User, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

const UserDashboard = () => {
  const { user } = useAuth()
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [returning, setReturning] = useState(null)

  useEffect(() => {
    fetchBorrowedBooks()
  }, [])

  const fetchBorrowedBooks = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users/borrowed')
      setBorrowedBooks(response.data.borrowedBooks)
    } catch (error) {
      toast.error('Failed to fetch borrowed books')
    } finally {
      setLoading(false)
    }
  }

  const handleReturn = async (bookId) => {
    setReturning(bookId)
    try {
      await axios.post('/api/users/return', { bookId })
      toast.success('Book returned successfully!')
      fetchBorrowedBooks() // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to return book')
    } finally {
      setReturning(null)
    }
  }

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const isOverdue = (dueDate) => {
    return getDaysUntilDue(dueDate) < 0
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--text-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Welcome back, {user?.name}!
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage your borrowed books and track your reading history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Currently Borrowed</p>
                <p className="text-2xl font-bold text-secondary-900">{borrowedBooks.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Books Due Soon</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {borrowedBooks.filter(book =>
                    getDaysUntilDue(book.dueDate) <= 3 && getDaysUntilDue(book.dueDate) >= 0
                  ).length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Overdue Books</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {borrowedBooks.filter(book => isOverdue(book.dueDate)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Borrowed Books */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              My Borrowed Books
            </h2>
            <Link
              to="/"
              className="btn-primary flex items-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Browse More Books</span>
            </Link>
          </div>

          {borrowedBooks.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-600 mb-2">
                No books borrowed yet
              </h3>
              <p className="text-secondary-500 mb-6">
                Start exploring our collection and borrow your first book!
              </p>
              <Link to="/" className="btn-primary">
                Browse Books
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {borrowedBooks.map((borrowedBook) => {
                if (!borrowedBook.book) return null // Skip if book data is missing
                const daysUntilDue = getDaysUntilDue(borrowedBook.dueDate)
                const isOverdueBook = isOverdue(borrowedBook.dueDate)

                return (
                  <div
                    key={borrowedBook._id}
                    className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={borrowedBook.book.imageUrl}
                        alt={borrowedBook.book.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                              {borrowedBook.book.title}
                            </h3>
                            <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                              by {borrowedBook.book.author}
                            </p>
                            <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                              <span>
                                Borrowed: {new Date(borrowedBook.borrowedDate).toLocaleDateString()}
                              </span>
                              <span>
                                Due: {new Date(borrowedBook.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${isOverdueBook
                                ? 'bg-red-100 text-red-800'
                                : daysUntilDue <= 3
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                              {isOverdueBook
                                ? `Overdue by ${Math.abs(daysUntilDue)} days`
                                : daysUntilDue <= 3
                                  ? `Due in ${daysUntilDue} days`
                                  : `Due in ${daysUntilDue} days`
                              }
                            </div>
                            <button
                              onClick={() => handleReturn(borrowedBook.book._id)}
                              disabled={returning === borrowedBook.book._id}
                              className="btn-danger text-sm"
                            >
                              {returning === borrowedBook.book._id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              ) : (
                                'Return Book'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard




