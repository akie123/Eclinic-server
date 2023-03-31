const Queries = require("../models/query")

const ContactusController = async(req,res) => {
    Queries(req.body).save().then(() => {
        res.sendStatus(201)
    })
}

module.exports = ContactusController