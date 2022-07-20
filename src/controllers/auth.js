const db = require('../models')
const config = require('../config/auth')
const User = db.user
const Role = db.role

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.signup = (req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })

    user.save((error, user) => {
        if (error)
            return res.status(500).send({ message: error })

        if (req.body.roles)
            Role.find({
                name: { $in: req.body.roles }
            }, (error, roles) => {
                if (error)
                    return res.status(500).json({ error })

                user.roles = roles.map(role => role._id)
                user.save((error, data) => {
                    if (error)
                        return res.status(500).json({ error })

                    return res.status(201).json({})
                })
            })
        else
            Role.findOne({ name: "user" }, (error, role) => {
                if (error)
                    return res.status(500).json({ error })

                user.roles = [role.id];
                user.save((error, data) => {
                    if (error)
                        return res.status(500).json({ error })

                    return res.status(201).json({})
                })
            })
    })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    }).populate("roles", "-__v")
        .exec((error, user) => {
            if (error)
                return res.status(500).json({ error })

            if (!user)
                return res.status(404).send({ message: "User Not found." })

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )

            if (!passwordIsValid)
                return res.status(401).send({
                    message: "Invalid Password!",
                    accessToken: null
                })

            let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 })

            let authorities = [];
            authorities.push("ROLE_" + user.roles.name.toUpperCase())

            return res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            })
        })

}