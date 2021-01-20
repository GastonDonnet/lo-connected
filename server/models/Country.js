const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Country extends BaseModel {
  static get tableName() {
    return 'country';
  }
}

module.exports = Country;
