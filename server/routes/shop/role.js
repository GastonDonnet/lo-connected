const express = require('express');

const authController = require('../../controllers/user/auth');
const roleController = require('../../controllers/shop/role');

const router = express.Router({ mergeParams: true });

//Roles
router
  .route('/')
  .get(roleController.getAllRoles)
  .post(roleController.createRole);
router
  .route('/:id')
  .get(roleController.getRole)
  .patch(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = router;
