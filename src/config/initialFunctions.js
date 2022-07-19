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
                console.log("user role user add");
            })

            new Role({
                name: "admin"
            }).save((err) => {
                if (err)
                    console.log("error", err);
                console.log("user role admin add");
            })
        }
    })
    .catch((err) => {
        console.log("bug", err);

    })

module.exports = initialFunctions