const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Permission extends BaseModel {
  static get tableName() {
    return 'permission';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'permission'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        permission: { type: 'string' },
      },
    };
  }
}

module.exports = Permission;
