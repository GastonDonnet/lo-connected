const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class ProductAtributeType extends BaseModel {
  static get tableName() {
    return 'productAtributeType';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['productId', 'atributeTypeId'],

      properties: {
        id: { type: 'integer' },
        productId: { type: 'integer' },
        atributeTypeId: { type: 'integer', default: 1 },
      },
    };
  }
}

module.exports = ProductAtributeType;
