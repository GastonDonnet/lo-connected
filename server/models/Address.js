const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Address extends BaseModel {
  static get tableName() {
    return 'address';
  }

  static get relationMappings() {
    const City = require('./City');
    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: City,
        join: {
          from: 'address.cityId',
          to: 'city.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['street'],

      properties: {
        id: { type: 'integer' },

        userId: { type: 'integer, null' },
        shopId: { type: 'integer, null' },
        cityId: { type: 'integer' },

        street: { type: 'string', maxLength: 100 },
        note: { type: 'string', maxLength: 200 },
      },
    };
  }
}

module.exports = Address;
