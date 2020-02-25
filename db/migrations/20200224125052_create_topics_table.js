
exports.up = function (knex) {
    // console.log('creating topicsTable...')

    return knex.schema.createTable('topics', (topicsTable) => {
        topicsTable.string('slug').unique().primary();
        topicsTable.string('description').notNullable();
    })
};

exports.down = function (knex) {
    // console.log('removing topicsTable...')
    return knex.schema.dropTable('topics')
};
