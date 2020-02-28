const usersRouter = require('express').Router()
const { sendUserinfoByUsername } = require('../controllers/userController')
const handle405s = require('../errors/errors')

usersRouter.get('/:username', sendUserinfoByUsername).all(handle405s)

module.exports = usersRouter