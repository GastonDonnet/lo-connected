const BaseModel = require('./_baseModel');

class OrderProductState extends BaseModel {
  static get tableName() {
    return 'orderProductState';
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

module.exports = OrderProductState;
