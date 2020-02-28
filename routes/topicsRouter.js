const topicsRouter = require('express').Router()
const { sendTopics } = require('../controllers/topicsController')
const handle405s = require('../errors/errors')

topicsRouter.get('/', sendTopics)
topicsRouter.all(handle405s)

module.exports = topicsRouter