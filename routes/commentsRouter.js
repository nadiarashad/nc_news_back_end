const commentsRouter = require('express').Router()
const { sendUpdatedVotes, deleteCommentById, sendAllComments } = require('../controllers/commentsController')
const { handle405s } = require('../errors/errors')

commentsRouter.route('/:comment_id').patch(sendUpdatedVotes).delete(deleteCommentById).all(handle405s)

commentsRouter.route('/').get(sendAllComments).all(handle405s)

module.exports = commentsRouter