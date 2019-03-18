const express = require('express');
const router = express.Router();

const savingController = require('../controllers/saving.controller');


router.get('/total', savingController.getSavings);
router.post('/deposit', savingController.depositAmount);
router.post('/update', savingController.updateActualDate);
router.post('/updateDateOrder', savingController.updateDateOrder);
module.exports = router;