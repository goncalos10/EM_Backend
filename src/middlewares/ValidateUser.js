const utils = require('../common/utils')

exports.validateUser = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    const tokenSplit = token.split(' ')
    if(tokenSplit.length !== 2) {
        return res.status(401).json({ error: 'Invalid token' })
    }

    const tokenValue = tokenSplit[1]
    const user = utils.verifyJWTToken(tokenValue)
    req.user = user
    next()
}