const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Product extends BaseModel {
  static get tableName() {
    return 'masterProduct';
  }

  static get relationMappings() {
    const Product = require('./Product');
    const AtributeType = require('./AtributeType');
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'masterProduct.id',
          to: 'product.id',
        },
      },
      atributes: {
        relation: Model.HasManyRelation,
        modelClass: AtributeType,
        join: {
          from: 'masterProduct.id',
          to: 'atributeType.masterProductId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['shopId', 'name'],

      properties: {
        id: { type: 'integer' },

        shopId: { type: 'integer' },

        name: { type: 'string', maxLength: 100 },
        description: { type: 'string', maxLength: 1000 },
      },
    };
  }
}

module.exports = Product;
