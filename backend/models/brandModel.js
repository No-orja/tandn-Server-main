const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, 'Brand must be unique'],
      minlength: [2, 'Too short brand name'],
    },
    slug: { type: String, lowercase: true },
    image: String,
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.image && !doc.image.startsWith('http')) {
    doc.image = `${process.env.BASE_URL}/brands/${doc.image}`;
  }
};
brandSchema.post('init', setImageURL);
brandSchema.post('save', setImageURL);

module.exports = mongoose.model('Brand', brandSchema);
