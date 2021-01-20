const express = require('express');

const authController = require('../../controllers/user/auth');
const orderProductController = require('../../controllers/order/orderProduct');
const orderController = require('../../controllers/order/order');
const stateRouter = require('./orderProductState');
const transactionRouter = require('./orderProductTransaction');

const router = express.Router({ mergeParams: true });

router.use(orderController.setIds); // Setea Ids Order y User

//Nested
router.use('/:orderProductId/state', stateRouter); // Permite api/v1/order/1/product/1/state
router.use('/:orderProductId/transaction', transactionRouter);

//Orders
router.route('/').get(orderProductController.getAllOrderProducts);
router.route('/:id').get(orderProductController.getOrderProduct);
router
  .use(authController.restrictTo('admin'))
  .route('/:id')
  .patch(orderProductController.updateOrderProduct)
  .delete(orderProductController.deleteOrderProduct);

module.exports = router;
