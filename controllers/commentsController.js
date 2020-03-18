const { updateVote, deleteComment, getAllComments } = require('../models/commentsModel')

exports.sendUpdatedVotes = (req, res, next) => {

    const { comment_id } = req.params
    const { inc_votes } = req.body

    updateVote(comment_id, inc_votes)
        .then(comment => {
            return res.status(200).send({ comment: comment })
        })
        .catch(err => {
            next(err)
        })
}

exports.deleteCommentById = (req, res, next) => {

    const { comment_id } = req.params

    deleteComment(comment_id)
        .then(deleted => {
            return res.status(204).send({})
        })
        .catch(err => {
            next(err)
        })
}

exports.sendAllComments = (req, res, next) => {

    getAllComments()
        .then(comments => {
            return res.status(200).send({ comments: comments })
        })
}