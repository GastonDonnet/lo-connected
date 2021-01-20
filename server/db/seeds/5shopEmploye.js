exports.seed = async (knex) => {
  try {
    await knex('rolePermission').del();
    await knex('role').del();
    await knex('permission').del();
    await knex('shopEmployee').del();

    await knex('role').insert([
      {
        id: 1,
        shopId: 1,
        name: 'Dueño',
      },
      {
        id: 2,
        shopId: 1,
        name: 'Nuevo Empleado',
      },
    ]);
    await knex('permission').insert([
      {
        id: 1,
        name: 'Todos los permisos',
        permission: 'totalAccess',
      },
      {
        id: 2,
        name: 'Ver Productos',
        permission: 'getProduct',
      },
      {
        id: 3,
        name: 'Agregar Productos',
        permission: 'addProduct',
      },
      {
        id: 4,
        name: 'Modificar Productos',
        permission: 'patchProduct',
      },
      {
        id: 5,
        name: 'Eliminar Productos',
        permission: 'deleteProduct',
      },
      {
        id: 6,
        name: 'Actualizar Opciones',
        permission: 'updateShop',
      },
      {
        id: 7,
        name: 'Actualizar Roles',
        permission: 'updateRole',
      },
      {
        id: 8,
        name: 'Ver Dashboard',
        permission: 'getShopDashboard',
      },
      {
        id: 9,
        name: 'Ver Ordenes',
        permission: 'getOrder',
      },

      {
        id: 11,
        name: 'Modificar Ordenes',
        permission: 'patchOrder',
      },
      {
        id: 12,
        name: 'Cancelar Ordenes',
        permission: 'deleteOrder',
      },
      {
        id: 13,
        name: 'Ver Empleados',
        permission: 'getEmployee',
      },
    ]);

    await knex('rolePermission').insert([
      {
        roleId: 1,
        permissionId: 1,
      },
    ]);

    await knex('shopEmployee').insert([
      {
        userId: 1,
        shopId: 1,
        roleId: 1,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
