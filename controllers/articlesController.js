const { getArticleById, updateVotes, createArticle } = require('../models/articlesModel')

exports.sendArticles = (req, res, next) => {
    console.log('in controller')
    // console.log(req.params)

    const { article_id } = req.params
    getArticleById(article_id)
        .then(article => {
            return res.status(200).send({ article })
        })
        .catch(err =>
            next(err))

}

exports.sendUpdatedArticleVotes = (req, res, next) => {
    console.log('in controller')
    // console.log(req.params)
    // console.log(req.body)

    const { article_id } = req.params
    const { inc_votes } = req.body

    updateVotes(article_id, inc_votes)
        .then(article => {
            return res.status(200).send({ article })
        })
        .catch(err =>
            next(err))
}

exports.postArticle = (req, res, next) => {

    createArticle()
        .then(posting => {
            res.status(200).send({ posting })
        })
        .catch(err =>
            next(err))
}