const express = require('express');

const authController = require('../../controllers/user/auth');
const shopController = require('../../controllers/shop/shop');
const reviewController = require('../../controllers/shop/shopReview');

const router = express.Router({ mergeParams: true });

router.route('/').get(reviewController.getAllShopReviews); // api/shop/:shopId/review
router.route('/:id').get(reviewController.getShopReview);
router
  .use(authController.restrictTo('user'))
  .route('/:id')
  .patch(reviewController.updateShopReview)
  .delete(reviewController.deleteShopReview);

module.exports = router;
