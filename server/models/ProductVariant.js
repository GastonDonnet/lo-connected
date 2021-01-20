const { Model } = require('objection');
const crypto = require('crypto');
const BaseModel = require('./_baseModel');

class ProductVariant extends BaseModel {
  static get tableName() {
    return 'productVariant';
  }

  static get relationMappings() {
    const Product = require('./Product');
    const AtributeValue = require('./AtributeValue');
    const ProductVariantImage = require('./ProductVariantImage');
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'productVariant.productId',
          to: 'product.id',
        },
      },
      atributes: {
        relation: Model.ManyToManyRelation,
        modelClass: AtributeValue,
        join: {
          from: 'productVariant.id',
          through: {
            from: 'productVariantAtributeValue.productVariantId',
            to: 'productVariantAtributeValue.atributeValueId',
          },
          to: 'atributeValue.id',
        },
      },
      images: {
        relation: Model.ManyToManyRelation,
        modelClass: ProductVariantImage,
        join: {
          from: 'productVariant.id',
          through: {
            from: 'productVariantImage.productVariantId',
            to: 'productVariantImage.productImageId',
          },
          to: 'productImage.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['productId'],

      properties: {
        id: { type: 'integer' },
        sku: { type: 'string' },
        productId: { type: 'integer' },
        stock: { type: 'integer' },
        price: { type: 'number', minimun: 0, default: 0 },
        // name: { type: 'string' },
      },
    };
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    // console.log('this: ', this);
    // console.log('arguments:', arguments);

    //this.name = 'HACER HOOK';
    this.sku = `${this.productId}${crypto.randomBytes(4).toString('hex')}`;
  }
}

module.exports = ProductVariant;
