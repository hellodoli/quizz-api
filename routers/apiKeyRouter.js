const express = require('express');
const middleware = require('../middleware');
const apiKeyController = require('../controllers/apiKeyContronller');

const router = express.Router();
router.use(middleware.apiKeyProtect);
router
  .route('/')
  .get(apiKeyController.getAPIKey)
  .post(apiKeyController.createAPIKey);

module.exports = router;
