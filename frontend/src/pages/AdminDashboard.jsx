import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BookOpen, Users, TrendingUp, Plus, Edit, Trash2, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [booksRes, usersRes, bookStatsRes, userStatsRes] = await Promise.all([
        axios.get('/api/books?limit=10'),
        axios.get('/api/users'),
        axios.get('/api/books/stats'),
        axios.get('/api/users/stats')
      ])
      
      setBooks(booksRes.data.books)
      setUsers(usersRes.data.users)
      setStats({
        ...bookStatsRes.data.stats,
        ...userStatsRes.data.stats
      })
    } catch (error) {
      toast.error('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return
    }

    setDeleting(bookId)
    try {
      await axios.delete(`/api/books/${bookId}`)
      toast.success('Book deleted successfully!')
      fetchDashboardData() // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete book')
    } finally {
      setDeleting(null)
    }
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
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-secondary-600">
            Manage books, users, and monitor library activities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Total Books</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.totalBooks || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Available Books</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.availableBooks || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Borrowed Books</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.borrowedBooks || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Total Users</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.totalUsers || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Books */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                Recent Books
              </h2>
              <Link
                to="/admin/add-book"
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </Link>
            </div>

            {books.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">No books found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="flex items-center space-x-4 p-4 border border-secondary-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-secondary-600 text-sm mb-2">
                        by {book.author}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          book.availability 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {book.availability ? 'Available' : 'Borrowed'}
                        </span>
                        <span className="text-secondary-500">
                          {book.availableCopies}/{book.totalCopies} copies
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/book/${book._id}`}
                        className="p-2 text-secondary-400 hover:text-primary-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/admin/edit-book/${book._id}`}
                        className="p-2 text-secondary-400 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        disabled={deleting === book._id}
                        className="p-2 text-secondary-400 hover:text-red-600 disabled:opacity-50"
                      >
                        {deleting === book._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Users */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                Users ({users.length})
              </h2>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">No users found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.slice(0, 5).map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center space-x-4 p-4 border border-secondary-200 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900">
                        {user.name}
                      </h3>
                      <p className="text-secondary-600 text-sm">
                        {user.email}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard




