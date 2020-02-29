const { getTopics } = require('../models/topicsModel')

exports.sendTopics = (req, res, next) => {

    getTopics()
        .then((topics) => {
            return res.status(200).send({ topics })
        })
        .catch(err => {
            next(err)
        })
}