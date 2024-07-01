const User = require('../../common/entities/user')

class EditLocalCommand {
    constructor(localRepository) {
        this.localRepository = localRepository
    }

    async execute({ localid, name, address, city, tipo }) {
        try {

            const updatedLocal = await this.localRepository.edit({ localid, name, address, city, tipo })

            return { success: true, data: updatedLocal }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = EditLocalCommand