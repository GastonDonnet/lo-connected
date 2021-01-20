const express = require('express');

const authController = require('../../controllers/user/auth');
const productController = require('../../controllers/product/product');
const productVariantController = require('../../controllers/product/productVariant');
const variantImageController = require('../../controllers/product/productVariantImage');

const router = express.Router({ mergeParams: true });

router.route('/').get(variantImageController.getAllProductVariantImages); // api/product/:productId/variantImage
router.route('/:id').get(variantImageController.getProductVariantImage);
router
  .use(authController.restrictTo('user'))
  .route('/:id')
  .patch(variantImageController.updateProductVariantImage)
  .delete(variantImageController.deleteProductVariantImage);

module.exports = router;
