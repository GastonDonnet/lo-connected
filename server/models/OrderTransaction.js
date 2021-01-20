const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class OrderTransaction extends BaseModel {
  static get tableName() {
    return 'orderTransaction';
  }

  static get relationMappings() {
    const User = require('./User');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'orderTransaction.userId',
          to: 'user.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'orderStateId',
        'newOrderStateId',
        'orderId',
        'userId',
        'validFrom',
      ],

      properties: {
        id: {
          type: 'integer',
        },

        userId: {
          type: 'integer',
        },
        orderId: {
          type: 'integer',
        },
        orderStateId: {
          type: 'integer',
        },
        newOrderStateId: {
          type: 'integer',
        },

        validFrom: {
          type: 'datetime',
        },
        validTo: {
          type: 'datetime',
        },
      },
    };
  }
}

module.exports = OrderTransaction;
