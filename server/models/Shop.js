const { Model } = require('objection');
const crypto = require('crypto');
const BaseModel = require('./_baseModel');
const CustomDate = require('../utils/date');

class Shop extends BaseModel {
  static get tableName() {
    return 'shop';
  }

  static get relationMappings() {
    const ShopCategory = require('./ShopCategory');
    const ShopReview = require('./ShopReview');
    const ShopEmployee = require('./ShopEmployee');
    const Product = require('./Product');
    const ProductCategory = require('./ProductCategory');
    const Address = require('./Address');
    const ShopState = require('./ShopState');
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShopCategory,
        join: {
          from: 'shop.shopCategoryId',
          to: 'shopCategory.id',
        },
      },
      review: {
        relation: Model.HasManyRelation,
        modelClass: ShopReview,
        join: {
          from: 'shopReview.shopId',
          to: 'shop.id',
        },
      },
      employee: {
        relation: Model.HasManyRelation,
        modelClass: ShopEmployee,
        join: {
          from: 'shopEmployee.shopId',
          to: 'shop.id',
        },
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'product.shopId',
          to: 'shop.id',
        },
      },
      categories: {
        relation: Model.HasManyRelation,
        modelClass: ProductCategory,
        join: {
          from: 'productCategory.shopId',
          to: 'shop.id',
        },
      },
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'address.shopId',
          to: 'shop.id',
        },
      },
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShopState,
        join: {
          from: 'shop.stateId',
          to: 'shopState.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'telephone', 'shopCategoryId'],

      properties: {
        id: { type: 'integer' },

        shopCategoryId: { type: 'integer' },

        avgRating: { type: 'number', minimun: 1, maximun: 5, default: 1 },
        name: { type: 'string', minLength: 3, maxLength: 30 },
        telephone: { type: 'string', minLength: 5, maxLength: 30 },
        telephone1: { type: 'string', minLength: 5, maxLength: 30 },
        telephone2: { type: 'string', minLength: 5, maxLength: 30 },
        imgBanner: { type: 'string' },
        imgLogo: { type: 'string' },

        invitationCode: { type: ['string', 'null'] },
        invitationCodeExpires: { type: 'datetime, null' },
        defaultRoleId: { type: 'integer, null', minnum: 0 },

        deliveryMin: { type: 'integer', minimun: 0 },
        deliveryCost: { type: 'integer', minimun: 0 },

        stateId: { type: 'integer', default: 1 },
        active: { type: 'boolean', default: false },
      },
    };
  }

  // Instance method

  async $createInvitationCode() {
    const invitationCode = crypto.randomBytes(16).toString('hex');

    const hashedInvitationCode = crypto
      .createHash('sha256')
      .update(invitationCode)
      .digest('hex');

    const invitationCodeExpires = new CustomDate().addMinutes(10).MYSQLParse(); // Expira en 10 minutos

    await this.$query().patch({
      invitationCode: hashedInvitationCode,
      invitationCodeExpires,
    });

    return invitationCode;
  }
}

module.exports = Shop;
