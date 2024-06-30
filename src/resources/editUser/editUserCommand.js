const User = require('../../common/entities/user')

class EditUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ userid, name, email, address, postalcode, city, mobilephone, phone }) {
        try {

            const user = user.edit({ funerariaid, name, email, address, postalcode, city, mobilephone, phone, userid })

            const updatedUser = await this.userRepository.edit(user)

            return { success: true, data: updatedUser }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = EditUserCommand