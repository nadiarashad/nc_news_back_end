const knex = require('../db/connection')

exports.getArticleById = (article_id) => {

    return knex
        .select('articles.*')
        .where('articles.article_id', article_id)
        .from('articles')
        .count({ comment_count: 'comments.article_id' })
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')


        .then(table => {
            if (table.length === 0) {
                return Promise.reject({ status: 404, msg: 'Invalid ID' })
            }

            return table
        })
}

// join table first 
// count 
// groupBy and
// keep article.article_id, delete comment_id

exports.updateVotes = (article_id, inc_votes) => {

    return knex
        .select('articles')
        .from('articles')
        .where('articles.article_id', article_id)
        .increment({ 'votes': inc_votes })
        .returning('*')
        .then(updatedVotes => {
            if (updatedVotes.length === 0) {
                return Promise.reject({ status: 404, msg: 'Invalid ID - does not match' })
            }

            return updatedVotes
        })

}

exports.createArticle = (comment) => {

    return knex
        .insert(comment)
        .into('comments')
        .returning('*')
        .then(res => {

            return res
        })
}

exports.getAllCommentsForId = (article_id, sort_by, order_by, ) => {
    // console.log('in model')
    // console.log(sort_by, 'sortby')

    return knex
        .select('body', 'author', 'votes', 'created_at', 'comment_id')
        .from('comments')
        .where('comments.article_id', article_id)
        .orderBy(sort_by || 'created_at', order_by || 'descending')
        .then(res => {

            return res

        })
}
