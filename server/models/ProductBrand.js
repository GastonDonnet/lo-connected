const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class ProductBrand extends BaseModel {
  static get tableName() {
    return 'productBrand';
  }

  static get relationMappings() {
    const Product = require('./Product');
    return {
      product: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'productBrand.productId',
          to: 'product.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 100 },
        description: { type: 'string', maxLength: 1000 },
      },
    };
  }
}

module.exports = ProductBrand;
