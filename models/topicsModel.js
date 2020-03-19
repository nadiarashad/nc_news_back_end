const knex = require('../db/connection')

exports.getTopics = () => {

    return knex.select('*').from('topics')
        .then((allTopics) => {
            return allTopics
        })

}


exports.getArticlesforTopic = (slug) => {

    return knex.select('*').from('articles').where('article.topic', '=', slug)
        .then((allArticles) => {
            return allArticles
        })
}