const express = require('express');

const authController = require('../../controllers/user/auth');
const productController = require('../../controllers/product/product');
const reviewController = require('../../controllers/product/productReview');

const router = express.Router({ mergeParams: true });

router.route('/').get(reviewController.getAllProductReviews); // api/product/:productId/review
router.route('/:id').get(reviewController.getProductReview);
router
  .use(authController.restrictTo('user'))
  .route('/:id')
  .patch(reviewController.updateProductReview)
  .delete(reviewController.deleteProductReview);

module.exports = router;
