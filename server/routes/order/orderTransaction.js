const express = require('express');

const authController = require('../../controllers/user/auth');
const orderController = require('../../controllers/order/order');
const orderTransactionController = require('../../controllers/order/orderTransaction');

const router = express.Router({ mergeParams: true });

router.use(orderController.setIds); // Setea Ids Order y User

router.route('/').get(orderTransactionController.getAllOrderTransactions);
router.route('/:id').get(orderTransactionController.getOrderTransaction);
router
  .use(authController.restrictTo('admin'))
  .route('/:id')
  .patch(orderTransactionController.updateOrderTransaction)
  .delete(orderTransactionController.deleteOrderTransaction);

module.exports = router;
