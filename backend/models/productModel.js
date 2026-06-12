const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      minlength: [3, 'Too short product title'],
    },
    slug: { type: String, lowercase: true },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [10, 'Too short product description'],
    },
    quantity: { type: Number, required: [true, 'Product quantity is required'] },
    sold: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      max: [2000000, 'Too long product price'],
    },
    priceAfterDiscount: Number,
    // The frontend reads/sends `availableColors` (array of hex strings).
    availableColors: [String],
    imageCover: {
      type: String,
      required: [true, 'Product image cover is required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    },
    subcategory: [{ type: mongoose.Schema.ObjectId, ref: 'SubCategory' }],
    brand: { type: mongoose.Schema.ObjectId, ref: 'Brand' },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
      default: 0,
    },
    ratingsQuantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for reviews (not embedded, lives in its own collection).
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// Turn stored filenames into absolute URLs the frontend uses as <img src>.
const setImageURL = (doc) => {
  if (doc.imageCover && !doc.imageCover.startsWith('http')) {
    doc.imageCover = `${process.env.BASE_URL}/products/${doc.imageCover}`;
  }
  if (doc.images) {
    doc.images = doc.images.map((img) =>
      img.startsWith('http') ? img : `${process.env.BASE_URL}/products/${img}`
    );
  }
};
productSchema.post('init', setImageURL);
productSchema.post('save', setImageURL);

module.exports = mongoose.model('Product', productSchema);
