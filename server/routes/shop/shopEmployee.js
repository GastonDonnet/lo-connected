const express = require('express');

const authController = require('../../controllers/user/auth');
const shopController = require('../../controllers/shop/shop');
const shopEmployeeController = require('../../controllers/shop/shopEmployee');

const router = express.Router({ mergeParams: true });

//Employees
router.route('/').get(shopEmployeeController.getAllShopEmployees);
router
  .route('/:id')
  .get(shopEmployeeController.getShopEmployee)
  .patch(shopEmployeeController.updateShopEmployee)
  .delete(shopEmployeeController.deleteShopEmployee);

module.exports = router;
