const express = require('express');
const {
  createCashOrder,
  getAllOrders,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.route('/').get(getAllOrders);
router.get('/:id', getOrder);
router.post('/:cartId', allowedTo('user'), createCashOrder);

router.put('/:id/pay', allowedTo('admin', 'manager'), updateOrderToPaid);
router.put('/:id/deliver', allowedTo('admin', 'manager'), updateOrderToDelivered);

module.exports = router;
