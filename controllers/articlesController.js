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
    // console.log('in controller')
    // console.log(req.params)
    // console.log(req.body)

    const { article_id } = req.params
    const { inc_votes } = req.body

    updateVotes(article_id, inc_votes)
        .then(article => {
            console.log(article)
            return res.status(200).send({ article: article })
        })
        .catch(err =>
            next(err))
}

exports.postArticle = (req, res, next) => {
    // console.log('in controller')
    // console.log(req.params, 'req.params')
    // console.log(req.body.username, 'req.body.username')
    // console.log(req.body.body, 'req.body.body')

    const { article_id } = req.params

    const author = req.body.username
    const comment = { body: req.body.body, author: author, article_id: article_id }

    createArticle(comment)
        .then(comment => {
            res.status(201).send({ comment })
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
}

exports.getCommentsByArticleId = (req, res, next) => {
    // console.log(req.params)

    const { article_id } = req.params

    // console.log(req.query)

    const { sort_by, order_by } = req.query

    getAllCommentsForId(article_id, sort_by, order_by)
        // console.log(sort_by, 'sort by', order_by)
        .then(comment => {
            // console.log(comment, 'in controller')
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