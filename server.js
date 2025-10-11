const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Library Backend Running 🚀');
});

const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
