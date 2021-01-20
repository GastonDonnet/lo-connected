const express = require('express');

const authController = require('../../controllers/user/auth');
const orderController = require('../../controllers/order/order');
const stateRouter = require('./orderState');
const transactionRouter = require('./orderTransaction');
const productRouter = require('./orderProduct');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

// // //Nested

// router.use('/product', productRouter); // Permite api/v1/order/product

// router.use('/:orderId/product', productRouter); // Permite api/v1/order/1/product/...
router.use('/:orderId/state', stateRouter);
router.use('/:orderId/transaction', transactionRouter);

//Orders
router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router.route('/state/:id').patch(orderController.updateStateOrder);

module.exports = router;
