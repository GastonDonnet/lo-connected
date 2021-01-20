const express = require('express');

const authController = require('../../controllers/user/auth');
const productController = require('../../controllers/product/product');
const atributeValueController = require('../../controllers/product/atributeValue');

const router = express.Router({ mergeParams: true });

// router.use(productController.setIds); // Setea Ids Product y User

router.route('/').get(atributeValueController.getAllAtributeValues); // api/product/:productId/atributeValue/
router.route('/:id').get(atributeValueController.getAtributeValue);
router
  .use(authController.restrictTo('user'))
  .route('/:id')
  .patch(atributeValueController.updateAtributeValue)
  .delete(atributeValueController.deleteAtributeValue);

module.exports = router;
