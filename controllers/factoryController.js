const catchError = require('../utils/catchError');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

const isValidDataUpdate = (dataUpdate) => {
  const updates = Object.keys(dataUpdate);
  const allows = [
    'content',
    'category',
    'author',
    'public_time',
    'public_time_format',
    'root_source',
    'source',
    'title',
    'questions',
  ];
  const isValid = updates.every((update) => allows.includes(update));
  return isValid;
};

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

exports.update = (Model) =>
  catchError(async (req, res, next) => {
    const isValid = isValidDataUpdate(req.body);
    if (!isValid) throw new AppError('Wrong update column', 400);
    const doc = await Model.findById(req.params.id);
    if (!doc) throw new AppError('No document found with that id', 404);
    const updates = Object.keys(req.body);
    updates.forEach((update) => {
      doc[update] = req.body[update];
    });
    await doc.save();
    // Send response
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: doc,
    });
  });
