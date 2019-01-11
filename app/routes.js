const express = require('express');

const user = require('./src/routes/user.route'); // Imports routes for the users
const saving = require('./src/routes/saving.route'); // Imports routes for the users

const router = express();

router.use('/users', user);
router.use('/savings', saving);

module.exports = router;