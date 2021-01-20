const express = require('express');

const authController = require('../../controllers/user/auth');
const shopController = require('../../controllers/shop/shop');
const shopCategoryController = require('../../controllers/shop/shopCategory');

const router = express.Router({ mergeParams: true });

router.route('/').get(shopCategoryController.getAllShopCategories);
router.route('/:id').get(shopCategoryController.getShopCategory);
router
  .use(authController.restrictTo('admin'))
  .route('/:id')
  .patch(shopCategoryController.updateShopCategory)
  .delete(shopCategoryController.deleteShopCategory);

module.exports = router;
