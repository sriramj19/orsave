const express = require('express');
const router = express.Router();

const suggestionController = require('../controllers/suggestion.controller');


router.get('/suggest', suggestionController.getRandomSuggestion);
module.exports = router;