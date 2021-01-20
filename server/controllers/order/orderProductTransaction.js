const OrderProductTransaction = require('../../models/OrderProductTransaction');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllOrderProductTransactions = factory.getAll(
  OrderProductTransaction
);
exports.getOrderProductTransaction = factory.getOne(OrderProductTransaction);
exports.updateOrderProductTransaction = factory.updateOne(
  OrderProductTransaction
);
exports.deleteOrderProductTransaction = factory.deleteOne(
  OrderProductTransaction
);
