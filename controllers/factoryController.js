const catchError = require('../utils/catchError');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

exports.getOne = (Model, popOptions) =>
  catchError(async (req, res, next) => {
    let query = Model.findById(req.params.quizzId);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) return next(new AppError('No document found with that id', 404));
    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchError(async (req, res, next) => {
    const filter = {};
    const features = new APIFeatures(Model.find(filter), req.query)
      .sort()
      .paginate();
    const docs = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        quizzs: docs,
      },
    });
  });

exports.createOne = (Model) =>
  catchError(async (req, res, next) => {
    const doc = await Model.create(req.body);

    // Send response
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
