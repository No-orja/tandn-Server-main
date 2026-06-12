const express = require('express');
const {
  getLoggedUserData,
  updateLoggedUserData,
  updateLoggedUserPassword,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router();

// All user routes require authentication.
router.use(protect);

// Logged-user self-service (used by the frontend).
router.get('/getMe', getLoggedUserData, getUser);
router.put('/updateMe', updateLoggedUserData);
router.put('/changeMyPassword', updateLoggedUserPassword);

// Admin user management (not used by the frontend; provided for completeness).
router.use(allowedTo('admin', 'manager'));
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
