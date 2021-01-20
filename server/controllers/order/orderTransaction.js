const OrderTransaction = require('../../models/OrderTransaction');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllOrderTransactions = factory.getAll(OrderTransaction);
exports.getOrderTransaction = factory.getOne(OrderTransaction);
exports.updateOrderTransaction = factory.updateOne(OrderTransaction);
exports.deleteOrderTransaction = factory.deleteOne(OrderTransaction);
