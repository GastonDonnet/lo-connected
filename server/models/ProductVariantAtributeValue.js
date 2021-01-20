const BaseModel = require('./_baseModel');

class ProductVariantAtributeValue extends BaseModel {
  static get tableName() {
    return 'productVariantAtributeValue';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['productVariantId', 'atributeValue'],

      properties: {
        id: { type: 'integer' },
        productVariantId: { type: 'integer' },
        atributeValue: { type: 'integer' },
      },
    };
  }
}

module.exports = ProductVariantAtributeValue;
