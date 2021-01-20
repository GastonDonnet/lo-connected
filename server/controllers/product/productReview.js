const ProductReview = require('../../models/ProductReview');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllProductReviews = factory.getAll(ProductReview);
exports.getProductReview = factory.getOne(ProductReview);
exports.updateProductReview = factory.updateOne(ProductReview);
exports.deleteProductReview = factory.deleteOne(ProductReview);
