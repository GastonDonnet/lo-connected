exports.seed = async (knex) => {
  try {
    await knex('tag').del();
    await knex('tag').insert([
      {
        id: 1,
        name: 'Calzado',
      },
    ]);

    await knex('productBrand').del();
    await knex('productBrand').insert([
      {
        id: 1,
        name: 'Adidas',
        description: null,
      },
    ]);

    await knex('sale').del();
    await knex('sale').insert([
      {
        id: 1,
        type: 'descuento',
        name: 'Descuento de Primavera!',
        value: 0.1, //10%
      },
    ]);

    await knex('productCategory').del();
    await knex('productCategory').insert([
      {
        id: 1,
        shopId: 1,
        categoryId: null,
        saleId: null,
        name: 'Hogar',
      },
      {
        id: 2,
        shopId: 1,
        categoryId: 1,
        saleId: null,
        name: 'Limpieza',
      },
      {
        id: 3,
        shopId: 1,
        categoryId: null,
        saleId: null,
        name: 'Calzado',
      },
      {
        id: 4,
        shopId: 1,
        categoryId: null,
        saleId: null,
        name: 'Panificación',
      },
    ]);

    await knex('masterProduct').del();
    await knex('masterProduct').insert([
      {
        id: 1,
        shopId: 1,
        name: 'Genérico',
      },
      {
        id: 2,
        shopId: 1,
        name: 'Calzado',
      },
      {
        id: 3,
        shopId: 1,
        name: 'Panificación x peso',
      },
    ]);

    await knex('product').del();
    await knex('product').insert([
      {
        id: 1,
        shopId: 1,
        categoryId: 1,
        saleId: null,
        brandId: null,
        name: 'Dentífrico Oral B',
        description: null,
        barcode: null,
        model: null,
        price: 150.24,
        hasAtributes: false,
      },
      {
        id: 2,
        shopId: 1,
        categoryId: 3,
        masterProductId: 2,
        saleId: null,
        brandId: 1,
        name: 'Zapatillas',
        description: null,
        barcode: null,
        model: 'All Black',
        price: 3548.52,
        hasAtributes: true,
      },
      {
        id: 3,
        shopId: 1,
        categoryId: 4,
        masterProductId: 3,
        saleId: null,
        brandId: null,
        name: 'Bizcochos',
        description: null,
        barcode: null,
        model: 'Criollitos',
        price: 50,
        hasAtributes: true,
      },
      {
        id: 4,
        shopId: 1,
        categoryId: 1,
        saleId: null,
        brandId: null,
        name: 'Dentífrico Colgate',
        description: null,
        barcode: null,
        model: null,
        price: 140.52,
        hasAtributes: false,
      },
    ]);

    await knex('productReview').del();
    await knex('productReview').insert([
      {
        id: 1,
        userId: 1,
        productId: 1,
        rating: 4.2,
        comment: 'Muy buen dentífrico',
      },
    ]);

    await knex('productTag').del();
    await knex('productTag').insert([
      {
        id: 1,
        tagId: 1,
        productId: 1,
      },
    ]);

    await knex('productImage').del();
  } catch (error) {
    console.log(error);
  }
};
