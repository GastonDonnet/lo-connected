const BaseModel = require('./_baseModel');

class ProductReview extends BaseModel {
  static get tableName() {
    return 'productReview';
  }

  static get relationMappings() {
    // No modelo el product porque no creo usarlo.
    const Product = require('./Product');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'productReview.productId',
          to: 'product.id',
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
        userId: { type: 'integer' },
        productId: { type: 'integer' },

        comment: { type: 'string', maxLength: 200 },
        rating: { type: 'number', minimun: 1, maximun: 5 },
      },
    };
  }
}

module.exports = ProductReview;
