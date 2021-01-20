const Role = require('../../models/Role');
const RolePermission = require('../../models/RolePermission');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const { filterObj } = require('../../utils/utils');

exports.getAllRoles = factory.getAll(Role);
exports.getRole = factory.getOne(Role, 'permissions');
exports.deleteRole = factory.deleteOne(Role);

exports.createRole = catchAsync(async (req, res, next) => {
  const newDoc = await Role.transaction(async (trx) => {
    const roleBody = filterObj(req.body, 'name', 'shopId');
    const newRole = await Role.query(trx).insert(roleBody);

    for (permission of req.body.permissions) {
      await RolePermission.query(trx).insert({
        permissionId: permission.id,
        roleId: newRole.id,
      });
    }

    return newRole;
  });

  res.status(201).json({
    status: 'success',
    data: newDoc,
  });
});

exports.updateRole = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const roleBody = filterObj(req.body, 'id', 'name', 'permissions');
  console.log(roleBody);
  const newDoc = await Role.query().upsertGraph(roleBody, {
    unrelate: true,
    relate: true,
  });

  res.status(201).json({
    status: 'success',
    data: newDoc,
  });
});
