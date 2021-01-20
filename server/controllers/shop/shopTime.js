const ShopTime = require('../../models/ShopTime');
const ShopTimeDay = require('../../models/ShopTimeDay');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const { filterObj } = require('../../utils/utils');

exports.setIds = factory.setIds('shopId', false);

exports.getAllShopTimes = factory.getAll(ShopTime, '[days]');
exports.getShopTime = factory.getOne(ShopTime, '[days]');
exports.deleteShopTime = factory.deleteOne(ShopTime);

exports.createShopTime = catchAsync(async (req, res, next) => {
  const timeBody = filterObj(req.body, 'shopId', 'delivery', 'from', 'to');

  const newDoc = await ShopTime.transaction(async (trx) => {
    const newTime = await ShopTime.query().insert(timeBody);

    for (day of req.body.days) {
      days = [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'domingo',
        'semana',
      ];
      const dayId = days.indexOf(day.day) + 1;

      const dayBody = {
        shopTimeId: newTime.id,
        dayId: dayId,
      };

      const newDay = await ShopTimeDay.query().insert(dayBody);
    }

    return newTime;
  });

  res.status(201).json({
    status: 'success',
    data: newDoc,
  });
});

exports.updateShopTime = catchAsync(async (req, res, next) => {
  const timeBody = filterObj(req.body, 'shopId', 'delivery', 'from', 'to');
  const doc = await ShopTime.transaction(async (trx) => {
    const newTime = await ShopTime.query().patchAndFetchById(
      req.params.id,
      timeBody
    );

    await ShopTimeDay.query().where({ shopTimeId: newTime.id }).delete();

    for (day of req.body.days) {
      days = [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'domingo',
        'semana',
      ];
      const dayId = days.indexOf(day.day) + 1;

      const dayBody = {
        shopTimeId: newTime.id,
        dayId: dayId,
      };

      const newDay = await ShopTimeDay.query().insert(dayBody);
    }

    return newTime;
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
