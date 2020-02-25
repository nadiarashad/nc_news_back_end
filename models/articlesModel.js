const knex = require('../db/connection')

exports.getArticleById = (article_id) => {
    console.log('in models')
    // console.log(article_id, 'article id in model')
    return knex.select('*').from('articles').where({ article_id }).returning('*')

        .then(article => {
            console.log(article, 'article')

            return knex.select('*').from('comments').leftJoin('articles', 'comments.article_id', 'articles.article_id')

        })
        .then(commentsForIdData => {
            console.log('commmmmmmmmmmmmmmmments daaaaaaaaaaaaaaata')
            console.log(commentsForIdData, 'commentsforiddata')

            return knex('commentsForIdData').count({ comment_count: commentsForIdData.length })

        }).then(res => {

            console.log(res, 'commentcount')

            return res
        })
    // join table first 
    // count 
    // groupBy and
    // keep article.article_id, delete comment_id



    // 

}


// 
//     