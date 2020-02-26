const articlesRouter = require('express').Router()
const { sendArticles, sendUpdatedArticleVotes, postArticle, getCommentsByArticleId } = require('../controllers/articlesController')


articlesRouter.get('/:article_id', sendArticles)
articlesRouter.patch('/:article_id', sendUpdatedArticleVotes)
articlesRouter.post('/:article_id/comments', postArticle)
articlesRouter.get('/:article_id/comments', getCommentsByArticleId)

module.exports = articlesRouter