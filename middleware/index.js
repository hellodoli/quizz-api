const catchError = require('../utils/catchError');
const APIKeyModel = require('../models/APIKeyModel');

exports.apiKeyProtect = catchError(async (req, res, next) => {
  console.log('>>>API key middle ware<<<');
  try {
    const { key } = req.query;
    if (!key) throw new Error();
    const apiKeyOb = await APIKeyModel.findOne({ _id: key });
    if (!apiKeyOb) throw new Error();
    // Saving role
    req.role = apiKeyOb.role;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Wrong or missing API Key',
    });
  }
});
