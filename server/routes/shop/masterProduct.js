const express = require('express');

const authController = require('../../controllers/user/auth');
const masterProductController = require('../../controllers/product/masterProduct');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

//Products
router
  .route('/')
  .get(masterProductController.getAllMasterProducts)
  .post(masterProductController.createMasterProduct);
router.route('/:id').get(masterProductController.getMasterProduct);
router
  .route('/:id')
  .patch(masterProductController.updateMasterProduct)
  .delete(masterProductController.deleteMasterProduct);

module.exports = router;
