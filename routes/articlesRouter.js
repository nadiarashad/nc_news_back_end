const articlesRouter = require('express').Router()
const { sendArticlesById, sendUpdatedArticleVotes, postArticle, getCommentsByArticleId, sendAllArticles } = require('../controllers/articlesController')
const handle405s = require('../errors/errors')

articlesRouter.route('/:article_id').get(sendArticlesById).patch(sendUpdatedArticleVotes).all((req, res) => {
    res.status(405).send({ msg: 'Route not found' })
})

articlesRouter.route('/:article_id/comments').post(postArticle).get(getCommentsByArticleId).all((req, res) => {
    res.status(405).send({ msg: 'Route not found' })
})

articlesRouter.route('/').get(sendAllArticles).all((req, res) => {
    res.status(405).send({ msg: 'Route not found' })
})


module.exports = articlesRouter