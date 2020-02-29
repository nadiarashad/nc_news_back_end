const articlesRouter = require('express').Router()
const { sendArticlesById, sendUpdatedArticleVotes, postArticle, getCommentsByArticleId, sendAllArticles } = require('../controllers/articlesController')
const { handle405s } = require('../errors/errors')

articlesRouter.route('/:article_id').get(sendArticlesById).patch(sendUpdatedArticleVotes).all(handle405s)

articlesRouter.route('/:article_id/comments').post(postArticle).get(getCommentsByArticleId).all(handle405s)


articlesRouter.route('/').get(sendAllArticles).all(handle405s)


module.exports = articlesRouter