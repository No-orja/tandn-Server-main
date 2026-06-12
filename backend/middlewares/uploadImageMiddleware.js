const multer = require('multer');
const ApiError = require('../utils/apiError');

// Keep files in memory so sharp can process them before writing to disk.
const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only image files are allowed', 400), false);
    }
  };

  return multer({ storage: multerStorage, fileFilter: multerFilter });
};

const uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

const uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);

module.exports = { uploadSingleImage, uploadMixOfImages };
