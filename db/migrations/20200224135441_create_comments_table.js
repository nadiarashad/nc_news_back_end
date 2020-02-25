
exports.up = function (knex) {
    // console.log('creating commentsTable...')

    return knex.schema.createTable('comments', (commentsTable) => {
        commentsTable.increments('comment_id').primary();
        commentsTable.string('author').references('users.username');
        commentsTable.integer('article_id').references('articles.article_id');
        commentsTable.integer('votes');
        commentsTable.string('created_at');
        commentsTable.text('body').notNullable()
    })
};


exports.down = function (knex) {
    // console.log('dropping commentsTable...')

    return knex.schema.dropTable('comments')

};

