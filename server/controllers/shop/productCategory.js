const ProductCategory = require('../../models/ProductCategory');
const factory = require('../handlerFactory');

exports.getAllProductCategories = factory.getAll(ProductCategory);
exports.getProductCategory = factory.getOne(ProductCategory, 'parentCategory');
exports.updateProductCategory = factory.updateOne(ProductCategory);
exports.deleteProductCategory = factory.deleteOne(ProductCategory);
exports.createProductCategory = factory.createOne(ProductCategory);
