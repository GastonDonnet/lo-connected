const BaseModel = require('./_baseModel');

class ProductVariantImage extends BaseModel {
  static get tableName() {
    return 'productVariantImage';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['productVariantId', 'productImageId'],

      properties: {
        id: { type: 'integer' },
        productVariantId: { type: 'integer' },
        productImageId: { type: 'integer' },
      },
    };
  }
}

module.exports = ProductVariantImage;
