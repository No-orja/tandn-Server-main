const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const dbConnection = require('./config/db');
const mountRoutes = require('./routes');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Connect to database
dbConnection();

const app = express();

// CORS — allow the deployed frontend (CLIENT_URL) and the local dev server.
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3000'].filter(
  Boolean
);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.options('*', cors());

// Body parser
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically. Filenames are returned as absolute URLs
// like http://localhost:8000/products/<file>.jpeg, http://localhost:8000/categories/...
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'TandinShop API is running 🚀' });
});

// Mount API routes
mountRoutes(app);

// Handle unmatched routes
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handler (must be last)
app.use(globalError);

// On Vercel the app runs as a serverless function (exported via api/index.js)
// — only listen when running as a normal Node process (local dev / npm start).
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 8000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 App running on port ${PORT} — ${process.env.BASE_URL}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection: ${err.name} | ${err.message}`);
    server.close(() => {
      console.error('Shutting down...');
      process.exit(1);
    });
  });
}

module.exports = app;
