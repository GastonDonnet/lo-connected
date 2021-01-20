const { Model } = require('objection');
const BaseModel = require('./_baseModel');
const CustomDate = require('../utils/date');

class CartProduct extends BaseModel {
  static get tableName() {
    return 'cartProduct';
  }

  static get relationMappings() {
    const ProductVariant = require('./ProductVariant');
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductVariant,
        join: {
          from: 'cartProduct.productVariantId',
          to: 'productVariant.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['cartId', 'productVariantId', 'quantity'],

      properties: {
        id: { type: 'integer' },
        productVariantId: { type: 'integer' },
        cartId: { type: 'integer' },
        quantity: { type: 'integer' },
      },
    };
  }
}

module.exports = CartProduct;
