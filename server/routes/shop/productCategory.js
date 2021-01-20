const express = require('express');

const productCategoryController = require('../../controllers/shop/productCategory');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(productCategoryController.getAllProductCategories)
  .post(productCategoryController.createProductCategory);

router
  .route('/:id')
  .get(productCategoryController.getProductCategory)
  .patch(productCategoryController.updateProductCategory)
  .delete(productCategoryController.deleteProductCategory);

module.exports = router;
