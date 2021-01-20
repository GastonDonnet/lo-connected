const express = require('express');

const authController = require('../../controllers/user/auth');
const listController = require('../../controllers/others/list');

const router = express.Router();

//Lists
router.route('/').get(listController.getAllLists);
router
  .route('/:id')
  .get(listController.getList)
  .patch(listController.updateList)
  .delete(listController.deleteList);

module.exports = router;
