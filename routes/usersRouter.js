const usersRouter = require('express').Router()
const { sendUserinfoByUsername, sendUsers } = require('../controllers/userController')
const { handle405s } = require('../errors/errors')

usersRouter.route('/:username').get(sendUserinfoByUsername).all(handle405s)
usersRouter.route('/').get(sendUsers).all(handle405s)

module.exports = usersRouter