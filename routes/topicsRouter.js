const topicsRouter = require('express').Router()
const { sendTopics } = require('../controllers/topicsController')
const handle405s = require('../errors/errors')

topicsRouter.route('/').get(sendTopics).all((req, res) => {
    res.status(405).send({ msg: 'Route not found' })
})

module.exports = topicsRouter