const express = require('express');

const authController = require('../../controllers/user/auth');
const productController = require('../../controllers/product/product');
const productBrandController = require('../../controllers/product/productBrand');

const router = express.Router();

router
  .route('/')
  .get(productBrandController.getAllProductBrands)
  .post(productBrandController.createProductBrand);
router.route('/:id').get(productBrandController.getProductBrand);

router
  .use(authController.restrictTo('admin'))
  .route('/:id')
  .patch(productBrandController.updateProductBrand)
  .delete(productBrandController.deleteProductBrand);

module.exports = router;
