const OrderProduct = require('../../models/OrderProduct');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.setIds = factory.setIds('orderProductId');

exports.getAllOrderProducts = factory.getAll(OrderProduct, '[state]');
exports.getOrderProduct = factory.getOne(OrderProduct, '[state, transaction]');
exports.updateOrderProduct = factory.updateOne(OrderProduct);
exports.deleteOrderProduct = factory.deleteOne(OrderProduct);
