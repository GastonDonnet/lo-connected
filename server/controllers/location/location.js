const Address = require('../../models/Address');
const City = require('../../models/City');
const Province = require('../../models/Province');
const Country = require('../../models/Country');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.getAllAddresses = factory.getAll(Address);
exports.getAddress = factory.getOne(Address, 'city.province');
exports.updateAddress = factory.updateOne(Address);
exports.deleteAddress = factory.deleteOne(Address);
exports.createAddress = factory.createOne(Address);

exports.getAllCities = factory.getAll(City, 'province');
exports.getCity = factory.getOne(City, 'province');
exports.updateCity = factory.updateOne(City);
exports.deleteCity = factory.deleteOne(City);

exports.getAllProvinces = factory.getAll(Province);
exports.getProvince = factory.getOne(Province);

exports.getAllCountries = factory.getAll(Country);
exports.getCountry = factory.getOne(Country);
