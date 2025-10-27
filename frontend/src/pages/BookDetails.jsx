import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { ArrowLeft, BookOpen, Calendar, User, Tag, Hash, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

const BookDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [borrowing, setBorrowing] = useState(false)

  useEffect(() => {
    fetchBook()
  }, [id])

  const fetchBook = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/books/${id}`)
      setBook(response.data.book)
    } catch (error) {
      toast.error('Failed to fetch book details')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleBorrow = async () => {
    if (!user) {
      toast.error('Please login to borrow books')
      navigate('/login')
      return
    }

    setBorrowing(true)
    try {
      await axios.post('/api/users/borrow', { bookId: id })
      toast.success('Book borrowed successfully!')
      fetchBook() // Refresh book data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to borrow book')
    } finally {
      setBorrowing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary-600 mb-2">
            Book not found
          </h3>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Books</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Book Image */}
          <div className="space-y-4 flex items-center">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full rounded-xl shadow-lg object-contain max-h-[720px]"
            />
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-secondary-600 mb-4">
                by {book.author}
              </p>
            </div>

            {/* Book Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-primary-600" />
                <span className="text-secondary-700">
                  <strong>Category:</strong> {book.category}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-primary-600" />
                <span className="text-secondary-700">
                  <strong>ISBN:</strong> {book.isbn}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary-600" />
                <span className="text-secondary-700">
                  <strong>Publication Year:</strong> {book.publicationYear}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-primary-600" />
                <span className="text-secondary-700">
                  <strong>Available Copies:</strong> {book.availableCopies} / {book.totalCopies}
                </span>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Description
                </h3>
                <p className="text-secondary-700 leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}

            {/* Availability Status */}
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                book.availability 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {book.availability ? 'Available' : 'Not Available'}
              </span>
              
              {book.availability && (
                <span className="text-sm text-secondary-600">
                  {book.availableCopies} copies available
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {user && user.role === 'user' && book.availability && (
                <button
                  onClick={handleBorrow}
                  disabled={borrowing}
                  className="btn-primary flex items-center space-x-2"
                >
                  {borrowing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <BookOpen className="h-5 w-5" />
                      <span>Borrow Book</span>
                    </>
                  )}
                </button>
              )}

              {user && user.role === 'admin' && (
                <button
                  onClick={() => navigate(`/admin/edit-book/${book._id}`)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Eye className="h-5 w-5" />
                  <span>Edit Book</span>
                </button>
              )}

              {!user && (
                <div className="text-center">
                  <p className="text-secondary-600 mb-4">
                    Please login to borrow this book
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="btn-primary"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails




