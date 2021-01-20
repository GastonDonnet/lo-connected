const OrderState = require('../../models/OrderState');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllOrderStates = factory.getAll(OrderState);
exports.getOrderState = factory.getOne(OrderState);
exports.updateOrderState = factory.updateOne(OrderState);
exports.deleteOrderState = factory.deleteOne(OrderState);
