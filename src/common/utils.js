const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    },

    comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash)
    },
    generateJWT: (id, name ,email ,roleid) => {
        return jwt.sign({ id, name, email, roleid }, process.env.JWT_SECRET, { expiresIn: '24h' })
    },

    verifyJWTToken : (token) => {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}