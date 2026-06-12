const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a user'],
    },
    cartItems: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    taxPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    totalOrderPrice: Number,
    paymentMethodType: { type: String, enum: ['card', 'cash'], default: 'cash' },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
  },
  {
    timestamps: true,
    // Expose the `id` virtual (the frontend order item reads `order.id`).
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name email phone' }).populate({
    path: 'cartItems.product',
    select: 'title imageCover ratingsAverage ratingsQuantity price',
  });
  next();
});

module.exports = mongoose.model('Order', orderSchema);
