const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book')
const { authJwt } = require('../middlewares')

//create book
router.post('/', [authJwt.verifyToken], BookController.create)

//get all books
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], BookController.findAll)

//borrow book
router.get('/borrow', BookController.borrow)

//getOne book
router.get('/:id', BookController.findOne)

//Update book
router.put('/:id', [authJwt.verifyToken], BookController.update)

//Delete book by id
router.delete('/:id', [authJwt.verifyToken], BookController.delete)

//Delete all book by user
router.delete('/', [authJwt.verifyToken, authJwt.isAdmin], BookController.deleteAllByUser)

module.exports = router