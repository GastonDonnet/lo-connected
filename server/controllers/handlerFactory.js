const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.query().deleteById(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(204).json({});
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.query().patchAndFetchById(req.params.id, req.body);

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
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.query().insert(req.body);

    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
  });
};

exports.getOne = (Model, popOptions, modifyGraphArr, popOptionsJoin) => {
  return catchAsync(async (req, res, next) => {
    const features = new APIFeatures(
      Model.query().findById(req.params.id),
      req.query
    )
      .withGraphFetched(popOptions)
      .withGraphJoined(popOptionsJoin)
      .modifyGraph(modifyGraphArr);

    const doc = await features.query;

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
};

exports.getAll = (Model, popOptions, popOptionsJoin) => {
  return catchAsync(async (req, res, next) => {
    const features = new APIFeatures(
      Model.query().select(),
      req.query,
      req.params
    )
      .filter(req.params)
      .sort()
      .limitFields()
      .paginate()
      .withGraphJoined(popOptionsJoin)
      .withGraphFetched(popOptions);

    const doc = await features.query;

    // const doc = await Model.query().select().offset(0).limit(100);

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
};

exports.setIds = (paramId, user = true) => {
  return (req, res, next) => {
    if (!req.body[`${paramId}`])
      req.body[`${paramId}`] = req.params[`${paramId}`] * 1; // Si no se dio un Id de product en el body usar el del parametro (url)
    if (user && !req.body.userId) req.body.userId = req.user.id; // Si no se dio un Id de user usar el logueado

    next();
  };
};

exports.setUserId = (paramId) => {
  return (req, res, next) => {
    if (!req.body.userId) req.body.userId = req.user.id; // Si no se dio un Id de user usar el logueado
    next();
  };
};
