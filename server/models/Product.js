const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Product extends BaseModel {
  static get tableName() {
    return 'product';
  }

  static get relationMappings() {
    const ProductCategory = require('./ProductCategory');
    const ProductReview = require('./ProductReview');
    const ProductBrand = require('./ProductBrand');
    const ProductVariant = require('./ProductVariant');
    const AtributeType = require('./AtributeType');
    const ProductImage = require('./ProductImage');
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductCategory,
        join: {
          from: 'product.categoryId',
          to: 'productCategory.id',
        },
      },
      review: {
        relation: Model.HasManyRelation,
        modelClass: ProductReview,
        join: {
          from: 'product.id',
          to: 'productReview.productId',
        },
      },
      brand: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductBrand,
        join: {
          from: 'product.brandId',
          to: 'productBrand.id',
        },
      },
      variants: {
        relation: Model.HasManyRelation,
        modelClass: ProductVariant,
        join: {
          from: 'product.id',
          to: 'productVariant.productId',
        },
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: ProductImage,
        join: {
          from: 'product.id',
          to: 'productImage.productId',
        },
      },
      atributes: {
        relation: Model.ManyToManyRelation,
        modelClass: AtributeType,
        join: {
          from: 'product.id',
          through: {
            from: 'productAtributeType.productId',
            to: 'productAtributeType.atributeTypeId',
          },
          to: 'atributeType.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['shopId', 'name', 'price'],

      properties: {
        id: { type: 'integer' },

        masterProductId: { type: 'integer', default: 1 },
        shopId: { type: 'integer' },
        productCategoryId: { type: 'integer' },
        brandId: { type: 'integer' },
        saleCategoryId: { type: 'integer' },

        name: { type: 'string', maxLength: 100 },
        description: { type: 'string', maxLength: 1000 },
        model: { type: 'string', maxLength: 100 },
        barcode: { type: 'string', maxLength: 500 },

        price: { type: 'number', minimun: 0 },
        taxIncluded: { type: 'boolean' },

        hasAtributes: { type: 'boolean', default: false },

        avgRating: { type: 'number', maximun: 5, minimun: 1 },
      },
    };
  }
}

module.exports = Product;
