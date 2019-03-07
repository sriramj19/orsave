const express = require('express');

const user = require('./src/routes/user.route'); // Imports routes for the users
const saving = require('./src/routes/saving.route'); // Imports routes for the savings
const suggestion = require('./src/routes/suggestion.route'); // Imports routes for the suggestions

const router = express();

router.use('/users', user);
router.use('/savings', saving);
router.use('/suggestions', suggestion);

module.exports = router;