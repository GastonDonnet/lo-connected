const express = require('express');

const authController = require('../../controllers/user/auth');
const productController = require('../../controllers/product/product');
const variantController = require('../../controllers/product/productVariant');
const variantImageRouter = require('./productVariantImage');

const router = express.Router({ mergeParams: true });

//Nested
//router.use('/review', reviewRouter); // Permite api/v1/product/review
router.use(
  '/:productVariantId/image',
  variantController.setIds,
  variantImageRouter
);

router.route('/').get(variantController.getAllProductVariants); // api/product/:productId/variant
router.route('/:id').get(variantController.getProductVariant);
router
  .use(authController.restrictTo('user'))
  .route('/:id')
  .patch(variantController.updateProductVariant)
  .delete(variantController.deleteProductVariant);

module.exports = router;
