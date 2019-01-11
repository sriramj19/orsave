const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');


router.post('/login', userController.loginUser);
router.post('/create', userController.createUser);
module.exports = router;