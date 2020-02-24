
exports.up = function (knex) {
    console.log('creating articlesTable...')
    return knex.schema.createTable('articles', (articlesTable) => {
        articlesTable.increments('article_id').primary();
        articlesTable.string('title').notNullable();
        articlesTable.text('body').notNullable();
        articlesTable.integer('votes');
        articlesTable.string('topic').references('topics.slug');
        articlesTable.string('author').references('users.username');
        articlesTable.string('created_at');
    })
};

exports.down = function (knex) {
    console.log('dropping articlesTable...')
    return knex.schema.dropTable('articles')
};
