const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// @desc    Create cash order from a cart
// @route   POST /api/v1/orders/:cartId
// @access  Protected/User
exports.createCashOrder = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;

  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError(`There is no cart with id ${req.params.cartId}`, 404));
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;
  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body, // { details, city, postalCode, phone }
    totalOrderPrice,
    taxPrice,
    shippingPrice,
    paymentMethodType: 'cash',
  });

  // Decrement stock + increment sold, then clear the cart.
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }));
    await Product.bulkWrite(bulkOption, {});
    await Cart.findByIdAndDelete(req.params.cartId);
  }

  // OrderPayCashHook checks response.status === 201.
  res.status(201).json({ status: 'success', data: order });
});

// @desc    Get all orders (user -> own, admin/manager -> all)
// @route   GET /api/v1/orders
// @access  Protected
exports.getAllOrders = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'user' ? { user: req.user._id } : {};

  // Optional status filters: ?isPaid=true|false & ?isDelivered=true|false.
  // Anything else (missing/invalid) leaves the list unfiltered.
  if (req.query.isPaid === 'true' || req.query.isPaid === 'false') {
    filter.isPaid = req.query.isPaid === 'true';
  }
  if (req.query.isDelivered === 'true' || req.query.isDelivered === 'false') {
    filter.isDelivered = req.query.isDelivered === 'true';
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 50;
  const skip = (page - 1) * limit;

  const totalOrders = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  // GetAllUserOrderHook reads resAllOrder.data and resAllOrder.pagination.totalPages.
  res.status(200).json({
    results: orders.length,
    pagination: {
      totalPages: Math.ceil(totalOrders / limit) || 1,
      currentPage: page,
    },
    data: orders,
  });
});

// @desc    Get specific order
// @route   GET /api/v1/orders/:id
// @access  Protected
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError(`No order for this id ${req.params.id}`, 404));
  }
  if (
    req.user.role === 'user' &&
    order.user._id.toString() !== req.user._id.toString()
  ) {
    return next(new ApiError('You are not allowed to access this order', 403));
  }
  res.status(200).json({ data: order });
});

// @desc    Update order paid status
// @route   PUT /api/v1/orders/:id/pay
// @access  Protected/Admin
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError(`No order for this id ${req.params.id}`, 404));
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  const updatedOrder = await order.save();
  res.status(200).json({ status: 'success', data: updatedOrder });
});

// @desc    Update order delivered status
// @route   PUT /api/v1/orders/:id/deliver
// @access  Protected/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError(`No order for this id ${req.params.id}`, 404));
  }
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();
  res.status(200).json({ status: 'success', data: updatedOrder });
});
