const { updateVote, deleteComment } = require('../models/commentsModel')

exports.sendUpdatedVotes = (req, res, next) => {

    const { comment_id } = req.params
    const { inc_votes } = req.body

    console.log(comment_id, inc_votes)

    updateVote(comment_id, inc_votes)
        .then(comment => {
            // console.log(comment)
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