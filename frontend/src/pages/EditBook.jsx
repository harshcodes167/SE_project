import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'

const EditBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publicationYear: '',
    imageUrl: '',
    description: '',
    totalCopies: 1
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBook()
  }, [id])

  const fetchBook = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/books/${id}`)
      const book = response.data.book
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        publicationYear: book.publicationYear.toString(),
        imageUrl: book.imageUrl,
        description: book.description || '',
        totalCopies: book.totalCopies
      })
    } catch (error) {
      toast.error('Failed to fetch book details')
      navigate('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const bookData = {
        ...formData,
        publicationYear: parseInt(formData.publicationYear),
        totalCopies: parseInt(formData.totalCopies)
      }

      await axios.put(`/api/books/${id}`, bookData)
      toast.success('Book updated successfully!')
      navigate('/admin')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update book')
    } finally {
      setSaving(false)
    }
  }

  const categories = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery',
    'Romance', 'Thriller', 'Biography', 'History', 'Science',
    'Technology', 'Philosophy', 'Art', 'Poetry', 'Drama'
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Edit Book
          </h1>
          <p className="text-secondary-600">
            Update the book details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-secondary-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter book title"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-secondary-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label htmlFor="isbn" className="block text-sm font-medium text-secondary-700 mb-2">
                  ISBN *
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  required
                  value={formData.isbn}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter ISBN"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="publicationYear" className="block text-sm font-medium text-secondary-700 mb-2">
                  Publication Year *
                </label>
                <input
                  type="number"
                  id="publicationYear"
                  name="publicationYear"
                  required
                  min="1000"
                  max={new Date().getFullYear()}
                  value={formData.publicationYear}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter publication year"
                />
              </div>

              <div>
                <label htmlFor="totalCopies" className="block text-sm font-medium text-secondary-700 mb-2">
                  Total Copies *
                </label>
                <input
                  type="number"
                  id="totalCopies"
                  name="totalCopies"
                  required
                  min="1"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter number of copies"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-secondary-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter image URL"
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Book preview"
                      className="w-32 h-40 object-cover rounded-lg border border-secondary-200"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-secondary-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter book description"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-secondary-200">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center space-x-2"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <BookOpen className="h-5 w-5" />
                  <span>Update Book</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook




