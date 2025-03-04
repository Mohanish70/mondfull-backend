const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db'); // Ensure correct import

const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const meditationRoutes = require('./routes/meditationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// CORS configuration to allow multiple origins
const allowedOrigins = ['http://localhost:3000', 'http://192.168.129.120:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request if the origin is allowed
    } else {
      callback(new Error('Not allowed by CORS')); // Reject requests from non-allowed origins
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies and auth headers
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/meditations', meditationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
