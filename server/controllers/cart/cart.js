const Cart = require('../../models/Cart');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.setIds = factory.setIds('cartId', false);
exports.createCart = catchAsync(async (req, res, next) => {
  const newDoc = await Cart.query()
    .insert(req.body)
    .withGraphFetched('[products.product.[product, atributes.type]]');

  res.status(201).json({
    status: 'success',
    data: newDoc,
  });
});

exports.getAllCarts = factory.getAll(Cart);
exports.getCart = factory.getOne(
  Cart,
  '[products.product.[product.brand, atributes.type]]'
);
exports.deleteCart = factory.deleteOne(Cart);
