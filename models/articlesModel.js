const knex = require('../db/connection')

exports.getArticleById = (article_id) => {
    console.log('in models')
    // console.log(article_id, 'article id in model')
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
            // console.log(table)
            return table
        })
}

// join table first 
// count 
// groupBy and
// keep article.article_id, delete comment_id

exports.updateVotes = (article_id, inc_votes) => {
    console.log('in model')
    console.log(article_id)
    console.log(inc_votes)

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
            // console.log(updatedVotes)
            return updatedVotes
        })

}

exports.createArticle = () => {

}

