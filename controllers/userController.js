const { getUserInfo, getUsers } = require('../models/userModel')



exports.sendUserinfoByUsername = (req, res, next) => {

    const { username } = req.params

    getUserInfo(username)
        .then((user) => {
            return res.status(200).send({ user: user })
        })
        .catch(err => {
            next(err)
        })
}

exports.sendUsers = (req, res, next) => {

    getUsers()
        .then(users => {
            return res.status(200).send({ users: users })
        }).catch(err => {
            next(err)
        })
}