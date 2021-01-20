const express = require('express');

const authController = require('../../controllers/user/auth');
const shopController = require('../../controllers/shop/shop');
const shopTimeController = require('../../controllers/shop/shopTime');

const router = express.Router({ mergeParams: true });

//Times
router
  .route('/')
  .get(shopTimeController.getAllShopTimes)
  .post(shopTimeController.createShopTime);

router
  .route('/:id')
  .get(shopTimeController.getShopTime)
  .patch(shopTimeController.updateShopTime)
  .delete(shopTimeController.deleteShopTime);

module.exports = router;
