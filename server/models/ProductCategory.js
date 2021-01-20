const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class ProductCategory extends BaseModel {
  static get tableName() {
    return 'productCategory';
  }

  static get relationMappings() {
    const Product = require('./Product');
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'product.categoryId',
          to: 'productCategory.id',
        },
      },
      parentCategory: {
        relation: Model.HasManyRelation,
        modelClass: ProductCategory,
        join: {
          from: 'productCategory.productCategoryId',
          to: 'productCategory.productId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'shopId'],

      properties: {
        id: { type: 'integer' },
        shopId: { type: 'integer' },
        saleId: { type: 'integer' },
        categoryId: { type: 'integer' },
        name: { type: 'string', minLength: 5, maxLength: 50 },
        visible: { type: 'boolean' },
      },
    };
  }
}

module.exports = ProductCategory;
