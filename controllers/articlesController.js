const { getArticleById, updateVotes, createArticle, getAllCommentsForId, getAllArticles } = require('../models/articlesModel')

exports.sendArticlesById = (req, res, next) => {
    // console.log('in controller')
    // console.log(req.params)

    const { article_id } = req.params
    getArticleById(article_id)
        .then(article => {
            return res.status(200).send({ article: article })
        })
        .catch(err =>
            next(err))

}

exports.sendUpdatedArticleVotes = (req, res, next) => {

    const { article_id } = req.params
    const { inc_votes } = req.body

    updateVotes(article_id, inc_votes)
        .then(article => {
            return res.status(200).send({ article: article })
        })
        .catch(err =>
            next(err))
}

exports.postArticle = (req, res, next) => {

    const { article_id } = req.params

    const author = req.body.username
    const comment = { body: req.body.body, author: author, article_id: article_id }

    createArticle(comment)
        .then(comment => {
            res.status(201).send({ comment })
        })
        .catch(err => {
            next(err)
        })
}

exports.getCommentsByArticleId = (req, res, next) => {

    const { article_id } = req.params
    const { sort_by, order_by } = req.query

    getAllCommentsForId(article_id, sort_by, order_by)
        .then(comment => {
            return res.status(200).send({ comments: comment })
        })
        .catch(err => {
            next(err)
        })
}

exports.sendAllArticles = (req, res, next) => {

    const username = req.query.author
    const { sort_by, order_by, topic } = req.query

    getAllArticles(sort_by, order_by, username, topic)
        .then(articles => {
            return res.status(200).send({ articles })
        })
        .catch(err => {
            next(err)
        })
}