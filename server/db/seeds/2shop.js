exports.seed = async (knex) => {
  try {
    await knex('shopCategory').del();
    await knex('shopCategory').insert([
      {
        id: 1,
        name: 'Bazar',
        icon: 'mdi-store',
      },
      {
        id: 2,
        name: 'Kiosco',
        icon: 'mdi-storefront-outline',
      },
      {
        id: 3,
        name: 'Minimercado',
        icon: 'mdi-store-outline',
      },
      {
        id: 4,
        name: 'Ropa',
        icon: 'mdi-tshirt-crew',
      },
      {
        id: 5,
        name: 'Comida',
        icon: 'mdi-silverware-variant',
      },
      {
        id: 6,
        name: 'Electrónica',
        icon: 'mdi-television-classic',
      },
    ]);

    await knex('shopState').del();
    await knex('shopState').insert([
      {
        id: 1,
        name: 'Abierto',
        description: 'El local esta abierto',
      },
      {
        id: 2,
        name: 'Cerrado',
        description: 'El local esta cerrado',
      },
      {
        id: 3,
        name: 'Demorado',
        description: 'El local posee demoras en las ordenes',
      },
    ]);

    await knex('shop').del();
    await knex('shop').insert([
      {
        id: 1,
        stateId: 1,
        active: 1,
        shopCategoryId: 1,
        name: 'Nombre de la tienda',
        description:
          'Con 40 años en el negocio, vendemos todo tipo de productos de la mejor calidad al menor precio...',
        telephone: '3404 634873',
        avgRating: 4.2,
        defaultRoleId: 2,
      },
    ]);

    await knex('shopReview').del();
    await knex('shopReview').insert([
      {
        id: 1,
        shopId: 1,
        userId: 1,
        comment: 'Muy buena atención!',
        rating: 4.2,
      },
    ]);

    await knex('day').del();
    await knex('day').insert([
      {
        id: 1,
        day: 'lunes',
      },
      {
        id: 2,
        day: 'martes',
      },
      {
        id: 3,
        day: 'miercoles',
      },
      {
        id: 4,
        day: 'jueves',
      },
      {
        id: 5,
        day: 'viernes',
      },
      {
        id: 6,
        day: 'sabado',
      },
      {
        id: 7,
        day: 'domingo',
      },
      {
        id: 8,
        day: 'semana',
      },
      {
        id: 9,
        day: 'feriado',
      },
      {
        id: 10,
        day: 'oneTime',
      },
    ]);

    await knex('shopTime').del();
    await knex('shopTime').insert([
      {
        id: 1,
        shopId: 1,
        from: '09:00',
        to: '13:00',
      },
      {
        id: 2,
        shopId: 1,
        from: '16:00',
        to: '19:00',
      },
      {
        id: 3,
        shopId: 1,
        from: '10:00',
        to: '12:00',
        delivery: true,
      },
      {
        id: 4,
        shopId: 1,
        from: '17:00',
        to: '20:00',
        delivery: true,
      },

      {
        id: 5,
        shopId: 1,
        from: '09:00',
        to: '13:00',
      },
      {
        id: 6,
        shopId: 1,
        from: '10:00',
        to: '12:00',
        delivery: true,
      },
    ]);

    await knex('shopTimeDay').del();
    await knex('shopTimeDay').insert([
      {
        dayId: 8,
        shopTimeId: 1,
      },
      {
        dayId: 8,
        shopTimeId: 2,
      },
      {
        dayId: 8,
        shopTimeId: 3,
      },
      {
        dayId: 8,
        shopTimeId: 4,
      },
      {
        dayId: 6,
        shopTimeId: 5,
      },
      {
        dayId: 6,
        shopTimeId: 6,
      },
    ]);

    await knex('list').del();
    await knex('list').insert([
      {
        id: 1,
        name: 'Promocionados',
        description: 'Tiendas promocionadas',
      },
    ]);

    await knex('shopList').del();
    await knex('shopList').insert([
      {
        shopId: 1,
        listId: 1,
        relevance: 1,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
