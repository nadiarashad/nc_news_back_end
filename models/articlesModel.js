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
    console.log('in model')
    // console.log(sort_by, 'sortby')

    const arrayOfAllowed = ['asc', 'desc', 'ascending', 'descending']
    if (arrayOfAllowed.includes(order_by) || order_by === undefined) {

        return knex
            .select('body', 'author', 'votes', 'created_at', 'comment_id')
            .from('comments')
            .where('comments.article_id', article_id)
            .orderBy(sort_by || 'created_at', order_by || 'descending')
            .then(res => {
                console.log(res, 'res')
                if (res.length === 0) {
                    return knex.select('*').from('articles').where({ article_id }).then(res => {
                        if (res.length === 0) {
                            return Promise.reject({ status: 404, msg: 'Invalid ID - does not match' })
                        }
                        else {
                            return res
                        }
                    })
                }
                return res
            })
    } else {
        return Promise.reject({ status: 400, msg: 'Invalid order by requested, please amend to either "asc" or "desc"' })
    }
}



exports.getAllArticles = (sort_by, order_by, username, topic) => {

    const arrayOfAllowed = ['asc', 'desc', 'ascending', 'descending']
    if (arrayOfAllowed.includes(order_by) || order_by === undefined) {

        return knex
            .select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
            .from('articles')
            .count({ comment_count: 'comments.article_id' })
            .leftJoin('comments', 'articles.article_id', 'comments.article_id')
            .groupBy('articles.article_id')
            .orderBy(sort_by || 'articles.created_at', order_by || 'desc')
            .modify(queryBuilder => {
                if (username) {
                    return username
                        ? queryBuilder.where("articles.author", username) : queryBuilder
                }
            })
            .modify(queryBuilder => {
                if (topic) {
                    return topic
                        ? queryBuilder.where("articles.topic", topic) : queryBuilder
                }
            })
            .then(articles => {
                if (articles.length === 0) {
                    //if statement
                    if (username) {
                        return knex
                            .select('*')
                            .from('users')
                            .where({ username })
                            .then(userExistsCheck => {
                                if (userExistsCheck.length === 0) {
                                    return Promise.reject({ status: 404, msg: 'User does not exist' })
                                }
                                console.log(userExistsCheck, 'userExistCheckkkkkkkkk')
                                return []
                            })
                    }

                    return knex
                        .select('*')
                        .from('topics')
                        .where('topics.slug', '=', topic)
                        .then(topicExistCheck => {
                            if (topicExistCheck.length === 0) {
                                return Promise.reject({ status: 404, msg: 'Topic does not exist' })
                            }
                            return []
                        })

                }
                return articles
            })

    } else {
        return Promise.reject({ status: 400, msg: 'Invalid order by requested, please amend to either "asc" or "desc"' })
    }
}


                //     console.log(res, 'resssssssssssssssss')


                // if (res.length === 0) {
                //     return knex.select('*').from('topics').where('topics.slug', '=', topic)
                //         .then(res => {
                //             console.log(res, 'seconddddddddddd res')
                //             return res
                //         })
                // }
                // })


                // if (articles.length === 0) {
                //     return Promise.reject({ status: 404, msg: 'Not found' })
                // }