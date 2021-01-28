const { Model } = require('objection');
const BaseModel = require('./_baseModel');
const CustomDate = require('../utils/date');

class Cart extends BaseModel {
  static get tableName() {
    return 'cart';
  }

  static get relationMappings() {
    const CartProduct = require('./CartProduct');
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: CartProduct,
        join: {
          from: 'cart.id',
          to: 'cartProduct.cartId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'shopId'],

      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        shopId: { type: 'integer' },
        validTo: {
          type: 'datetime',
          default: new CustomDate().addHours(2).MYSQLParse(),
        },
      },
    };
  }
}

module.exports = Cart;
