const knex = require('../db/connection')

exports.getUserInfo = (username) => {

    return knex
        .select('*')
        .from('users')
        .where({ username })
        .returning('*')
        .then((user) => {
            if (user.length === 0) {
                return Promise.reject({ status: 404, msg: 'Route not found' })
            }
            return user[0]
        })

}