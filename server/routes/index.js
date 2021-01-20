const express = require('express');

const router = express.Router();

router.use('/api/v1/auth', require('./user/auth'));
router.use('/api/v1/users', require('./user/users'));
router.use('/api/v1/location', require('./location/location'));
router.use('/api/v1/shop', require('./shop/shops'));
router.use('/api/v1/product', require('./product/product'));
router.use('/api/v1/order', require('./order/order'));
router.use('/api/v1/cart', require('./cart/cart'));

router.use('/api/v1/permission', require('./others/permission'));
router.use('/api/v1/list', require('./others/list'));
router.use('/api/v1/shop-category', require('./others/shopCategory'));

module.exports = router;
