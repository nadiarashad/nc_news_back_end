exports.pSQLErrorsHandler = (err, req, res, next) => {
    const errCodes = {
        '42703': { status: 400, msg: 'Invalid request: missing required fields' },
        '23502': { status: 400, msg: 'Invalid request: missing required fields' },
        '23503': { status: 404, msg: 'Invalid request: missing required fields' },
        '22P02': { status: 400, msg: "Bad request: missing required fields" }
    };
    if (err.code !== undefined) {
        res.status(errCodes[err.code].status).send({ msg: errCodes[err.code].msg });
    }
    else next(err)
};


exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status !== undefined) {
        res.status(err.status).send({ msg: err.msg })
    }
    else next(err)
}


exports.handle405s = (req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed' })
    next(err)
}


exports.handle404s = (req, res, next) => {
    res.status(404).send({ msg: 'Route not found' })
    next(err)
}


exports.handle500s = (req, res, next) => {
    res.status(500).send({ msg: 'There seems to be an issue with the server, please try again later' })
    next(err)
}