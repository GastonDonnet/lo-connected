const express = require('express');

const authController = require('../../controllers/user/auth');
const productController = require('../../controllers/product/product');
const imageController = require('../../controllers/product/productImage');

const router = express.Router({ mergeParams: true });

router.route('/').get(imageController.getAllProductImages); // api/product/:productId/image
router.route('/:id').get(imageController.getProductImage);
router
  .use(authController.restrictTo('user'))
  .route('/:id')
  .patch(imageController.updateProductImage)
  .delete(imageController.deleteProductImage);

module.exports = router;
