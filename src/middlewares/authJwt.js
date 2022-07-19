const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const User = require('../models/user')
const Role = require('../models/role')

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token)
        return res.status(403).send({ message: 'No token provided!' })

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ message: "Unauthorized!" })

        req.userId = decoded.id
        next()
    })
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err)
            return res.status(500).send({ message: err })


        Role.find({
            _id: { $in: user.roles }
        }, (er, roles) => {
            if (err)
                return res.status(500).send({ message: err })

            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next()
                    return
                }
            }
            return res.status(403).send({ message: "Require Admin Role!" })
        })
    })
}

const authJwt = {
    verifyToken,
    isAdmin
}

module.exports = authJwt