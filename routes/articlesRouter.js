const articlesRouter = require('express').Router()
const { sendArticlesById, sendUpdatedArticleVotes, postArticle, getCommentsByArticleId, sendAllArticles } = require('../controllers/articlesController')


articlesRouter.get('/:article_id', sendArticlesById)
articlesRouter.patch('/:article_id', sendUpdatedArticleVotes)
articlesRouter.post('/:article_id/comments', postArticle)
articlesRouter.get('/:article_id/comments', getCommentsByArticleId)
articlesRouter.get('/', sendAllArticles)

module.exports = articlesRouter