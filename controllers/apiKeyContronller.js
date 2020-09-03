const factory = require('./factoryController');
const APIKeyModel = require('../models/APIKeyModel');

exports.createAPIKey = factory.createOne(APIKeyModel);
exports.getAPIKey = factory.getAll(APIKeyModel);
