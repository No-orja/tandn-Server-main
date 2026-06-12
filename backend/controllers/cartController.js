const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.count * item.price;
  });
  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  cart.coupon = undefined;
  return totalPrice;
};

// Re-fetch the cart with everything the frontend reads on each item and map
// `cartItems` -> `products` (Cart.js reads `data.products`, item.product.category.name etc.)
const buildCartResponse = async (cartId) => {
  const cart = await Cart.findById(cartId).populate({
    path: 'cartItems.product',
    select: 'title imageCover ratingsAverage ratingsQuantity price category brand',
    populate: [
      { path: 'category', select: 'name' },
      { path: 'brand', select: 'name' },
    ],
  });

  if (!cart) return null;

  return {
    _id: cart._id,
    products: cart.cartItems.map((item) => ({
      _id: item._id,
      product: item.product,
      count: item.count,
      color: item.color,
      price: item.price,
    })),
    totalCartPrice: cart.totalCartPrice,
    totalAfterDiscount: cart.totalPriceAfterDiscount,
    coupon: cart.coupon,
  };
};

const sendCart = async (res, statusCode, cart, extra = {}) => {
  const data = await buildCartResponse(cart._id);
  res.status(statusCode).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data,
    ...extra,
  });
};

// @desc    Add product to cart
// @route   POST /api/v1/cart
// @access  Protected/User
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);
  if (!product) return next(new ApiError('No product for this id', 404));

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color: color || '', price: product.price }],
    });
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === productId && item.color === (color || '')
    );
    if (productIndex > -1) {
      cart.cartItems[productIndex].count += 1;
    } else {
      cart.cartItems.push({
        product: productId,
        color: color || '',
        price: product.price,
      });
    }
  }

  calcTotalCartPrice(cart);
  await cart.save();

  // AddToCartHook reads response.data.status === "success" and response.data.message.
  await sendCart(res, 201, cart, {
    message: 'Product added to cart successfully.',
  });
});

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Protected/User
exports.getLoggedUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(200).json({
      status: 'success',
      numOfCartItems: 0,
      data: { _id: null, products: [], totalCartPrice: 0 },
    });
  }

  await sendCart(res, 200, cart);
});

// @desc    Update specific cart item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Protected/User
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { count } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new ApiError('There is no cart for this user', 404));

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );
  if (itemIndex === -1) {
    return next(new ApiError(`No item for this id ${req.params.itemId}`, 404));
  }

  cart.cartItems[itemIndex].count = Number(count);
  calcTotalCartPrice(cart);
  await cart.save();

  await sendCart(res, 200, cart);
});

// @desc    Apply coupon on cart
// @route   PUT /api/v1/cart/applyCoupon
// @access  Protected/User
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  // ApplyCopuonHook sends { couponName }.
  const coupon = await Coupon.findOne({
    name: req.body.couponName,
    expire: { $gt: Date.now() },
  });
  if (!coupon) return next(new ApiError('Coupon is invalid or expired', 400));

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new ApiError('There is no cart for this user', 404));

  const totalPrice = cart.totalCartPrice;
  const totalPriceAfterDiscount = (
    totalPrice - (totalPrice * coupon.discount) / 100
  ).toFixed(2);

  cart.totalPriceAfterDiscount = +totalPriceAfterDiscount;
  cart.coupon = coupon.name;
  await cart.save();

  await sendCart(res, 200, cart);
});

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Protected/User
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.itemId } } },
    { new: true }
  );
  if (!cart) return next(new ApiError('There is no cart for this user', 404));

  calcTotalCartPrice(cart);
  await cart.save();

  await sendCart(res, 200, cart);
});

// @desc    Clear logged user cart
// @route   DELETE /api/v1/cart
// @access  Protected/User
exports.clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(200).json({ status: 'success', message: 'Cart cleared' });
});
