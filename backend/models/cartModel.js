const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        count: { type: Number, default: 1 },
        color: String,
        price: Number,
      },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    coupon: String, // applied coupon name (frontend reads `data.coupon`)
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
