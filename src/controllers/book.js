const Book = require('../models/book')
const db = require('../models')
const User = db.user

exports.create = (req, res) => {

    const book = new Book({
        name: req.body.name,
        description: req.body.description,
        disponible: req.body.disponible,
        nametheme: req.body.nametheme,
        image: req.body.image,
        user: req.body.user,
    });

    book.save(book)
        .then((data) => {
            return res.status(201).json({ data })
        })
        .catch((error) => {
            return res.status(400).json({ error })
        })
}

exports.findAll = (req, res) => {
    const name = req.query.name
    let condition = name ? {
        name: {
            $regex: new RegExp(name), $options: "i"
        }
    } : {}

    Book.find(condition)
        .then((data) => {
            return res.status(200).json({ data })
        })
        .catch((error) => {
            return res.status(400).json({ error })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Book.findById(id)
        .then((data) => {
            return res.status(200).json({ data })
        })
        .catch((error) => {
            return res.status(404).send({ message: `Not found Book with id ${id}` })
        })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty"
        })
    }

    const id = req.params.id

    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data)
                return res.status(404).send({
                    message: "Cannot update book with id= " + id + ". Book is not found"
                })
            else
                return res.status(200).json({ data })
        })
        .catch((error) => {
            return res.status(400).json({ error })
        })

}

exports.delete = (req, res) => {
    const id = req.params.id

    Book.findByIdAndRemove(id, { useFindAndModify: false })
        .then((data) => {
            return res.send({
                message: "Book was deleted successfully"
            })
        })
        .catch((error) => {
            return res.status(500).send({
                message: error.message || "Some error occured"
            })
        })

}

exports.deleteAllByUser = (req, res) => {
    Book.deleteMany({})
        .then((data) => {
            return res.send({
                message: `${data.deletedCount} Book was deleted successfully`
            })
        })
        .catch((error) => {
            return res.status(500).send({
                message: error.message || "Some error occured"
            })
        })
}

exports.borrow = (req, res) => {
    Book.find({ disponible: true })
        .then((data) => {
            return res.status(200).json({ data })
        })
        .catch((error) => {
            return res.status(404).send({
                message: error.message || "Some error occured"
            })
        })
}
