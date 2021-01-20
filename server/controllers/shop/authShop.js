const crypto = require('crypto');
const Shop = require('../../models/Shop');
const ShopEmployee = require('../../models/ShopEmployee');
const Role = require('../../models/Role');
const RolePermission = require('../../models/RolePermission');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { filterObj } = require('../../utils/utils');
const Address = require('../../models/Address');

exports.newShop = catchAsync(async (req, res, next) => {
  const shopData = filterObj(
    req.body,
    'shopCategoryId',
    'name',
    'telephone',
    'description',
    'deliveryCost',
    'deliveryMin'
  );

  const addressData = filterObj(req.body.address, 'cityId', 'street', 'note');

  const shop = await Shop.transaction(async (trx) => {
    const newShop = await Shop.query(trx).insertAndFetch(shopData);

    // Crea roles basicos
    // const [newDueñoRole, newEmployeeRole] = await Promise.all(
    //   Role.query(trx).insertAndFetch({
    //     name: 'Dueño',
    //     shopId: newShop.id,
    //   }),
    //   Role.query(trx).insertAndFetch({
    //     name: 'Nuevo empleado',
    //     shopId: newShop.id,
    //   })
    // );
    const newDueñoRole = await Role.query(trx).insertAndFetch({
      name: 'Dueño',
      shopId: newShop.id,
    });
    const newEmployeeRole = await Role.query(trx).insertAndFetch({
      name: 'Nuevo empleado',
      shopId: newShop.id,
    });

    // Crea Rol Permiso de control total para dueño
    await RolePermission.query(trx).insert({
      roleId: newDueñoRole.id,
      permissionId: 1,
    });

    await ShopEmployee.query(trx).insert({
      roleId: newDueñoRole.id,
      shopId: newShop.id,
      userId: req.user.id,
    });

    // Agrega direccion al shop
    addressData.shopId = newShop.id;
    await Address.query(trx).insert(addressData);

    // Actualiza el rol para empleado nuevo
    await newShop.$query(trx).patch({ defaultRoleId: newEmployeeRole.id });

    return newShop;
  });

  res.status(200).json({
    status: 'success',
    shop,
  });
});

exports.generateNewInvitationCode = catchAsync(async (req, res, next) => {
  const shop = await Shop.query().findById(req.params.shopId);
  const invitationCode = await shop.$createInvitationCode();

  if (req.body.defaultRoleId) {
    shop.$query().patch({ defaultRoleId: req.body.defaultRoleId });
  }

  res.status(200).json({
    status: 'success',
    invitationCode,
  });
});

exports.newEmployee = catchAsync(async (req, res, next) => {
  // Busca token de parametro o body
  const token = req.params.token || req.body.token;

  // Hashea el token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Encuentra el shop con el token correspondiente
  const shop = await Shop.query().findOne({ invitationCode: hashedToken });

  if (!shop) {
    return next(new AppError('No se encontro una tienda con ese codigo.', 404));
  }

  // Si no tiene defaultRoleId o no se entrego tira error
  if (!(shop.defaultRoleId || req.body.defaultRoleId)) {
    return next(
      new AppError(
        'La tienda debe configurar un defaultRoleId antes de poder crear un nuevo empleado.',
        404
      )
    );
  }

  // Creo Employee con el usuario que use el token
  const employee = await ShopEmployee.query().insert({
    shopId: shop.id,
    userId: req.user.id,
    roleId: shop.defaultRoleId,
  });

  res.status(200).json({
    status: 'success',
    employee,
  });
});

/////////////////////////////////////////////////////////
// Middlewares
/////////////////////////////////////////////////////////
exports.protect = catchAsync(async (req, res, next) => {
  // Busco al empleado
  const employee = await ShopEmployee.query()
    .select()
    .where({
      userId: req.user.id,
      shopId: req.params.shopId || req.params.id,
    })
    .withGraphFetched('[role.permissions]');

  if (!employee) {
    return next(
      new AppError('No se encontro un empelado con en esta tienda!', 401)
    );
  }

  // Seteo en Req
  req.employee = employee[0];
  req.permissions = req.employee.role.permissions.map((el) => el.permission);

  next();
});

exports.needPermission = (permission) => {
  return catchAsync(async (req, res, next) => {
    console.log(!req.permissions.includes('totalAccess'));
    console.log(!req.permissions.includes(permission));
    console.log(req.employee.active);
    if (!req.employee.active) {
      return next(
        new AppError('Tu cuenta en esta tienda ha sido deshabilitada', 403)
      );
    }

    if (
      !(
        req.permissions.includes(permission) ||
        req.permissions.includes('totalAccess')
      )
    ) {
      return next(
        new AppError('No estas habilitado para realizar esta accion!', 403)
      );
    }

    next();
  });
};
