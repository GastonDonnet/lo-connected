const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Role extends BaseModel {
  static get tableName() {
    return 'role';
  }

  static get relationMappings() {
    const Permission = require('./Permission');

    return {
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: Permission,
        join: {
          from: 'role.id',
          through: {
            from: 'rolePermission.roleId',
            to: 'rolePermission.permissionId',
          },
          to: 'permission.id',
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
        shopId: { type: 'integer' },
        name: { type: 'string' },
      },
    };
  }
}

module.exports = Role;
