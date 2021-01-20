const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class OrderState extends BaseModel {
  static get tableName() {
    return 'orderState';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'description'],

      properties: {
        id: { type: 'integer' },

        name: { type: 'string', maxLength: 100 },
        description: { type: 'string', maxLength: 500 },
      },
    };
  }
}

module.exports = OrderState;
