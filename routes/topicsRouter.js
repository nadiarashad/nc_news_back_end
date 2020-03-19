const topicsRouter = require('express').Router()
const { sendTopics, sendAllArticlesForTopic } = require('../controllers/topicsController')
const { handle405s } = require('../errors/errors')

topicsRouter.route('/').get(sendTopics).all(handle405s)

topicsRouter.route('/articles/:topic').get(sendAllArticlesForTopic).all(handle405s)

module.exports = topicsRouter