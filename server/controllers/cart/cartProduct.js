const CartProduct = require('../../models/CartProduct');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.query()
      .insert(req.body)
      .withGraphFetched('[product.product]');

    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
  });
};

updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    if (req.body.quantity <= 0) {
      const doc = await Model.query().deleteById(req.params.id);

      if (!doc) {
        return next(new AppError('No document found with that id', 404));
      }

      res.status(204).json({});
      return;
    }

    const doc = await Model.query()
      .patchAndFetchById(req.params.id, req.body)
      .withGraphFetched('[product.product]');

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};

exports.createCartProduct = createOne(CartProduct);
exports.getAllCartProducts = factory.getAll(CartProduct);
exports.getCartProduct = factory.getOne(CartProduct, '[product.product]');
exports.updateCartProduct = updateOne(CartProduct);
exports.deleteCartProduct = factory.deleteOne(CartProduct);
