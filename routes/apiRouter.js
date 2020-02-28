const apiRouter = require('express').Router()
const topicsRouter = require('../routes/topicsRouter')
const usersRouter = require('../routes/usersRouter')
const articlesRouter = require('../routes/articlesRouter')
const commentsRouter = require('../routes/commentsRouter')
const handle405s = require('../errors/errors')

apiRouter.use('/users', usersRouter).all(handle405s)
apiRouter.use('/articles', articlesRouter).all(handle405s)
apiRouter.use('/comments', commentsRouter).all(handle405s)
apiRouter.use('/topics', topicsRouter).all(handle405s)
// apiRouter.use('/', handle405s).all(handle405s)


module.exports = apiRouter