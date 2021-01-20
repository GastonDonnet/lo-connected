const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Order extends BaseModel {
  static get tableName() {
    return 'order';
  }

  static get relationMappings() {
    const OrderState = require('./OrderState');
    const OrderTransaction = require('./OrderTransaction');
    const OrderProduct = require('./OrderProduct');
    const Shop = require('./Shop');
    const User = require('./User');

    return {
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderState,
        join: {
          from: 'order.orderStateId',
          to: 'orderState.id',
        },
      },
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: OrderTransaction,
        join: {
          from: 'order.id',
          to: 'orderTransaction.orderId',
        },
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: OrderProduct,
        join: {
          from: 'order.id',
          to: 'orderProduct.orderId',
        },
      },
      shop: {
        relation: Model.BelongsToOneRelation,
        modelClass: Shop,
        join: {
          from: 'order.shopId',
          to: 'shop.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'order.userId',
          to: 'user.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'orderStateId', 'clientAddress'],

      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        orderStateId: { type: 'integer' },

        clientAddress: { type: 'string', maxLength: 500 },
        note: { type: 'string, null', maxLength: 1000, default: null },

        paymentMethod: {
          type: 'string',
          enum: ['tarjeta', 'efectivo'],
          default: 'efectivo',
        },

        deliveryDate: { type: 'string, null' },
        deliveryTime: { type: 'string, null' },

        lastStateUpdate: { type: 'datetime' },
      },
    };
  }
}

module.exports = Order;
