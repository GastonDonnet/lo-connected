const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class OrderProduct extends BaseModel {
  static get tableName() {
    return 'orderProduct';
  }

  static get relationMappings() {
    const OrderProductState = require('./OrderProductState');
    const OrderProductTransaction = require('./OrderProductTransaction');
    const ProductVariant = require('./ProductVariant');
    return {
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderProductState,
        join: {
          from: 'orderProduct.orderProductStateId',
          to: 'orderProductState.id',
        },
      },
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: OrderProductTransaction,
        join: {
          from: 'orderProduct.id',
          to: 'orderProductTransaction.orderProductId',
        },
      },
      variant: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductVariant,
        join: {
          from: 'orderProduct.productVariantId',
          to: 'productVariant.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'orderId',
        'orderProductStateId',
        'productVariantId',
        'price',
        'quantity',
      ],

      properties: {
        id: { type: 'integer' },
        productVariantId: { type: 'integer' },
        orderId: { type: 'integer' },
        orderProductStateId: { type: 'integer' },

        price: { type: 'number', minimun: 0 },
        quantity: { type: 'integer', minimun: 0 },
        subtotal: { type: 'float', minimun: 0 },
        note: { type: 'string', maxLength: 1000 },

        lastStateUpdate: { type: 'datetime' },
      },
    };
  }
}

module.exports = OrderProduct;
