const BaseModel = require('./_baseModel');

class ShopReview extends BaseModel {
  static get tableName() {
    return 'shopReview';
  }

  static get relationMappings() {
    // No modelo el shop porque no creo usarlo.
    const User = require('./User');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'shopReview.userId',
          to: 'user.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['rating'],

      properties: {
        id: { type: 'integer' },
        comment: { type: 'string', maxLength: 200 },
        rating: { type: 'number', minimun: 1, maximun: 5 },
        userId: { type: 'integer' },
        shopId: { type: 'integer' },
      },
    };
  }
}

module.exports = ShopReview;
