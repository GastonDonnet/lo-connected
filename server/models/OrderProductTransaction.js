const BaseModel = require('./_baseModel');

class OrderProductTransaction extends BaseModel {
  static get tableName() {
    return 'orderProductTransaction';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'orderProductStateId',
        'newOrderProductStateId',
        'orderProductId',
        'userId',
        'validFrom',
      ],

      properties: {
        id: { type: 'integer' },

        userId: { type: 'integer' },
        orderProductId: { type: 'integer' },
        orderProductStateId: { type: 'integer' },
        newOrderProductStateId: { type: 'integer' },

        validFrom: { type: 'datetime' },
        validTo: { type: 'datetime' },
      },
    };
  }
}

module.exports = OrderProductTransaction;
