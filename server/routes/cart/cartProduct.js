const express = require('express');

const authController = require('../../controllers/user/auth');
const cartController = require('../../controllers/cart/cart');
const cartProductsController = require('../../controllers/cart/cartProduct');

const router = express.Router({ mergeParams: true });

//CartProductss
router
  .route('/')
  .get(cartProductsController.getAllCartProducts)
  .post(cartProductsController.createCartProduct);

router
  .route('/:id')
  .get(cartProductsController.getCartProduct)
  .patch(cartProductsController.updateCartProduct)
  .delete(cartProductsController.deleteCartProduct);

module.exports = router;
