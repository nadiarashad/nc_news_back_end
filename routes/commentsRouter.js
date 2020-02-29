const commentsRouter = require('express').Router()
const { sendUpdatedVotes, deleteCommentById } = require('../controllers/commentsController')
const handle405s = require('../errors/errors')

commentsRouter.route('/:comment_id').patch(sendUpdatedVotes).delete(deleteCommentById).all((req, res) => {
    res.status(405).send({ msg: 'Route not found' })
})



module.exports = commentsRouter