const express = require('express');

const authController = require('../../controllers/user/auth');
const shopController = require('../../controllers/shop/shop');
const authShopController = require('../../controllers/shop/authShop');

const reviewRouter = require('./shopReview');
const shopEmployeeRouter = require('./shopEmployee');
const shopProductRouter = require('../product/product');
const masterProductRouter = require('./masterProduct');
const categoryRouter = require('./productCategory');
const shopTimeRouter = require('./shopTime');
const roleRouter = require('./role');
const orderRouter = require('../order/order');

const router = express.Router();

router.use(authController.protect);

router.use('/:shopId/review', shopController.setIds, reviewRouter); // Permite api/v1/shop/1/review
router.use('/:shopId/role', shopController.setIds, roleRouter);
router.use('/:shopId/employee', shopController.setIds, shopEmployeeRouter);
router.use('/:shopId/product', shopController.setIds, shopProductRouter);
router.use('/:shopId/category', shopController.setIds, categoryRouter);
router.use(
  '/:shopId/master-product',
  shopController.setIds,
  masterProductRouter
);
router.use('/:shopId/order', shopController.setIds, orderRouter);
router.use('/:shopId/time', shopController.setIds, shopTimeRouter);

//Custom
router.route('/search').get(shopController.searchShop);

// Auth
router
  .route('/:shopId/invitationCode')
  .get(shopController.setIds, authShopController.generateNewInvitationCode);

router.route('/newEmployee').post(authShopController.newEmployee);

//Shops
router
  .route('/')
  .get(shopController.getAllShops)
  .post(authShopController.newShop);

router
  .route('/:id')
  .get(shopController.getShop)
  .patch(
    authShopController.protect,
    authShopController.needPermission('updateShop'),
    shopController.uploadShopPhoto,
    shopController.resizeShopPhoto,
    shopController.updateShop
  );

//Shops Dashboard
router
  .route('/:id/getTotal/')
  .get(
    authShopController.protect,
    authShopController.needPermission('getShopDashboard'),
    shopController.getTotal
  );

module.exports = router;
