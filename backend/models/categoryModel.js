const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category required'],
      unique: [true, 'Category must be unique'],
      minlength: [2, 'Too short category name'],
    },
    slug: { type: String, lowercase: true },
    image: String,
  },
  { timestamps: true }
);

// Return the stored filename as an absolute URL the frontend can use directly.
const setImageURL = (doc) => {
  if (doc.image && !doc.image.startsWith('http')) {
    doc.image = `${process.env.BASE_URL}/categories/${doc.image}`;
  }
};
categorySchema.post('init', setImageURL);
categorySchema.post('save', setImageURL);

module.exports = mongoose.model('Category', categorySchema);
