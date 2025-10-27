import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { BookOpen, Calendar, Clock, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const BorrowedBooks = () => {
  const { user } = useAuth()
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [historyLoading, setHistoryLoading] = useState(true)
  const [returning, setReturning] = useState(null)
  const [activeTab, setActiveTab] = useState('current')
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        await fetchBorrowedBooks()
      } catch (error) {
        console.error('Error loading initial data:', error)
        toast.error('Failed to load books')
      } finally {
        setLoading(false)
      }
    }
    loadInitialData()
  }, [])

  useEffect(() => {
    if (activeTab === 'history') {
      setHistoryLoading(true)
      fetchHistory()
    } else {
      // Reset history loading state when switching away from history tab
      setHistoryLoading(false)
    }

    // Cleanup function to reset loading state when component unmounts
    return () => {
      setHistoryLoading(false)
    }
  }, [activeTab])

  const fetchBorrowedBooks = async () => {
    try {
      const response = await axios.get('/api/users/borrowed')
      setBorrowedBooks(response.data.borrowedBooks)
    } catch (error) {
      toast.error('Failed to fetch borrowed books')
    }
  }

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/users/history')
      if (response.data && Array.isArray(response.data.history)) {
        setHistory(response.data.history)
      } else {
        setHistory([])
        toast.error('Invalid history data received')
      }
    } catch (error) {
      console.error('History fetch error:', error)
      setHistory([])
      toast.error(error.response?.data?.message || 'Failed to fetch borrowing history')
    } finally {
      setHistoryLoading(false)  // Fix: Set historyLoading instead of loading
    }
  }

  const handleReturn = async (bookId) => {
    setReturning(bookId)
    try {
      await axios.post('/api/users/return', { bookId })
      toast.success('Book returned successfully!')
      fetchBorrowedBooks() // Refresh current books
      fetchHistory() // Refresh history
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
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            My Books
          </h1>
          <p className="text-secondary-600">
            Manage your borrowed books and view your reading history
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('current')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'current'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Currently Borrowed ({borrowedBooks.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Borrowing History ({history.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Current Books Tab */}
        {activeTab === 'current' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                Currently Borrowed Books
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
                  No books currently borrowed
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
                  const daysUntilDue = getDaysUntilDue(borrowedBook.dueDate)
                  const isOverdueBook = isOverdue(borrowedBook.dueDate)
                  
                  return (
                    <div
                      key={borrowedBook._id}
                      className="border border-secondary-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={borrowedBook.book.imageUrl}
                          alt={borrowedBook.book.title}
                          className="w-20 h-28 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-secondary-900 mb-1">
                                {borrowedBook.book.title}
                              </h3>
                              <p className="text-secondary-600 text-sm mb-2">
                                by {borrowedBook.book.author}
                              </p>
                              <div className="flex items-center space-x-6 text-sm text-secondary-500 mb-4">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    Borrowed: {new Date(borrowedBook.borrowedDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    Due: {new Date(borrowedBook.dueDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                                isOverdueBook
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
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                Borrowing History
              </h2>
            </div>

            {historyLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-secondary-600 mb-2">
                  Error loading history
                </h3>
                <p className="text-secondary-500">
                  {error}
                </p>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-600 mb-2">
                  No borrowing history
                </h3>
                <p className="text-secondary-500">
                  Your borrowing history will appear here once you start borrowing books.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((borrowedBook) => (
                  <div
                    key={borrowedBook._id}
                    className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={borrowedBook.book?.imageUrl || 'https://via.placeholder.com/160x200?text=No+Image'}
                        alt={borrowedBook.book?.title || 'Book cover'}
                        className="w-16 h-20 object-cover rounded-lg bg-secondary-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-secondary-900 mb-1">
                              {borrowedBook.book?.title || 'Unknown Book'}
                            </h3>
                            <p className="text-secondary-600 text-sm mb-2">
                              by {borrowedBook.book?.author || 'Unknown Author'}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-secondary-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  Borrowed: {new Date(borrowedBook.borrowedDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Due: {new Date(borrowedBook.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                              {borrowedBook.returned && (
                                <span className="flex items-center space-x-1 text-green-600">
                                  <BookOpen className="h-4 w-4" />
                                  <span>
                                    Returned: {new Date(borrowedBook.returnedDate || borrowedBook.dueDate).toLocaleDateString()}
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              borrowedBook.returned
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {borrowedBook.returned ? 'Returned' : 'Active'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BorrowedBooks




