const User = require('../../common/entities/user')

class CreateUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ name, email, password, address, city, roleid }) {
        try {
            const user = new User({ name, email, password, address, city, roleid })
            const validate = User.validateUser(user)

            if (!validate) {
                throw new Error('User invalid')
            }

            const createdUser = await this.userRepository.create(user)

            return { success: true, data: createdUser }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateUserCommand