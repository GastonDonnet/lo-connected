const Permission = require('../../models/Permission');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllPermissions = factory.getAll(Permission);
exports.getPermission = factory.getOne(Permission);
exports.updatePermission = factory.updateOne(Permission);
exports.deletePermission = factory.deleteOne(Permission);
