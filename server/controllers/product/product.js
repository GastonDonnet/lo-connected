const Product = require('../../models/Product');
const ProductAtributeType = require('../../models/ProductAtributeType');
const ProductVariant = require('../../models/ProductVariant');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const { filterObj } = require('../../utils/utils');
const ProductImage = require('../../models/ProductImage');

// Productos
exports.setIds = factory.setIds('productId');

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(
  Product,
  '[atributes.values, brand, category, variants.atributes]'
);
exports.deleteProduct = factory.deleteOne(Product);
exports.updateProduct2 = factory.updateOne(Product); //Sirve con JSON, No fotos

exports.createProduct = catchAsync(async (req, res, next) => {
  req.body.product = JSON.parse(req.body.product);
  req.body.atributes = JSON.parse(req.body.atributes);
  const product = await Product.transaction(async (trx) => {
    const productBody = filterObj(
      req.body.product,
      'name',
      'price',
      'description',
      'barcode',
      'model',
      'taxIncluded',
      'hasAtributes',
      'categoryId',
      'shopId',
      'saleId',
      'brandId',
      'masterProductId'
    );
    const newProduct = await Product.query(trx)
      .insert(productBody)
      .withGraphFetched(
        '[atributes.values, brand, category, variants.atributes]'
      );

    if (req.body.photos.length) {
      req.body.photos.forEach(async (filename, i) => {
        await ProductImage.query().insert({
          productId: newProduct.id,
          path: filename,
        });
      });
    }

    if (productBody.hasAtributes) {
      //TODO: NO IMPLEMENTADO
      const combination = {};
      for (atribute of req.body.atributes.selected) {
        // Atributo - Producto
        const atributeBody = {
          productId: newProduct.id,
          atributeTypeId: atribute.id,
        };
        const newProductAtribute = await ProductAtributeType.query(trx).insert(
          atributeBody
        );

        // // Crear Variante
        // let variantBody = {
        //   productId: newProduct.id,
        //   name: `${newProduct.name} ${newProduct.brand.name} ${newProduct.model}`,
        //   price: undefined, //TODO: VER TEMA PRECIO Y TEMA SKU
        //   stock: 1,
        // };
        // let newVariant = await ProductVariant.query(trx).insert(variantBody);

        // for (value of atribute) {

        // }
      }
    } else {
      // DEFAULT NO ATRIBUTOS

      const variantBody = {
        productId: newProduct.id,
        //name: `${newProduct.name} ${newProduct.brand.name} ${newProduct.model}`,
        stock: 1,
      };

      const newVariant = await ProductVariant.query(trx).insert(variantBody);
      newProduct.variants.push(newVariant);
    }

    return newProduct;
  });

  res.status(201).json({
    status: 'success',
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  req.body.product = JSON.parse(req.body.product);
  req.body.atributes = JSON.parse(req.body.atributes);

  const doc = await Product.transaction(async (trx) => {
    const productBody = filterObj(
      req.body.product,
      'name',
      'price',
      'description',
      'barcode',
      'model',
      'taxIncluded',
      'hasAtributes',
      'categoryId',
      'shopId',
      'saleId',
      'brandId',
      'masterProductId'
    );

    // Convertir Trues, Falses y Nulls
    for (key in productBody) {
      if (productBody[key] == null) productBody[key] = undefined;
    }

    ['taxIncluded', 'hasAtributes'].forEach((field) => {
      productBody[field]
        ? (productBody[field] = true)
        : (productBody[field] = false);
    });

    //

    const newProduct = await Product.query(trx).patchAndFetchById(
      req.params.id,
      productBody
    );

    await ProductImage.query().where({ productId: newProduct.id }).delete();
    if (req.body.photos.length && req.body.photos != 'undefined') {
      req.body.photos.forEach(async (filename) => {
        console.log(filename, newProduct.id);
        await ProductImage.query().insert({
          productId: newProduct.id,
          path: filename,
        });
      });
    }

    return newProduct;
  });

  if (!doc) {
    return next(new AppError('No document found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
