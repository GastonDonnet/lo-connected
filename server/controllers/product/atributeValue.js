const AtributeValue = require('../../models/AtributeValue');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllAtributeValues = factory.getAll(AtributeValue);
exports.getAtributeValue = factory.getOne(AtributeValue);
exports.updateAtributeValue = factory.updateOne(AtributeValue);
exports.deleteAtributeValue = factory.deleteOne(AtributeValue);
