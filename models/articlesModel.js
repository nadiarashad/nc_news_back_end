const knex = require('../db/connection')

exports.getArticleById = (article_id) => {

    return knex
        .select('articles.*')
        .where('articles.article_id', article_id)
        .from('articles')
        .count({ comment_count: 'comments.article_id' })
        .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
        .groupBy('articles.article_id')
        .then(article => {
            if (article.length === 0) {
                return Promise.reject({ status: 404, msg: 'Invalid ID' })
            }
            // console.log(article, 'articleeeeeeeeeeeee')
            return article[0]
        })
}

// join table first 
// count 
// groupBy and
// keep article.article_id, delete comment_id

exports.updateVotes = (article_id, inc_votes) => {

    if (inc_votes === undefined) {
        inc_votes = 0;
    }

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

            return updatedVotes[0]
        })

}

exports.createArticle = (comment) => {

    return knex
        .insert(comment)
        .into('comments')
        .returning('*')
        .then(res => {
            // console.log(res, 'ressssssssss')
            return res[0]
        })
}

exports.getAllCommentsForId = (article_id, sort_by, order_by, ) => {
    // console.log('in model')
    // console.log(sort_by, 'sortby')

    if (order_by === "asc" || order_by === "desc" || order_by === undefined) {

        return knex
            .select('body', 'author', 'votes', 'created_at', 'comment_id')
            .from('comments')
            .where('comments.article_id', article_id)
            .orderBy(sort_by || 'created_at', order_by || 'desc')
            .then(res => {
                // console.log(res, 'res')
                if (res.length === 0) {
                    return knex.select('*').from('articles').where({ article_id }).then(res => {
                        if (res.length === 0) {
                            return Promise.reject({ status: 404, msg: 'Invalid ID - does not match' })
                        }
                        else {
                            return []
                        }
                    })
                }
                return res
            })

    } else {
        return Promise.reject({ status: 400, msg: "Invalid order query" });
    }

}





exports.getAllArticles = (sort_by = 'created_at', order_by = 'desc', username, topic) => {

    if (order_by === "asc" || order_by === "desc" || order_by === undefined) {

        return knex
            .select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')

            .from('articles')
            .count({ comment_count: 'comments.article_id' })
            .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
            .groupBy('articles.article_id')
            .orderBy(sort_by, order_by)
            .modify(queryBuilder => {

                if (username) {
                    return username
                        ? queryBuilder.where("articles.author", username) : queryBuilder
                }
                return topic
                    ? queryBuilder.where("articles.topic", topic) : queryBuilder

            })
            .then(articles => {
                if (articles.length === 0) {
                    if (username) {
                        const userCheck = checkIfUserNameAndTopicExist(username, 'users', 'username')
                        return userCheck
                    }
                    else if (topic) {
                        const topicCheck = checkIfUserNameAndTopicExist(topic, 'topics', 'slug')
                        return topicCheck

                    }
                }
                return articles
            })
    } else {
        return Promise.reject({ status: 400, msg: "Invalid order query" });
    }
}


const checkIfUserNameAndTopicExist = (toCheck, table, row) => {

    return knex
        .select('*')
        .from(table)
        .where(`${row}`, toCheck)
        .then(existsCheck => {
            if (existsCheck.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not found' })
            }
            return []
        })

}



