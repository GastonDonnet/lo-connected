const express = require('express');

const authController = require('../../controllers/user/auth');
const productController = require('../../controllers/product/product');
const atributeTypeController = require('../../controllers/product/atributeType');

const router = express.Router({ mergeParams: true });

router.use(productController.setIds); // Setea Ids Product y User

router.route('/').get(atributeTypeController.getAllAtributeTypes); // api/product/:productId/atributeType/
router.route('/:id').get(atributeTypeController.getAtributeType);
router
  .use(authController.restrictTo('user'))
  .route('/:id')
  .patch(atributeTypeController.updateAtributeType)
  .delete(atributeTypeController.deleteAtributeType);

module.exports = router;
