const User = require('../../common/entities/user')

class DeleteUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ user, userid }) {
        try {

            const user = user.delete({ user, userid })

            await this.userRepository.delete(parseInt(userid))

            return { success: true }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = DeleteUserCommand
