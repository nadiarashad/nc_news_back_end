const knex = require('../db/connection')

exports.getTopics = () => {
    // console.log('in model')
    return knex.select('*').from('topics')
        .then((allTopics) => {

            return allTopics
        })

}