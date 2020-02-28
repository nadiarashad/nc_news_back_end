

exports.pSQLErrorsHandler = (err, req, res, next) => {
    console.log('errorrrrrrrrrrrrrrrrrrrrr')
    console.log(err)
    const errCodes = {

        '42703': { status: 400, msg: 'Invalid request: missing required fields' }, // empty obj
        '23502': { status: 400, msg: 'Invalid request: missing required fields' }, // null
        '42803': { status: 500, msg: 'Issue retrieving data' },
        '23503': {
            status: 404, msg: 'Invalid request: missing required fields'
        },

        '22P02': { status: 400, msg: "Bad request: missing required fields" } //USED
        /* This is for url id of "banana" instead of number, 
        but also for age key in post having value "banana" not number. 
        */

        //'22P02': { status: 400, msg: '22P02 Invalid route: url or id not valid' } // string not num eg
    };
    if (err.code !== undefined) { // USED
        res.status(errCodes[err.code].status).send({ msg: errCodes[err.code].msg });
    } else next(err)
};


exports.handleCustomErrors = (err, req, res, next) => { //USED
    if (err.status !== undefined) {
        res.status(err.status).send({ msg: err.msg })
    }
    else next(err)
}


exports.handle405s = (req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed' })

}


exports.handle404s = (req, res, next) => { //USED
    res.status(404).send({ msg: 'Route not found' })
}

exports.handle500s = (req, res, next) => {
    res.status(500).send({ msg: 'There seems to be an issue with the server, please try again later' })
}