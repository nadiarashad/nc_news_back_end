const usersRouter = require('express').Router()
const { sendUserinfoByUsername } = require('../controllers/userController')

usersRouter.get('/:username', sendUserinfoByUsername)

module.exports = usersRouter