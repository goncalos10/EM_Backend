const utils = require('../../common/utils')

class GetUsersFunerariasQuery {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }

    async execute() {
        try {

            const funerariasUsers = (await this.usersRepository.listAllFunerariasUsers() || [])
            return { success: true, data: funerariasUsers }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetUsersFunerariasQuery