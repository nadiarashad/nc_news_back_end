const apiRouter = require('express').Router()
const topicsRouter = require('../routes/topicsRouter')
const usersRouter = require('../routes/usersRouter')
const articlesRouter = require('../routes/articlesRouter')
const commentsRouter = require('../routes/commentsRouter')


apiRouter.use('/users', usersRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/topics', topicsRouter)


module.exports = apiRouter