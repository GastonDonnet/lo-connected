const MasterProduct = require('../../models/MasterProduct');
const AtributeType = require('../../models/AtributeType');
const AtributeValue = require('../../models/AtributeValue');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const { filterObj } = require('../../utils/utils');

exports.setIds = factory.setIds('productId');

exports.getAllMasterProducts = factory.getAll(
  MasterProduct,
  '[atributes.values]'
);
exports.getMasterProduct = factory.getOne(MasterProduct, '[atributes.values]');
exports.updateMasterProduct = factory.updateOne(MasterProduct);
exports.deleteMasterProduct = factory.deleteOne(MasterProduct);
exports.createMasterProduct = catchAsync(async (req, res, next) => {
  const newDoc = await MasterProduct.transaction(async (trx) => {
    const newMasterProduct = await MasterProduct.query(trx).insert(
      req.body.masterProduct
    );

    for (atribute of req.body.atributes) {
      const atributeTypeBody = filterObj(atribute, 'type', 'name');
      atributeTypeBody.masterProductId = newMasterProduct.id;
      const newAtributeType = await AtributeType.query(trx).insert(
        atributeTypeBody
      );

      for (value of atribute.values) {
        const atributeValueBody = { value, atributeTypeId: newAtributeType.id };
        console.log(atributeValueBody);
        await AtributeValue.query(trx).insert(atributeValueBody);
      }
    }

    return newMasterProduct;
  });

  res.status(201).json({
    status: 'success',
    data: newDoc,
  });
});
