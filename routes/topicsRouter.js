const topicsRouter = require('express').Router()
const { sendTopics } = require('../controllers/topicsController')

topicsRouter.get('/', sendTopics)

module.exports = topicsRouter