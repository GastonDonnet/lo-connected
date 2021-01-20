const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class List extends BaseModel {
  static get tableName() {
    return 'list';
  }

  static get relationMappings() {
    const Shop = require('./Shop');

    return {
      shops: {
        relation: Model.ManyToManyRelation,
        modelClass: Shop,
        join: {
          from: 'list.id',
          through: {
            from: 'shopList.listId',
            to: 'shopList.shopId',
          },
          to: 'shop.id',
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
        description: { type: 'string' },
      },
    };
  }
}

module.exports = List;
