const factory = require('./factoryController');
const QuizzModel = require('../models/QuizzModel');

exports.getAll = factory.getAll(QuizzModel, false);
exports.getAllMix = factory.getAll(QuizzModel, true);
exports.getOne = factory.getOne(QuizzModel);
exports.create = factory.createOne(QuizzModel);
exports.update = factory.update(QuizzModel);
