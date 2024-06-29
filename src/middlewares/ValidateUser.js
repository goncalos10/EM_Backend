const utils = require('../common/utils')
const UserRepository = require('../repositories/UserRepository')

exports.validateUser = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    const tokenSplit = token.split(' ')
    if (tokenSplit.length !== 2) {
        return res.status(401).json({ error: 'Invalid token' })
    }

    const tokenValue = tokenSplit[1]
    let user = utils.verifyJWTToken(tokenValue)

    if (!user) {
        return res.status(401).json({ error: 'Invalid token' })
    }

    const userRepository = new UserRepository(process.env.DATABASE_URL)
    user = await userRepository.findByEmail(user.email)

    req.user = user
    next()
}