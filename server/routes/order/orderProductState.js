const express = require('express');

const authController = require('../../controllers/user/auth');
const orderController = require('../../controllers/order/order');
const orderProductController = require('../../controllers/order/orderProduct');
const orderProductStateController = require('../../controllers/order/orderProductState');

const router = express.Router();

router.use(orderController.setIds); // Setea Ids Order y User
router.use(orderProductController.setIds); // Setea Ids Order y User

router.route('/').get(orderProductStateController.getAllOrderProductStates);
router.route('/:id').get(orderProductStateController.getOrderProductState);
router
  .use(authController.restrictTo('admin'))
  .route('/:id')
  .patch(orderProductStateController.updateOrderProductState)
  .delete(orderProductStateController.deleteOrderProductState);

module.exports = router;
