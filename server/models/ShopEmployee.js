const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class ShopEmployee extends BaseModel {
  static get tableName() {
    return 'shopEmployee';
  }

  static get relationMappings() {
    const Shop = require('./Shop');
    const User = require('./User');
    const Role = require('./Role');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'shopEmployee.userId',
          to: 'user.id',
        },
      },
      shop: {
        relation: Model.BelongsToOneRelation,
        modelClass: Shop,
        join: {
          from: 'shopEmployee.shopId',
          to: 'shop.id',
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'shopEmployee.roleId',
          to: 'role.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'shopId'],

      properties: {
        userId: { type: 'integer' },
        shopId: { type: 'integer' },
        roleId: { type: 'integer' },
        active: { type: 'bool' },
      },
    };
  }
}

module.exports = ShopEmployee;
