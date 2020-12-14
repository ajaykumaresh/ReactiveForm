const express = require('express');
const router = express.Router();
const userController = require('../controller/userAuth')

router.post('/adduser', userController.addUser)

module.exports = router;