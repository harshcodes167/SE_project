const express = require('express');
const {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  getBorrowingHistory,
  getUsers,
  getUserStats
} = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/borrow', authMiddleware, borrowBook);
router.post('/return', authMiddleware, returnBook);
router.get('/borrowed', authMiddleware, getBorrowedBooks);
router.get('/history', authMiddleware, getBorrowingHistory);
router.get('/', authMiddleware, adminMiddleware, getUsers);
router.get('/stats', authMiddleware, adminMiddleware, getUserStats);

module.exports = router;




