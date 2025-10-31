const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Please provide an author'],
    trim: true,
    maxlength: [50, 'Author name cannot be more than 50 characters']
  },
  isbn: {
    type: String,
    required: [true, 'Please provide an ISBN'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true,
    maxlength: [30, 'Category cannot be more than 30 characters']
  },
  publicationYear: {
    type: Number,
    required: [true, 'Please provide publication year'],
    min: [1000, 'Publication year must be valid'],
    max: [new Date().getFullYear(), 'Publication year cannot be in the future']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=No+Image'
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  availability: {
    type: Boolean,
    default: true
  },
  totalCopies: {
    type: Number,
    required: [true, 'Please provide total copies'],
    min: [1, 'Total copies must be at least 1'],
    default: 1
  },
  availableCopies: {
    type: Number,
    required: [true, 'Please provide available copies'],
    min: [0, 'Available copies cannot be negative'],
    default: 1
  }
}, {
  timestamps: true
});

bookSchema.pre('save', function(next) {
  if (this.isModified('totalCopies')) {
    
    const oldTotal = this.get('totalCopies', { getters: false });
    const diff = this.totalCopies - (oldTotal || 0);
    
  
    this.availableCopies = Math.max(0, (this.availableCopies || 0) + diff);
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);




