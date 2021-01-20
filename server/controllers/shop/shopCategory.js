const ShopCategory = require('../../models/ShopCategory');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllShopCategories = factory.getAll(ShopCategory);
exports.getShopCategory = factory.getOne(ShopCategory, 'parentCategory');
exports.updateShopCategory = factory.updateOne(ShopCategory);
exports.deleteShopCategory = factory.deleteOne(ShopCategory);
