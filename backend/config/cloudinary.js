const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an in-memory image buffer to Cloudinary and resolve to its secure URL.
// Image fields on products/categories/brands store this full URL, so the
// models' legacy setImageURL hooks (which skip anything starting with "http")
// leave it untouched.
const uploadBuffer = (buffer, folder, publicId) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `tandinshop/${folder}`,
        public_id: publicId,
        resource_type: 'image',
      },
      (err, result) => (err ? reject(err) : resolve(result.secure_url))
    );
    stream.end(buffer);
  });

module.exports = { cloudinary, uploadBuffer };
