
exports.up = function (knex) {
    // console.log('creating articlesTable...')
    return knex.schema.createTable('articles', (articlesTable) => {
        articlesTable.increments('article_id').primary();
        articlesTable.string('title').notNullable();
        articlesTable.text('body').notNullable();
        articlesTable.integer('votes').default(0);
        articlesTable.string('topic').references('topics.slug').notNullable();
        articlesTable.string('author').references('users.username').notNullable();
        articlesTable.string('created_at').defaultTo(knex.fn.now()).notNullable();
    })
};

exports.down = function (knex) {
    // console.log('dropping articlesTable...')
    return knex.schema.dropTable('articles')
};
