const Shop = require('../../models/Shop');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const CustomDate = require('../../utils/date');

exports.setIds = factory.setIds('shopId', false);

exports.getAllShops = factory.getAll(Shop);
exports.getShop = factory.getOne(
  Shop,
  '[category, review, employee, categories.products.images, address.city, state]',
  [
    'categories.products',
    (builder) => {
      builder.limit(5).where('active', 1);
    },
  ]
);
exports.deleteShop = factory.deleteOne(Shop);

exports.updateShop = catchAsync(async (req, res, next) => {
  if (req.file) {
    if (req.body.photoType == 'banner') {
      req.body.imgBanner = req.file.filename;
    } else {
      req.body.imgLogo = req.file.filename;
    }
    req.body.photoType = undefined;
  }

  const doc = await Shop.query().patchAndFetchById(req.params.id, req.body);

  if (!doc) {
    return next(new AppError('No document found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

// Buscador de Shops por nombre de Producto o Tienda
exports.searchShop = catchAsync(async (req, res, next) => {
  const products = await Product.query()
    .where('name', 'like', req.query.search)
    .select('shopId');
  console.log(products);
  const productsId = products.map((el) => el.shopId);

  const doc = await Shop.query()
    .whereIn('id', productsId)
    .orWhere('name', 'like', req.query.search);

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

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
  dest: 'public/img/shop/',
  fileFilter: multerFilter,
});
exports.uploadShopPhoto = upload.single('photo');

exports.resizeShopPhoto = catchAsync(async (req, res, next) => {
  console.log(req.file, req.body, req.params);
  if (!req.file) {
    return next();
  }
  if (!['banner', 'logo'].includes(req.body.photoType)) {
    return next();
  }

  req.file.filename = `shop-${req.body.photoType}-${
    req.params.id
  }-${Date.now()}.jpeg`;

  if (req.body.photoType == 'banner') {
    await sharp(req.file.buffer)
      .resize(1000, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/shop/${req.file.filename}`);
  } else {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/shop/${req.file.filename}`);
  }

  next();
});

/// RESUMENES PARA DASHBOARD
exports.getTotal = catchAsync(async (req, res, next) => {
  req.query.day = new CustomDate(req.query.day).MYSQLParse();

  let groupByRaw = '';
  if (req.query.freq == 'day') {
    groupByRaw = 'EXTRACT(DAY FROM order.updated_at)';
  } else if (req.query.freq == 'month') {
    groupByRaw = 'EXTRACT(YEAR_MONTH FROM order.updated_at)';
  } else if (req.query.freq == 'payment') {
    groupByRaw = 'delivery'; //TODO: CAMBIARA PAYMENT TYPE
  }

  const doc = await Order.query()
    .select('total', 'updatedAt', 'delivery') //TODO: CAMBIARA PAYMENT TYPE
    .sum('total as sumtotal')
    .where('shopId', req.params.id)
    .andWhere(
      'updatedAt',
      '>=',
      new CustomDate(req.query.from).MYSQLParse().slice(0, 10)
    )
    .andWhere(
      'updatedAt',
      '<=',
      new CustomDate(req.query.to).MYSQLParse().slice(0, 10)
    )
    .groupByRaw(groupByRaw)
    .debug();

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});
