const express = require('express');

const authController = require('../../controllers/user/auth');
const orderController = require('../../controllers/order/order');
const orderProductController = require('../../controllers/order/orderProduct');
const orderProductTransactionController = require('../../controllers/order/orderProductTransaction');

const router = express.Router({ mergeParams: true });

router.use(orderController.setIds); // Setea Ids Order y User
router.use(orderProductController.setIds); // Setea Ids Order y User

router
  .route('/')
  .get(orderProductTransactionController.getAllOrderProductTransactions);
router
  .route('/:id')
  .get(orderProductTransactionController.getOrderProductTransaction);
router
  .use(authController.restrictTo('admin'))
  .route('/:id')
  .patch(orderProductTransactionController.updateOrderProductTransaction)
  .delete(orderProductTransactionController.deleteOrderProductTransaction);

module.exports = router;
