const knex = require('../db/connection')

exports.getTopics = () => {

    return knex.select('*').from('topics')
        .then((allTopics) => {
            return allTopics
        })

}