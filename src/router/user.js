const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')
const { authJwt } = require('../middlewares')
//test login
router.post('/user', [authJwt.verifyToken], UserController.userUser)

//login
router.post('/admin', [authJwt.verifyToken, authJwt.isAdmin], UserController.userAdmin)

module.exports = router
