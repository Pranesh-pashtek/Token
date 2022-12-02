const express = require('express');
const { Create } = require('../controllers/address.controller');
const router = express.Router();


router.post('/create',Create);


module.exports = router;
