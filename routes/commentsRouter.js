const commentsRouter = require('express').Router()
const { sendUpdatedVotes, deleteCommentById } = require('../controllers/commentsController')

commentsRouter.patch('/:comment_id', sendUpdatedVotes)
commentsRouter.delete('/:comment_id', deleteCommentById)


module.exports = commentsRouter