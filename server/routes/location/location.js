const express = require('express');

const authController = require('../../controllers/user/auth');
const locationController = require('../../controllers/location/location');

const router = express.Router();

router.use(authController.protect);

router
  .route('/address')
  .get(locationController.getAllAddresses)
  .post(locationController.createAddress);
router.route('/address/:id').get(locationController.getAddress);
router
  .use('/address/:id', authController.restrictTo('admin'))
  .route('/address/:id')
  .patch(locationController.updateAddress)
  .delete(locationController.deleteAddress);

router.route('/city').get(locationController.getAllCities);
router.route('/city/:id').get(locationController.getCity);
router
  .use('/city/:id', authController.restrictTo('admin'))
  .route('/city/:id')
  .patch(locationController.updateCity)
  .delete(locationController.deleteCity);

router.route('/province').get(locationController.getAllProvinces);
router.route('/province/:id').get(locationController.getProvince);

router.route('/country').get(locationController.getAllCountries);
router.route('/country/:id').get(locationController.getCountry);

module.exports = router;
