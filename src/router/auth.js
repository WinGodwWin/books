const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth')

//create account
router.post('/signup', AuthController.signup)

//login
router.post('/signin', AuthController.signin)

module.exports = router
