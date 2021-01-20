const AtributeType = require('../../models/AtributeType');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllAtributeTypes = factory.getAll(AtributeType);
exports.getAtributeType = factory.getOne(AtributeType);
exports.updateAtributeType = factory.updateOne(AtributeType);
exports.deleteAtributeType = factory.deleteOne(AtributeType);
