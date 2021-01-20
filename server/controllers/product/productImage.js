const ProductImage = require('../../models/ProductImage');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllProductImages = factory.getAll(ProductImage);
exports.getProductImage = factory.getOne(ProductImage);
exports.updateProductImage = factory.updateOne(ProductImage);
exports.deleteProductImage = factory.deleteOne(ProductImage);

// Imagenes
const multer = require('multer'); // Para manejar input de archivos
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('No subio una imagen! por favor suba solo imagenes', 400));
  }
};

// Para manejar archivos de fotos. USAR MULTIFORM DATA
const upload = multer({
  storage: multerStorage,
  dest: 'public/img/product/',
  fileFilter: multerFilter,
});

exports.uploadProductPhotos = upload.fields([{ name: 'photos', maxCount: 10 }]);

exports.resizeProductPhotos = catchAsync(async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  if (!req.files.photos) {
    return next();
  }
  req.body.photos = [];

  await Promise.all(
    req.files.photos.map(async (img, i) => {
      const imgName = `product-${req.params.shopId}-${
        i + 1
      }-${Date.now()}.jpeg`;
      req.body.photos.push(imgName);
      await sharp(img.buffer)
        //.resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/product/${imgName}`);
    })
  );
  console.log('Ok');
  next();
});

/* 
exports.uploadProductPhotos = upload.single('photos');

exports.resizeProductPhotos = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return next();
  }

  req.file.filename = `product-${req.params.shopId}-${Date.now()}.jpeg`;

  await sharp(img.buffer)
    //.resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/product/${req.file.filename}`);

  next();
}); */
