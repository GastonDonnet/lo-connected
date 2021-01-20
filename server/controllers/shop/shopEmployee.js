const ShopEmployee = require('../../models/ShopEmployee');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllShopEmployees = factory.getAll(ShopEmployee);
exports.getShopEmployee = factory.getOne(ShopEmployee, '[shop, user]');
exports.updateShopEmployee = factory.updateOne(ShopEmployee);
exports.deleteShopEmployee = factory.deleteOne(ShopEmployee);
