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

exports.sendAllArticlesForTopic = (req, res, next) => {

    const { slug } = req.params

    getArticlesforTopic(slug)
        .then((articles) => {
            return res.status(200).send({ articles })
        })
        .catch(err => {
            next(err)
        })
}