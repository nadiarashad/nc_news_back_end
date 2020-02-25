exports.pSQLErrorsHandler = (err, req, res, next) => {
    console.log('errorrrrrrrrrrrrrrrrrrrrr')
    console.log(err)
    const errCodes = {

        '42703': { status: 400, msg: 'Invalid request: missing required fields' }, // empty obj
        '23502': { status: 400, msg: 'Invalid request: missing required fields' }, // null

        '22P02': { status: 400, msg: "Invalid input!" }
        /* This is for url id of "banana" instead of number, 
        but also for age key in post having value "banana" not number. 
        Is that too broad a category for this message to cover? */

        //'22P02': { status: 400, msg: '22P02 Invalid route: url or id not valid' } // string not num eg
    };
    if (err.code !== undefined) {
        res.status(errCodes[err.code].status).send({ msg: errCodes[err.code].msg });
    } else next(err)
};


exports.handleCustomErrors = (err, req, res, next) => { // handles status, custom errors, that i've written
    if (err.status !== undefined) {
        res.status(err.status).send({ msg: err.msg })
    }
    else next(err)
}


exports.handleVeryWeirdDefinitelyWrongErrors = (err, req, res, next) => { // handles status, custom erors, that iv'e written
    if (err.toString() !== '[object Object]') {
        res.status(404).send({ msg: `Here is a custom message from a strange error: ${err.toString()}` })
    }
    else next(err)
}


exports.handle405s = (req, res, next) => {
    res.status(405).send({ msg: 'method not allowed ' })

}


exports.handle404s = (req, res, next) => {
    res.status(404).send({ msg: 'Route not found' })
}
