exports.seed = async (knex) => {
  try {
    await knex('orderProductState').del();
    await knex('orderProductState').insert([
      {
        id: 1,
        name: 'No Preparado',
        description: 'Producto no preparado',
      },
      {
        id: 2,
        name: 'En Preparación',
        description: 'Producto siendo preparado',
      },
      {
        id: 3,
        name: 'Preparado',
        description: 'Producto preparado',
      },
      {
        id: 101,
        name: 'Fuera de stock',
        description: 'Producto fuera de stock',
      },
      {
        id: 102,
        name: 'Producto rechazado',
        description: 'Producto rechazado por razones no especificadas.',
      },
    ]);

    await knex('orderProduct').del();
    await knex('orderProduct').insert([
      {
        id: 1,
        productVariantId: 1,
        orderProductStateId: 2,
        statusId: 2,
        orderId: 1,
        token: 'asosoapioah0wt9hapwohasio5125prhasiorhsa',
        name: 'Dentifrico',
        price: 500.25,
        quantity: 2,
        subtotal: 1000.5,
        createdAt: '2020-04-25 21:43:02',
      },
    ]);

    await knex('orderProductTransaction').del();
    await knex('orderProductTransaction').insert([
      {
        id: 1,
        userId: 1,
        orderProductId: 1,
        orderProductStateId: 1,
        newOrderStateId: 2,
        token: 'asgasgagsag9123utg98ahsf21521gn902hsa',
        validFrom: '2020-04-25 21:43:02',
        //        validTo: '',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
