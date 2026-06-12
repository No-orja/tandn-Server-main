const ApiError = require('../utils/apiError');

const sendErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  });

const sendErrorProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
  });

const handleJwtInvalidSignature = () =>
  new ApiError('Invalid token, please login again', 401);
const handleJwtExpired = () =>
  new ApiError('Expired token, please login again', 401);

const handleDuplicateFields = (err) => {
  const field = Object.keys(err.keyValue || {})[0] || 'field';
  return new ApiError(`Duplicate value for "${field}". Please use another value.`, 400);
};

const handleValidationErrorDB = (err) => {
  const messages = Object.values(err.errors).map((el) => el.message);
  const e = new ApiError(`Invalid input data. ${messages.join('. ')}`, 400);
  e.errors = Object.values(err.errors).map((el) => ({ param: el.path, msg: el.message }));
  return e;
};

const handleCastErrorDB = (err) =>
  new ApiError(`Invalid ${err.path}: ${err.value}`, 400);

// eslint-disable-next-line no-unused-vars
const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = err;
    if (err.name === 'JsonWebTokenError') error = handleJwtInvalidSignature();
    if (err.name === 'TokenExpiredError') error = handleJwtExpired();
    if (err.code === 11000) error = handleDuplicateFields(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    sendErrorProd(error, res);
  }
};

module.exports = globalError;
