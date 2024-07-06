const User = require('../../common/entities/user')
const utils = require('../../common/utils')

class LoginQuery {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ email, password }) {
        try {

            const userlogin = await this.userRepository.findByEmail(email)
            if (!userlogin) {
                throw new Error('Email or password are wrong')
            }

            const validatePassword = await utils.comparePassword(password, userlogin.password)
            if (!validatePassword) {
                throw new Error('Email or password are wrong')
            }
            console.log(userlogin)
            const token = utils.generateJWT(userlogin.userid, userlogin.name, userlogin.email, userlogin.roleid)
            return { success: true, data: { token, userid: userlogin.userid, email: userlogin.email, roleid: userlogin.roleid, name: userlogin.name } }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = LoginQuery