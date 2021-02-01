exports.seed = async (knex) => {
  try {
    await knex('atributeType').del();
    await knex('atributeType').insert([
      // {
      //   id: 1,
      //   name: 'Nulo',
      //   description: 'No posee atributos',
      //   type: 'null',
      //   masterProductId: 1,
      // },
      {
        id: 2,
        name: 'Color',
        description: 'Color de zapatillas',
        type: 'string',
        masterProductId: 2,
      },
      {
        id: 3,
        name: 'Talle',
        description: 'Talles de zapatillas',
        type: 'string',
        masterProductId: 2,
      },
      {
        id: 4,
        name: 'Gramos',
        description: 'Gramos de panificación',
        type: 'string',
        masterProductId: 3,
      },
    ]);

    await knex('productAtributeType').del();
    await knex('productAtributeType').insert([
      // {
      //   productId: 1,
      //   atributeTypeId: 1,
      // },
      {
        productId: 2,
        atributeTypeId: 2,
      },
      {
        productId: 2,
        atributeTypeId: 3,
      },
      {
        productId: 3,
        atributeTypeId: 4,
      },
    ]);

    await knex('atributeValue').del();
    await knex('atributeValue').insert([
      // {
      //   id: 1,
      //   atributeTypeId: 1,
      //   value: null,
      // },
      {
        id: 2,
        atributeTypeId: 2,
        value: 'Rojo',
      },
      {
        id: 3,
        atributeTypeId: 2,
        value: 'Negro',
      },
      {
        id: 4,
        atributeTypeId: 2,
        value: 'Azul',
      },
      {
        id: 5,
        atributeTypeId: 3,
        value: 'L',
      },
      {
        id: 6,
        atributeTypeId: 3,
        value: 'XL',
      },
      {
        id: 7,
        atributeTypeId: 4,
        value: '250g',
      },
      {
        id: 8,
        atributeTypeId: 4,
        value: '500g',
      },
      {
        id: 9,
        atributeTypeId: 4,
        value: '1kg',
      },
    ]);

    await knex('productVariant').del();
    await knex('productVariant').insert([
      {
        id: 1,
        productId: 1,
        sku: 'S1D2',
        stock: 2,
      },
      {
        id: 2,
        productId: 2,
        sku: 'AZA1',
        stock: 2,
      },
      {
        id: 3,
        productId: 2,
        sku: 'AZA2',
        stock: 2,
      },
      {
        id: 4,
        productId: 2,
        sku: 'AZA3',
        stock: 0,
      },
      {
        id: 5,
        productId: 2,
        sku: 'AZA4',
        stock: 1,
      },
      {
        id: 6,
        productId: 2,
        sku: 'AZA5',
        stock: 0,
      },
      {
        id: 7,
        productId: 2,
        sku: 'AZA6',
        stock: 2,
      },
      {
        id: 8,
        productId: 3,
        sku: 'BC1',
        stock: 3,
      },
      {
        id: 9,
        productId: 3,
        sku: 'BC2',
        stock: 3,
      },
      {
        id: 10,
        productId: 3,
        sku: 'BC3',
        stock: 3,
      },
    ]);

    await knex('productVariantAtributeValue').del();
    await knex('productVariantAtributeValue').insert([
      // {
      //   productVariantId: 1,
      //   atributeValueId: 1,
      // },
      {
        productVariantId: 2,
        atributeValueId: 2,
      },
      {
        productVariantId: 2,
        atributeValueId: 5,
      },
      {
        productVariantId: 3,
        atributeValueId: 2,
      },
      {
        productVariantId: 3,
        atributeValueId: 6,
      },
      {
        productVariantId: 4,
        atributeValueId: 3,
      },
      {
        productVariantId: 4,
        atributeValueId: 5,
      },
      {
        productVariantId: 5,
        atributeValueId: 3,
      },
      {
        productVariantId: 5,
        atributeValueId: 6,
      },
      {
        productVariantId: 6,
        atributeValueId: 4,
      },
      {
        productVariantId: 6,
        atributeValueId: 5,
      },
      {
        productVariantId: 7,
        atributeValueId: 4,
      },
      {
        productVariantId: 7,
        atributeValueId: 6,
      },
      {
        productVariantId: 8,
        atributeValueId: 7,
      },
      {
        productVariantId: 9,
        atributeValueId: 8,
      },
      {
        productVariantId: 10,
        atributeValueId: 9,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
