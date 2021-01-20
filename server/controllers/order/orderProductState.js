const OrderProductState = require('../../models/OrderProductState');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllOrderProductStates = factory.getAll(OrderProductState);
exports.getOrderProductState = factory.getOne(OrderProductState);
exports.updateOrderProductState = factory.updateOne(OrderProductState);
exports.deleteOrderProductState = factory.deleteOne(OrderProductState);
