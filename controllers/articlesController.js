const { getArticleById } = require('../models/articlesModel')

exports.sendArticles = (req, res, next) => {
    console.log('in controller')
    // console.log(req.params)

    const { article_id } = req.params
    getArticleById(article_id)
        .then(res => {
            res.status(200).send({ article })
        })

}