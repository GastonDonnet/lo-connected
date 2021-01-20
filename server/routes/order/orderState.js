const express = require('express');

const authController = require('../../controllers/user/auth');
const orderController = require('../../controllers/order/order');
const orderStateController = require('../../controllers/order/orderState');

const router = express.Router({ mergeParams: true });

router.use(orderController.setIds); // Setea Ids Order y User

router.route('/').get(orderStateController.getAllOrderStates);
router.route('/:id').get(orderStateController.getOrderState);
router
  .use(authController.restrictTo('admin'))
  .route('/:id')
  .patch(orderStateController.updateOrderState)
  .delete(orderStateController.deleteOrderState);

module.exports = router;
