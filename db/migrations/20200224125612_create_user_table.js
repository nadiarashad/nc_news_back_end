
exports.up = function (knex) {
    // console.log('creating userTable…')
    return knex.schema.createTable('users', (userTable) => {
        userTable.string('username').primary()
        userTable.string('avatar_url').notNullable()
        userTable.string('name').notNullable()
    })
};

exports.down = function (knex) {
    // console.log('dropping userTable…')
    return knex.schema.dropTable('users')
};
