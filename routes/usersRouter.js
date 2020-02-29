const usersRouter = require('express').Router()
const { sendUserinfoByUsername } = require('../controllers/userController')
const handle405s = require('../errors/errors')

usersRouter.route('/:username').get(sendUserinfoByUsername).all((req, res) => {
    res.status(405).send({ msg: 'Route not found' });
})


module.exports = usersRouter