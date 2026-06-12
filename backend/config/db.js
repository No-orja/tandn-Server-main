const mongoose = require('mongoose');

// Cache the connection promise so serverless invocations that reuse a warm
// instance don't open a new connection each time.
let connPromise = null;

const dbConnection = () => {
  if (!connPromise) {
    connPromise = mongoose
      .connect(process.env.DB_URI)
      .then((conn) => {
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((err) => {
        connPromise = null;
        console.error(`❌ MongoDB connection error: ${err.message}`);
        // In a serverless function we must not kill the process; locally we do.
        if (!process.env.VERCEL) process.exit(1);
        throw err;
      });
  }
  return connPromise;
};

module.exports = dbConnection;
