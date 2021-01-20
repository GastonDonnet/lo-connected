const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Province extends BaseModel {
  static get tableName() {
    return 'province';
  }

  static get relationMappings() {
    const Country = require('./Country');
    return {
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: 'province.countryId',
          to: 'country.id',
        },
      },
    };
  }
}

module.exports = Province;
