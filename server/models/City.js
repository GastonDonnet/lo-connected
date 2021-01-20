const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class City extends BaseModel {
  static get tableName() {
    return 'city';
  }

  static get relationMappings() {
    const Province = require('./Province');
    return {
      province: {
        relation: Model.BelongsToOneRelation,
        modelClass: Province,
        join: {
          from: 'city.provinceId',
          to: 'province.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        provinceId: { type: 'integer' },
      },
    };
  }
}

module.exports = City;
