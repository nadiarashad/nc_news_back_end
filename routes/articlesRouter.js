const articlesRouter = require('express').Router()
const { sendArticlesById, sendUpdatedArticleVotes, postArticle, getCommentsByArticleId, sendAllArticles } = require('../controllers/articlesController')
const handle405s = require('../errors/errors')

articlesRouter.get('/:article_id', sendArticlesById).all(handle405s)
articlesRouter.patch('/:article_id', sendUpdatedArticleVotes).all(handle405s)
articlesRouter.post('/:article_id/comments', postArticle).all(handle405s)
articlesRouter.get('/:article_id/comments', getCommentsByArticleId).all(handle405s)
articlesRouter.get('/', sendAllArticles).all(handle405s)

module.exports = articlesRouter