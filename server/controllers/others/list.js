const List = require('../../models/List');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllLists = factory.getAll(List, 'shops');
exports.getList = factory.getOne(List, 'shops');
exports.updateList = factory.updateOne(List);
exports.deleteList = factory.deleteOne(List);
