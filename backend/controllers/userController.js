const User = require('../models/User');
const Book = require('../models/Book');

// @desc    Borrow a book
// @route   POST /api/users/borrow
// @access  Private
const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    // Check if user already has 3 books borrowed
    const user = await User.findById(userId);
    const activeBorrows = user.borrowedBooks.filter(borrow => !borrow.returned);
    
    if (activeBorrows.length >= 3) {
      return res.status(400).json({
        success: false,
        message: 'You can only borrow 3 books at a time'
      });
    }

    // Check if user already borrowed this book
    const alreadyBorrowed = activeBorrows.find(borrow => 
      borrow.book.toString() === bookId
    );
    
    if (alreadyBorrowed) {
      return res.status(400).json({
        success: false,
        message: 'You have already borrowed this book'
      });
    }

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Book is not available'
      });
    }

    // Add book to user's borrowed books
    user.borrowedBooks.push({
      book: bookId,
      borrowedDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    });

    // Update book availability
    book.availableCopies -= 1;
    if (book.availableCopies === 0) {
      book.availability = false;
    }

    await user.save();
    await book.save();

    res.json({
      success: true,
      message: 'Book borrowed successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Return a book
// @route   POST /api/users/return
// @access  Private
const returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const borrowedBook = user.borrowedBooks.find(borrow => 
      borrow.book.toString() === bookId && !borrow.returned
    );

    if (!borrowedBook) {
      return res.status(400).json({
        success: false,
        message: 'You have not borrowed this book'
      });
    }

    // Mark book as returned
    borrowedBook.returned = true;

    // Update book availability
    const book = await Book.findById(bookId);
    book.availableCopies += 1;
    book.availability = true;

    await user.save();
    await book.save();

    res.json({
      success: true,
      message: 'Book returned successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's borrowed books
// @route   GET /api/users/borrowed
// @access  Private
const getBorrowedBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('borrowedBooks.book', 'title author isbn imageUrl')
      .select('borrowedBooks');

    const borrowedBooks = user.borrowedBooks.filter(borrow => !borrow.returned);

    res.json({
      success: true,
      borrowedBooks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's borrowing history
// @route   GET /api/users/history
// @access  Private
const getBorrowingHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('borrowedBooks.book', 'title author isbn imageUrl')
      .select('borrowedBooks');

    res.json({
      success: true,
      history: user.borrowedBooks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    
    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const regularUsers = await User.countDocuments({ role: 'user' });

    res.json({
      success: true,
      stats: {
        totalUsers,
        adminUsers,
        regularUsers
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  getBorrowingHistory,
  getUsers,
  getUserStats
};




