const express = require('express');
const {
  addAddress,
  removeAddress,
  updateAddress,
  getLoggedUserAddresses,
  getAddress,
} = require('../controllers/addressController');
const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect, allowedTo('user'));

router.route('/').post(addAddress).get(getLoggedUserAddresses);
router
  .route('/:addressId')
  .get(getAddress)
  .put(updateAddress)
  .delete(removeAddress);

module.exports = router;
