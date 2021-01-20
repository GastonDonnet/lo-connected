const BaseModel = require('./_baseModel');

class RolePermission extends BaseModel {
  static get tableName() {
    return 'rolePermission';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['roleId', 'permissionId'],

      properties: {
        roleId: { type: 'integer' },
        permissionId: { type: 'integer' },
      },
    };
  }
}

module.exports = RolePermission;
