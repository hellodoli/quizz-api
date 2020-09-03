const express = require('express');
const middleware = require('../middleware');
const quizzController = require('../controllers/quizzController');

const router = express.Router();
router.use(middleware.apiKeyProtect);
router
  .route('/')
  .get(quizzController.getAllQuizz)
  .post(quizzController.createQuizz);
router.route('/:id').get(quizzController.getOne);

module.exports = router;
