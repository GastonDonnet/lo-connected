const ProductVariant = require('../../models/ProductVariant');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.setIds = factory.setIds('productVariantId');

exports.getAllProductVariants = factory.getAll(ProductVariant);
exports.getProductVariant = factory.getOne(ProductVariant, '[atributes.type]');
exports.updateProductVariant = factory.updateOne(ProductVariant);
exports.deleteProductVariant = factory.deleteOne(ProductVariant);
