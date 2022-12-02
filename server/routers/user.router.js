const express = require('express');

const usercontroller  = require('../controllers/user.controller');
const router = express.Router();


router.post('/signUp',usercontroller.signUp);
router.post('/signIn',usercontroller.signIn);
router.post('/Token/:data',usercontroller.Token);
module.exports = router;