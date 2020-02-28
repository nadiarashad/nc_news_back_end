const { getTopics } = require('../models/topicsModel')

exports.sendTopics = (req, res, next) => {
    console.log('in controller')
    getTopics()
        .then((topics) => {
            return res.status(200).send({ topics })
        })
        .catch(err => {
            // console.log('from catch')
            next(err)
        })
}