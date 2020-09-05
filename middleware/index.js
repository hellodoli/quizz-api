const catchError = require('../utils/catchError');
const APIKeyModel = require('../models/APIKeyModel');
const AppError = require('../utils/AppError');

exports.apiKeyProtect = catchError(async (req, res, next) => {
  console.log('>>>API key middle ware<<<');
  const { key } = req.query;
  if (!key) throw new AppError('missing API key', 401);
  const apiKeyOb = await APIKeyModel.findOne({ _id: key });
  if (!apiKeyOb) throw new AppError('wrong API key', 404);
  // Saving role
  req.role = apiKeyOb.role;
  next();
});
