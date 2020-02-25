const { getUserInfo } = require('../models/userModel')



exports.sendUserinfoByUsername = (req, res, next) => {
    console.log('in controller')
    // console.log(req.params)
    const { username } = req.params
    getUserInfo(username)
        .then((user) => {
            return res.status(200).send({ user })
        })
        .catch(err => {
            next(err)
        })
}