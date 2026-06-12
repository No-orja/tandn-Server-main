const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    // The frontend sends/reads `review` (text) and `rating` (number).
    review: { type: String },
    rating: {
      type: Number,
      min: [1, 'Min rating value is 1.0'],
      max: [5, 'Max rating value is 5.0'],
      required: [true, 'review rating required'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },
  },
  { timestamps: true }
);

// one review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name' });
  next();
});

// Recalculate ratingsAverage + ratingsQuantity on the parent product.
reviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: 'product',
        avgRatings: { $avg: '$rating' },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  const Product = mongoose.model('Product');
  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: Math.round(result[0].avgRatings * 10) / 10,
      ratingsQuantity: result[0].ratingsQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

// Recalculate after a review is removed.
reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) await doc.constructor.calcAverageRatingsAndQuantity(doc.product);
});

// Recalculate after a review is edited (rating may have changed).
reviewSchema.post('findOneAndUpdate', async function (doc) {
  if (doc) await doc.constructor.calcAverageRatingsAndQuantity(doc.product);
});

module.exports = mongoose.model('Review', reviewSchema);
