const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class ShopTimeDay extends BaseModel {
  static get tableName() {
    return 'shopTimeDay';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['dayId', 'shopTimeId'],

      properties: {
        dayId: { type: 'integer' },
        shopTimeId: { type: 'integer' },
      },
    };
  }
}

module.exports = ShopTimeDay;
