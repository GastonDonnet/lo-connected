const crypto = require('crypto');

const Order = require('../../models/Order');
const OrderProduct = require('../../models/OrderProduct');
const OrderTransaction = require('../../models/OrderTransaction');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.setIds = factory.setIds('orderId');

exports.getAllOrders = factory.getAll(
  Order,
  '[state, transactions, products.[transactions, variant], shop]'
);
exports.getOrder = factory.getOne(
  Order,
  '[state, transactions, products.[transactions, variant.atributes.type], shop.address.city]'
);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);

exports.createOrder = catchAsync(async (req, res, next) => {
  const newDoc = await Order.transaction(async (trx) => {
    const newOrder = await Order.query(trx).insert({
      userId: req.body.userId,
      shopId: req.body.shopId,
      orderStateId: 1,
      statusId: 1,
      delivery: req.body.delivery,
      deliveryDate: req.body.delivery ? req.body.deliveryDate.day : undefined,
      deliveryTime: req.body.delivery
        ? `${req.body.deliveryTime.from} - ${req.body.deliveryTime.to}`
        : undefined,
      clientAddress: req.body.delivery
        ? `${req.body.address.street} - ${req.body.address.city.name}`
        : 'Retiro en local',
      note: `${req.body.note}`,
      token: crypto.randomBytes(16).toString('hex'), //TODO: VER TOKEN UNICO, CONBINAR CON FECHA?
    });

    const newOrderProducts = [];
    for (cartProduct of req.body.cart.products) {
      newOrderProducts.push(
        await OrderProduct.query(trx).insert({
          orderId: newOrder.id,
          orderProductStateId: 1,
          statusId: 1,
          productVariantId: cartProduct.productVariantId,
          quantity: cartProduct.quantity,
          price: cartProduct.product.price || cartProduct.product.product.price,
          subtotal:
            cartProduct.quantity *
            (cartProduct.product.price || cartProduct.product.product.price),
          note: cartProduct.note,
          token: crypto.randomBytes(16).toString('hex'),
          name: `${cartProduct.product.product.name} ${
            cartProduct.product.product.model
              ? cartProduct.product.product.model
              : ''
          }`,
        })
      );
    }

    // await Promise.all(newOrderProducts); //TODO: VER SI SE PUEDE MEJORAR, AHORA ESTA NO ASYNC
    await newOrder.$query(trx).patchAndFetch({
      total: newOrderProducts.reduce((ant, el) => (ant += el.subtotal), 0),
    });

    return newOrder;
  });

  res.status(201).json({
    status: 'success',
    data: newDoc,
  });
});

exports.updateStateOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.transaction(async (trx) => {
    const order = await Order.query(trx).findById(req.params.id);

    const transactionBody = {
      orderId: order.id,
      userId: req.user.id,
      orderStateId: order.orderStateId,
      newOrderStateId: req.body.orderStateId,
      validFrom: order.lastStateUpdate,
      validTo: new Date(),
      token: crypto.randomBytes(16).toString('hex'),
    };
    const transaction = await OrderTransaction.query(trx).insert(
      transactionBody
    );

    let statusId = 0;
    if (transaction.newOrderStateId == 1) statusId = 1;
    else if ([2, 3, 4].includes(transaction.newOrderStateId)) statusId = 2;
    else if (transaction.newOrderStateId == 5) statusId = 4;
    else if (transaction.newOrderStateId >= 100) statusId = 5;

    const orderBody = {
      statusId: statusId,
      lastStateUpdate: transaction.validTo,
      orderStateId: req.body.orderStateId,
    };
    const orderUpdated = await order
      .$query(trx)
      .patchAndFetchById(req.params.id, orderBody);

    return orderUpdated;
  });

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
