const express = require('express');

const authController = require('../../controllers/user/auth');
const cartController = require('../../controllers/cart/cart');

const cartProductRouter = require('./cartProduct');

const router = express.Router();

//Carts
router.use(authController.protect);
router.use('/:cartId/product', cartController.setIds, cartProductRouter);

router
  .route('/')
  .get(cartController.getAllCarts)
  .post(cartController.createCart);

router
  .route('/:id')
  .get(cartController.getCart)
  .delete(cartController.deleteCart);

module.exports = router;
