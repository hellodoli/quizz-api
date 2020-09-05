const catchError = require('../utils/catchError');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

exports.getOne = (Model, popOptions) =>
  catchError(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) throw new AppError('No document found with that id', 404);
    // Send response
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchError(async (req, res, next) => {
    const filter = {};
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .paginate();
    const docs = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      result: docs.length,
      data: docs,
    });
  });

exports.createOne = (Model) =>
  catchError(async (req, res, next) => {
    const doc = await Model.create(req.body);

    // Send response
    res.status(201).json({
      status: 'success',
      statusCode: 201,
      data: doc,
    });
  });
