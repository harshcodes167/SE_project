import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Search, BookOpen, Users, Calendar, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [searchTerm, categoryFilter, authorFilter])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (categoryFilter) params.append('category', categoryFilter)
      if (authorFilter) params.append('author', authorFilter)
      
      const response = await axios.get(`/api/books?${params}`)
      setBooks(response.data.books)
      
      // Extract unique categories and authors
      const uniqueCategories = [...new Set(response.data.books.map(book => book.category))]
      const uniqueAuthors = [...new Set(response.data.books.map(book => book.author))]
      setCategories(uniqueCategories)
      setAuthors(uniqueAuthors)
    } catch (error) {
      toast.error('Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setCategoryFilter('')
    setAuthorFilter('')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--text-primary)' }}>
  <div className="bg-gradient-to-r from-rose-50 to-[#7c98ce]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-slide-up relative">
              <span className="">Welcome to Vidya Verse</span>
              <div className="absolute -bottom-4 left-1/2 w-28 h-1 bg-secondary-700 transform -translate-x-1/2 animate-scale-in"></div>
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in" style={{ color: 'var(--text-primary)' }}>
              Discover, Borrow, and Manage Books with Ease
            </p>
            <p className="typewriter inline-block overflow-hidden whitespace-nowrap animate-typing" style={{ borderRight: '4px solid var(--text-primary)', color: 'var(--text-primary)' }}>
              "Where knowledge meets technology — manage, discover, and inspire."
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card mb-8 search-card">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search books by title, author, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div className="lg:w-48">
              <select
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="input-field"
              >
                <option value="">All Authors</option>
                {authors.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Books Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: 'transparent', borderBottomColor: 'var(--text-primary)' }}></div>
              </div>
            ) : (
          <>
            <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Available Books ({books.length})
              </h2>
            </div>

            {books.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                  No books found
                </h3>
                <p className="text-secondary-500">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div key={book._id} className="card hover:shadow-lg transition-shadow duration-200 flex flex-col">
                    <div className="aspect-w-3 aspect-h-4 mb-4">
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-2 flex-1 flex flex-col">
                      <h3 className="font-semibold line-clamp-1 text-ellipsis" style={{ color: 'var(--text-primary)' }}>
                        {book.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                        by {book.author}
                      </p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                        {book.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'var(--text-primary)', opacity: 0.75 }}>
                          {book.publicationYear}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          book.availability 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {book.availability ? 'Available' : 'Borrowed'}
                        </span>
                      </div>
                      <Link
                        to={`/book/${book._id}`}
                        className="btn-primary w-full text-center block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home




