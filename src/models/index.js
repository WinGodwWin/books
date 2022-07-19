const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

db.book = require('./book')
db.role = require('./role')
db.user = require('./user')

db.ROLES = ["user", "admin"]

module.exports = db