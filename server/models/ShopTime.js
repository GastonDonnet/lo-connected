const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class ShopTime extends BaseModel {
  static get tableName() {
    return 'shopTime';
  }

  static get relationMappings() {
    const Day = require('./Day');

    return {
      days: {
        relation: Model.ManyToManyRelation,
        modelClass: Day,
        join: {
          from: 'shopTime.id',
          through: {
            from: 'shopTimeDay.shopTimeId',
            to: 'shopTimeDay.dayId',
          },
          to: 'day.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['from', 'to', 'shopId'],

      properties: {
        id: { type: 'integer' },

        from: { type: 'time' },
        to: { type: 'time' },

        shopId: { type: 'integer' },
        delivery: { type: 'boolean' },
      },
    };
  }
}

module.exports = ShopTime;
