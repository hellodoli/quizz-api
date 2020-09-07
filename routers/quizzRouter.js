const express = require('express');
const middleware = require('../middleware');
const quizzController = require('../controllers/quizzController');

const router = express.Router();
router.use(middleware.apiKeyProtect);
router.route('/').get(quizzController.getAll).post(quizzController.create);
router.route('/:id').get(quizzController.getOne).patch(quizzController.update);

module.exports = router;
