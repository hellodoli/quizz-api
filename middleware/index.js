const catchError = require('../utils/catchError');

exports.apiKeyProtect = catchError(async (req, res, next) => {
  console.log('>>>API key middle ware<<<');
  next();
});
