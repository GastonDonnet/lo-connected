exports.seed = async (knex) => {
  try {
    await knex('orderStatus').del();
    await knex('orderStatus').insert([
      {
        id: 1,
        name: 'En espera',
      },
      {
        id: 2,
        name: 'Procesando',
      },
      {
        id: 3,
        name: 'Suspendida',
      },
      {
        id: 4,
        name: 'Terminada',
      },
      {
        id: 5,
        name: 'Error',
      },
    ]);

    await knex('orderState').del();
    await knex('orderState').insert([
      {
        id: 1,
        name: 'Generada',
        description: 'Order realizada, aun no atendida',
      },
      {
        id: 2,
        name: 'En Preparación',
        description: 'Order aceptada, en preparación',
      },
      {
        id: 3,
        name: 'Esperando Envío',
        description: 'Order ya preparada, esperando asignación de envío',
      },
      {
        id: 4,
        name: 'En Envío',
        description: 'Orden asignada a envío, en camino al cliente',
      },
      {
        id: 5,
        name: 'Cerrada',
        description: 'Orden entregada a cliente y aceptada',
      },
      {
        id: 100,
        name: 'Cancelada',
        description: 'Orden cancelada',
      },
      {
        id: 101,
        name: 'Rechazada por vendedor',
        description: 'Order rechazada por el vendedor',
      },
      {
        id: 102,
        name: 'Rechazada por cliente',
        description: 'Orden enviada a cliente y rechazada',
      },
    ]);

    await knex('order').del();
    await knex('order').insert([
      {
        id: 1,
        userId: 1,
        shopId: 1,
        orderStateId: 2,
        statusId: 2,
        token: 'asosoapioah0wt9hapwohasioprhasiorhsa',
        clientAddress: 'Arturo Illia 752 - Casa con columnas',
        total: 1000.5,
        createdAt: '2020-04-25 21:43:02',
        delivery: 1,
        paymentMethod: 'efectivo',
      },
    ]);

    await knex('orderTransaction').del();
    await knex('orderTransaction').insert([
      {
        id: 1,
        userId: 1,
        orderId: 1,
        orderStateId: 1,
        newOrderStateId: 2,
        token: 'asgasgagsag9123utg98ahsfgn902hsa',
        validFrom: '2020-04-25 21:43:02',
        //        validTo: '',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
