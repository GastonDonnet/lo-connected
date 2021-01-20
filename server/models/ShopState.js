const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class ShopState extends BaseModel {
  static get tableName() {
    return 'shopState';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 30 },
      },
    };
  }
}

module.exports = ShopState;
