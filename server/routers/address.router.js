const express = require('express');

const  addresscontroller  = require('../controllers/address.controller');
const router = express.Router();


router.post('/create',addresscontroller.Create);


module.exports = router;
