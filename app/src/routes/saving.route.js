const express = require('express');
const router = express.Router();

const savingController = require('../controllers/saving.controller');


router.post('', savingController.getSavings);
router.post('/deposit', savingController.depositAmount);
module.exports = router;