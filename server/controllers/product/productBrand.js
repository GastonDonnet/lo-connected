const ProductBrand = require('../../models/ProductBrand');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllProductBrands = factory.getAll(ProductBrand);
exports.getProductBrand = factory.getOne(ProductBrand);
exports.createProductBrand = factory.createOne(ProductBrand);
exports.updateProductBrand = factory.updateOne(ProductBrand);
exports.deleteProductBrand = factory.deleteOne(ProductBrand);
