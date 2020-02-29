const knex = require('../db/connection')

exports.updateVote = (comment_id, inc_votes) => {

    if (inc_votes === undefined) {
        inc_votes = 0;
    }

    return knex
        .select('comments.*')
        .from('comments')
        .where('comments.comment_id', comment_id)
        .increment({ 'votes': inc_votes })
        .returning('*')
        .then(updatedVotes => {
            if (updatedVotes.length === 0) {
                return Promise.reject({ status: 404, msg: 'Invalid ID - does not match' })
            }
            return updatedVotes[0]
        })
}


exports.deleteComment = (comment_id) => {

    return knex('comments').where({ comment_id }).del()
        .then(res => {
            if (res === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found - invalid ID' })
            }
            return res
        })

}