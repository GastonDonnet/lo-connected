const BaseModel = require('./_baseModel');

class ProductImage extends BaseModel {
  static get tableName() {
    return 'productImage';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['path', 'productId'],

      properties: {
        id: { type: 'integer' },
        productId: { type: 'integer' },
        path: { type: 'string', maxLength: 200 },
      },
    };
  }
}

module.exports = ProductImage;
