const knex = require('../db/connection')

exports.getUserInfo = (username) => {
    console.log('in model')
    // console.log(username)
    return knex
        .select('*')
        .from('users')
        .where({ username })
        .returning('*')
        .then((user) => {
            if (user.length === 0) {
                return Promise.reject({ status: 404, msg: 'Route not found' })
            }
            // console.log(user)
            return user[0]
        })

}