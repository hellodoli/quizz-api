const factory = require('./factoryController');
const QuizzModel = require('../models/QuizzModel');

exports.getAllQuizz = factory.getAll(QuizzModel);
exports.getOne = factory.getOne(QuizzModel);
exports.createQuizz = factory.createOne(QuizzModel);
