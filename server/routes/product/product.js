const express = require('express');

const authController = require('../../controllers/user/auth');
const productController = require('../../controllers/product/product');
const productImageController = require('../../controllers/product/productImage');

const brandRouter = require('./productBrand');
const reviewRouter = require('./productReview');
const imageRouter = require('./productImage');
const variantRouter = require('./productVariant');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

//Nested
//router.use('/review', reviewRouter); // Permite api/v1/product/review
router.use('/brand', brandRouter);

router.use('/:productId/review', productController.setIds, reviewRouter); // Permite api/v1/product/1/review
router.use('/:productId/brand', productController.setIds, brandRouter);
router.use('/:productId/image', productController.setIds, imageRouter);
router.use('/:productId/variant', productController.setIds, variantRouter);

//Products
router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productImageController.uploadProductPhotos,
    productImageController.resizeProductPhotos,
    productController.createProduct
  );
router
  .route('/:id')
  .get(productController.getProduct)
  .put(
    productImageController.uploadProductPhotos,
    productImageController.resizeProductPhotos,
    productController.updateProduct
  )
  .patch(productController.updateProduct2)
  .delete(productController.deleteProduct);

module.exports = router;
