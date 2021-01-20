const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class ShopCategory extends BaseModel {
  static get tableName() {
    return 'shopCategory';
  }

  static get relationMappings() {
    const Shop = require('./Shop');
    return {
      shop: {
        relation: Model.HasManyRelation,
        modelClass: Shop,
        join: {
          from: 'shopCategory.shopId',
          to: 'shop.id',
        },
      },
      parentCategory: {
        relation: Model.HasManyRelation,
        modelClass: ShopCategory,
        join: {
          from: 'shopCategory.shopCategoryId',
          to: 'shopCategory.shopId',
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
        shopCategoryId: { type: 'integer' },
        name: { type: 'string', minLength: 5, maxLength: 30 },
      },
    };
  }
}

module.exports = ShopCategory;
