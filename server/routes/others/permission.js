const express = require('express');

const authController = require('../../controllers/user/auth');
const permissionController = require('../../controllers/others/permission');

const router = express.Router({ mergeParams: true });

//Permissions
router.route('/').get(permissionController.getAllPermissions);
router
  .route('/:id')
  .get(permissionController.getPermission)
  .patch(permissionController.updatePermission)
  .delete(permissionController.deletePermission);

module.exports = router;
