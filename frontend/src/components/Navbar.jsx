import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, User, LogOut, Menu, X, Sun, Moon } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const [theme, setTheme] = useState(() => {
    try {
      // default to dark for stronger contrast per user request
      return localStorage.getItem('theme') || 'dark'
    } catch (e) {
      return 'dark'
    }
  })

  useEffect(() => {
    // apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close user menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsUserMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [userMenuRef])

  return (
    <nav
      style={{ backgroundColor: 'var(--nav-bg)' }}
      className={`fixed top-0 left-0 right-0 z-50 text-secondary-50 border-b border-secondary-800 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-300" />
            <span className="text-xl font-bold text-secondary-50">Vidya Versa</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-white/5 transition text-secondary-50"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              to="/"
              className="px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600 transition-colors"
            >
              Home
            </Link>
            
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                
                <Link
                  to="/borrowed"
                  className="px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600 transition-colors"
                >
                  My Books
                </Link>
                
                <div className="relative flex items-center space-x-4">
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 px-3 py-1 rounded-md hover:bg-white/5 transition"
                      aria-expanded={isUserMenuOpen}
                    >
                      <User className="h-5 w-5 text-primary-300" />
                      <span className="text-sm text-secondary-50">{user.name}</span>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 rounded-md shadow-lg py-3 px-4 z-50 border" style={{ 
                        background: 'var(--dropdown-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text-primary)'
                      }}>
                        <div className="text-sm font-semibold">{user.name}</div>
                        <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{user.email}</div>
                        <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Role: <span className="font-medium">{user.role}</span></div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => { setIsUserMenuOpen(false); navigate(user.role === 'admin' ? '/admin' : '/dashboard') }}
                            className="btn-secondary w-full"
                          >
                            Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className="btn-danger w-full"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
                <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-600 hover:text-secondary-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
          <div className={`md:hidden origin-top transition-transform duration-200 ${isMenuOpen ? 'scale-y-100' : 'scale-y-95'} ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div style={{ backgroundColor: 'rgb(51 65 85 / var(--tw-bg-opacity, 1))' }} className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-800">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    <Link 
                      to="/admin" 
                      className="block px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link 
                      to="/dashboard" 
                      className="block px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <Link 
                    to="/borrowed" 
                    className="block px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Books
                  </Link>
                  
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-5 w-5 text-primary-300" />
                      <span className="text-sm text-secondary-50">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-secondary-50 hover:text-red-400"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="block px-3 py-2 rounded-md border border-transparent text-secondary-50 hover:bg-primary-700/10 hover:border-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        className="block px-3 py-2 rounded-md border border-transparent text-primary-300 bg-primary-900/5 hover:bg-primary-700/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
            </div>
          </div>
      </div>
    </nav>
  )
}

export default Navbar




