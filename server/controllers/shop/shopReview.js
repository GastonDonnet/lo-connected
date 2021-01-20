const Shop = require('../../models/Shop');
const ShopEmployee = require('../../models/ShopEmployee');
const ShopReview = require('../../models/ShopReview');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllShopReviews = factory.getAll(ShopReview);
exports.getShopReview = factory.getOne(ShopReview, 'shop');
exports.updateShopReview = factory.updateOne(ShopReview);
exports.deleteShopReview = factory.deleteOne(ShopReview);
