const express = require('express');

const authController = require('../../controllers/user/auth');
const userController = require('../../controllers/user/user');

const router = express.Router();

//ME
router.use(authController.protect); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS PROTEGIDAS (REQUIEREN LOGIN)
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Users
router.use(authController.restrictTo('admin')); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS RESTRINGIDAS (REQUIEREN EL 'role' ASIGNADO)
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
