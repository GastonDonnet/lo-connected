const ProductVariantImage = require('../../models/ProductVariantImage');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllProductVariantImages = factory.getAll(ProductVariantImage);
exports.getProductVariantImage = factory.getOne(ProductVariantImage);
exports.updateProductVariantImage = factory.updateOne(ProductVariantImage);
exports.deleteProductVariantImage = factory.deleteOne(ProductVariantImage);
