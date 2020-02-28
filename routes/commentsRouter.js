const commentsRouter = require('express').Router()
const { sendUpdatedVotes, deleteCommentById } = require('../controllers/commentsController')
const handle405s = require('../errors/errors')

commentsRouter.patch('/:comment_id', sendUpdatedVotes).all(handle405s)
commentsRouter.delete('/:comment_id', deleteCommentById).all(handle405s)


module.exports = commentsRouter