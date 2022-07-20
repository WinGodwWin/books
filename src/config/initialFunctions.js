const db = require("../models");
const Role = db.role

initialFunctions = Role.estimatedDocumentCount()
    .then((count) => {
        if (count === 0) {
            new Role({
                name: "user"
            }).save((err) => {
                if (err)
                    console.log("error", err);
            })

            new Role({
                name: "admin"
            }).save((err) => {
                if (err)
                    console.log("error", err);
            })
        }
    })
    .catch((err) => {

    })

module.exports = initialFunctions