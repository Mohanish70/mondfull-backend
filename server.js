require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const meditationRoutes = require('./routes/meditationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  'http://localhost:3000',
  'https://mind-full-nine.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Health route
app.get('/', (req, res) => {
  res.send('✅ Mindfull Backend is running...');
});

// Debug route
app.get('/api/debug/env', (req, res) => {
  res.json({
    node_env: process.env.NODE_ENV,
    db_connected: mongoose.connection.readyState === 1,
    jwt_secret: !!process.env.JWT_SECRET
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/meditations', meditationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Error middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
